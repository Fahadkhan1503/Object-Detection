# ⚡ ObjectDetect AI

> **Advanced object detection and tracking system powered by YOLO technology**

![ObjectDetect AI](https://img.shields.io/badge/YOLO-Powered-0d9488?style=for-the-badge)
![React](https://img.shields.io/badge/React-Frontend-2dd4bf?style=for-the-badge&logo=react)
![Python](https://img.shields.io/badge/Python-Backend-134e4a?style=for-the-badge&logo=python)


ObjectDetect AI is a full-stack web application that lets you upload videos and detect, track, and count objects by size in real time  all powered by a YOLO-based Python backend and a clean React frontend.

---

## ✨ Features

-  **Video Upload** — Upload any video file and run object detection on it
-  **YOLO-Powered Detection** — Fast and accurate object detection using YOLO
-  **Detection Results** — View detected objects with counts and classifications
-  **Size-Based Counting** — Objects are tracked and counted based on their size
-  **Clean UI** — Minimal, responsive React interface with real-time feedback

---

## 📸 Screenshot

<img width="1920" height="883" alt="home" src="https://github.com/user-attachments/assets/16e001d0-becd-4eb2-ad85-c125fe0c4bce" />
<img width="1900" height="880" alt="res" src="https://github.com/user-attachments/assets/e283d9bb-922e-4afd-ae57-2df92df91da8" />


https://github.com/user-attachments/assets/bdb19769-2f19-4095-91a4-2a1ed6772b6b


---

## 🗂️ Project Structure

```
Object-Detection/
├── backend/         
│   ├── app.py
│   ├── output.py
│   ├── upload.py
│    
├── frontend/         
│   ├── src/
│   |     ├─── App.jsx
│   |     ├─── Navabr.jsx
│   |     ├─── footer.jsx
│   |     ├─── colors.js
│   └── package.json
└── .gitignore
```
---

##  Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite |
| Backend | Python, FastAPI |
| Detection | YOLOv8 |
| Styling |  Tailwind |
---

##  Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm 

---

###  Backend Setup

```bash
# Navigate to backend directory
cd backend


# Install dependencies
pip install fastapi uvicorn ultralytics opencv-python python-multipart

# Start the backend server
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The backend server will start at `http://localhost:8000`

---

###  Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start at `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/process-video` | Upload a video and run object detection |
| `GET`  | `/outputs` | Fetch detection results |
| `GET`  | `/download` | download output video |


---
##  Author

**Muhammad Fahad**
- GitHub: [@Fahadkhan1503](https://github.com/Fahadkhan1503)
