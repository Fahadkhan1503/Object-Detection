from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from ultralytics import YOLO
import os, uuid, cv2
from datetime import datetime
import threading

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load YOLO
model = YOLO("yolov8n.pt")

# Store job progress: job_id -> dict
jobs = {}

def process_video_task(job_id: str, input_path: str):
    """Background task that processes video and updates progress."""
    try:
        output_filename = f"processed_{uuid.uuid4()}.mp4"
        output_path = os.path.join(OUTPUT_DIR, output_filename)

        # Get total frame count first (for progress)
        cap = cv2.VideoCapture(input_path)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        cap.release()

        jobs[job_id].update({
            "total_frames": total_frames,
            "current_frame": 0,
            "status": "processing",
            "cancel": False
        })

        # Run YOLO tracking
        results = model.track(source=input_path, show=False, stream=True)

        # Prepare video writer
        cap = cv2.VideoCapture(input_path)
        try:
            fourcc = cv2.VideoWriter_fourcc(*"H264")
        except:
            fourcc = cv2.VideoWriter_fourcc(*"MJPG")
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

        object_count = {}
        frame_idx = 0

        for result in results:
             # --- CANCEL CHECK ---
            if jobs[job_id]["cancel"]:
                cap.release()
                out.release()
                jobs[job_id]["status"] = "cancelled"
                return
            frame_idx += 1
            frame = result.orig_img.copy()

            if result.boxes.id is not None:
                names = result.names
                for cls_id, track_id, box in zip(
                    result.boxes.cls.cpu().numpy(),
                    result.boxes.id.cpu().numpy(),
                    result.boxes.xyxy.cpu().numpy()
                ):
                    label = names[int(cls_id)]
                    if label not in object_count:
                        object_count[label] = set()
                    object_count[label].add(track_id)

                    x1, y1, x2, y2 = map(int, box)
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0,255,0), 2)
                    cv2.putText(frame, f"{label} ID:{int(track_id)}", (x1, y1-10),
                                cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0,255,0), 3)

            out.write(frame)

            # Update progress
            jobs[job_id]["current_frame"] = frame_idx

        cap.release()
        out.release()

        # Convert sets to counts
        object_count = {k: len(v) for k, v in object_count.items()}
        total_count = sum(object_count.values())

        # Store final result
        jobs[job_id].update({
            "status": "completed",
            "result": {
                "frame_count": frame_idx,
                "timestamp": datetime.now().isoformat(),
                "video_url": f"/outputs/{output_filename}",
                "download_url": f"/download/{output_filename}",
                "filename": output_filename,
                "total": total_count,
                **object_count
            }
        })

    except Exception as e:
        jobs[job_id]["status"] = "failed"
        jobs[job_id]["error"] = str(e)

@app.post("/process-video")
async def process_video(video: UploadFile = File(...), background_tasks: BackgroundTasks = None):
    # Save uploaded video
    input_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}_{video.filename}")
    with open(input_path, "wb") as f:
        f.write(await video.read())

    job_id = str(uuid.uuid4())
    jobs[job_id] = {"status": "starting", "current_frame": 0, "total_frames": 0}

    # Start background task
    background_tasks.add_task(process_video_task, job_id, input_path)

    return {"job_id": job_id}

@app.get("/progress/{job_id}")
def get_progress(job_id: str):
    job = jobs.get(job_id)
    if not job:
        return JSONResponse(status_code=404, content={"error": "Job not found"})
    return job

@app.get("/outputs/{filename}")
def serve_video(filename: str):
    file_path = os.path.join(OUTPUT_DIR, filename)
    if not os.path.exists(file_path) or os.path.getsize(file_path) == 0:
        return {"error": "Video file not found or empty"}, 404
    return FileResponse(file_path, media_type="video/mp4")

@app.get("/download/{filename}")
def download_video(filename: str):
    return FileResponse(os.path.join(OUTPUT_DIR, filename), media_type="video/mp4", filename=filename)

@app.post("/cancel/{job_id}")
def cancel_job(job_id: str):
    if job_id not in jobs:
        return JSONResponse(status_code=404, content={"error": "Job not found"})
    jobs[job_id]["cancel"] = True
    return {"message": "Cancellation requested"}    
    