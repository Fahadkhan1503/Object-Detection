import React, { useState,useEffect, useRef } from "react";
import {Folder,
  Check,
  BarChart3,
  Video,
  Rocket,
  RotateCcw,
  Download,
  AlertCircle,
  Zap,
  Eye,
  Target,
  Film,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { colors, gradients } from "./colors";

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [results, setResults] = useState(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoKey, setVideoKey] = useState(Date.now());
  const [jobId, setJobId] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 0, status: null });
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const pollIntervalRef = useRef(null);

  useEffect(() => {
  return () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }
  };
}, []);

  const API_URL = "http://localhost:8000";

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Please select a valid video file");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File too large. Max 100MB allowed.");
      return;
    }

    setVideoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResults(null);
    setProcessedVideoUrl(null);
    setError("");
  };

  // Process video
  const processVideo = async () => {
  if (!videoFile) return;

  setLoading(true);
  setError("");
  setProcessedVideoUrl(null);
  setResults(null);
  setProgress({ current: 0, total: 0, status: "starting" });

  const formData = new FormData();
  formData.append("video", videoFile);

  try {
    // 1. Start the job
    const startRes = await fetch(`${API_URL}/process-video`, {
      method: "POST",
      body: formData,
    });
    const { job_id } = await startRes.json();
    setJobId(job_id);

    // 2. Poll for progress
    pollIntervalRef.current = setInterval(async () => {
      const progressRes = await fetch(`${API_URL}/progress/${job_id}`);
      const data = await progressRes.json();

      if (data.status === "processing") {
        setProgress({
          current: data.current_frame,
          total: data.total_frames,
          status: "processing",
        });
      } else if (data.status === "completed") {
        clearInterval(pollIntervalRef.current);
        setResults(data.result);
        setProcessedVideoUrl(`${API_URL}${data.result.video_url}?t=${Date.now()}`);
        setLoading(false);
        setJobId(null);
        setProgress({ current: 0, total: 0, status: "completed" });
      } else if (data.status === "failed") {
        clearInterval(pollIntervalRef.current);
        setError(data.error || "Processing failed");
        setLoading(false);
        setJobId(null);
      }
    }, 1000); // poll every second
  } catch (err) {
    console.error(err);
    setError(err.message || "Failed to start processing.");
    setLoading(false);
  }
};

  // Download video
  const downloadVideo = () => {
    if (results?.download_url) {
      const link = document.createElement("a");
      link.href = `${API_URL}${results.download_url}`;
      link.download = `processed_${results.filename}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Reset everything
  const resetAll = () => {
  // Stop polling if active
  if (pollIntervalRef.current) {
    clearInterval(pollIntervalRef.current);
    pollIntervalRef.current = null;
  }

  // Cancel backend job if any (optional but recommended)
  if (jobId) {
    fetch(`${API_URL}/cancel/${jobId}`, { method: "POST" }).catch(err => console.warn(err));
  }

  // Reset all UI states
  setVideoFile(null);
  setPreviewUrl(null);
  setResults(null);
  setProcessedVideoUrl(null);
  setError("");
  setVideoKey(Date.now());
  setJobId(null);
  setProgress({ current: 0, total: 0, status: null });
  setLoading(false);

  // Clear file input
  if (fileInputRef.current) fileInputRef.current.value = "";
};

  const handleVideoError = (e) => {
    const video = e.target;
    const errorCode = video?.error?.code;
    const errorMessage = video?.error?.message || "Unknown error";

    const errorDetails = {
      code: errorCode,
      message: errorMessage,
      url: video?.src,
    };

    console.error("Video playback error:", errorDetails);
    setError("Video failed to load. You can still download it.");
  };

  
  
  return (
    <div
      style={{ background: gradients.backgroundwall }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />

      <main className="flex-1">
        <div className="p-6 md:p-8 lg:p-12">
          {/* Enhanced Header */}
          <header className="text-center mb-8 md:mb-10">
            <div className="mb-4">
              <h1
                style={{ color: colors.gray.dark }}
                className="text-3xl md:text-4xl font-bold mb-2 leading-tight"
              >
                Object Detection System
              </h1>
              <p style={{ color: colors.gray.normal }} className="text-sm md:text-base mb-6 max-w-3xl mx-auto">
                Advanced object detection and tracking system powered by YOLO technology
              </p>
            </div>

            {/* Feature Cards - Inline */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 max-w-5xl mx-auto">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm"
                style={{ backgroundColor: colors.primary.light }}
              >
                <Eye className="w-5 h-5 shrink-0" style={{ color: colors.primary.normal }} />
                <div className="text-left">
                  <h3 style={{ color: colors.primary.dark }} className="font-semibold text-xs md:text-sm">
                    Real-time Detection
                  </h3>
                </div>
              </div>

              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm"
                style={{ backgroundColor: colors.secondary.light }}
              >
                <Target className="w-5 h-5 shrink-0" style={{ color: colors.secondary.normal }} />
                <div className="text-left">
                  <h3 style={{ color: colors.secondary.dark }} className="font-semibold text-xs md:text-sm">
                    Precise Tracking
                  </h3>
                </div>
              </div>

              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm"
                style={{ backgroundColor: colors.success.light }}
              >
                <BarChart3 className="w-5 h-5 shrink-0" style={{ color: colors.success.normal }} />
                <div className="text-left">
                  <h3 style={{ color: colors.success.dark }} className="font-semibold text-xs md:text-sm">
                    Detailed Analysis
                  </h3>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

            {/* Upload */}
            <div
              style={{ backgroundColor: colors.background.normal }}
              className="rounded-2xl shadow-xl p-5 md:p-6 min-h-96 flex flex-col"
            >
              <h2
                style={{ color: colors.gray.dark }}
                className="text-lg md:text-xl font-bold mb-4 flex items-center"
              >
                <Folder
                  className="w-5 h-5 mr-2"
                  style={{ color: colors.primary.normal }}
                />{" "}
                Upload Video
              </h2>

              {/* Info Box */}
              <div
                className="p-3 rounded-lg mb-4 border-l-4 shrink-0"
                style={{
                  backgroundColor: colors.primary.light,
                  borderColor: colors.primary.normal,
                }}
              >
                <p
                  style={{ color: colors.primary.dark }}
                  className="text-xs font-medium"
                >
                  <Zap className="w-3 h-3 inline mr-1" />
                  MP4, WebM, MOV, AVI • Max 100MB • High-quality recommended
                </p>
              </div>

              <div
                // className="border-2 border-dashed rounded-lg px-4 py-8 md:py-12 flex items-center justify-center cursor-pointer hover:transition-colors"
                className={`border-2 border-dashed rounded-lg px-4 flex items-center justify-center cursor-pointer hover:transition-colors ${
                        videoFile ? "py-3" : "py-8 md:py-12"
                      }`}
                style={{
                  borderColor: colors.primary.light,
                  backgroundColor: colors.background.dark,
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />

                {videoFile ? (
                  <div className="flex items-center gap-2 w-full">
                    <Check
                      className="w-6 h-6 shrink-0"
                      style={{ color: colors.success.normal }}
                    />
                    {/* <div className="text-left"> */}
                      <p
                        style={{ color: colors.gray.dark }}
                        className="text-xs font-semibold truncate"
                      >
                        {videoFile.name}
                      </p>
                      <p style={{ color: colors.gray.normal }} className="text-xs shrink-0 ml-auto">
                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    {/* </div> */}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Folder
                      className="w-8 h-8"
                      style={{ color: colors.gray.normal }}
                    />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: colors.gray.dark }}
                    >
                      Click to upload
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: colors.gray.normal }}
                    >
                      or drag & drop
                    </span>
                  </div>
                )}
              </div>

              {previewUrl && (
                <div className="mt-4 flex-1 flex flex-col">
                  <h3
                    style={{ color: colors.gray.dark }}
                    className="text-sm font-semibold mb-2 flex items-center gap-2 shrink-0"
                  >
                    <Video className="w-4 h-4" style={{ color: colors.primary.normal }} />
                    Preview
                  </h3>
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-44 md:h-56 object-contain rounded-lg shadow-md bg-black"

                    // className="w-full h-32 md:h-40 object-contain rounded-lg shadow-md bg-black"
                  />
                </div>
              )}

              {error && (
                <div
                  className="mt-4 p-3 rounded-lg border-l-4 flex items-start gap-2 shrink-0"
                  style={{
                    backgroundColor: colors.danger.light,
                    borderColor: colors.danger.normal,
                  }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: colors.danger.normal }} />
                  <p style={{ color: colors.danger.dark }} className="text-xs">{error}</p>
                </div>
              )}

              <div className="mt-auto space-y-2 pt-4">
                <button
  onClick={processVideo}
  disabled={!videoFile || loading}
  className={`w-full py-3 px-5 rounded-lg font-medium text-white transition-all text-sm ${loading && progress.status === "processing"
      ? "flex flex-col items-center gap-2"
      : "flex items-center justify-center gap-2"
  }`}
  style={{
    background: !videoFile || loading ? colors.gray.normal :  gradients.primary,
    cursor: !videoFile || loading ? "not-allowed" : "pointer",
  }}
>
  {loading && progress.status === "processing" ? (
    <>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full transition-all duration-300"
          style={{
            width: `${(progress.current / progress.total) * 100}%`,
            background: "linear-gradient(135deg, #56b4ac, #4ECDC4)", // gradient fill
          }}
        ></div>
      </div>
      <span className="text-sm mt-1">
        Frame {progress.current} / {progress.total}
      </span>
    </>
  ) : loading ? (
    "Starting video processing..."
  ) : (
    <>
      <Rocket className="w-5 h-5" /> Detect & Count Objects
    </>
  )}
</button>

                <button
                  onClick={resetAll}
                  className="w-full py-2 px-5 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-80 transition-opacity text-sm"
                  style={{
                    backgroundColor: colors.gray.dark,
                    color: colors.gray.light,
                  }}
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              </div>
            </div>

            {/* Results  */}
            <div
              style={{ background: gradients.card }}
              className="rounded-2xl shadow-xl p-5 md:p-6 min-h-96 flex flex-col"
            >
              <h2
                style={{ color: colors.gray.light }}
                className="text-lg md:text-xl font-bold mb-5 flex items-center shrink-0"
              >
                <BarChart3
                  className="w-5 h-5 mr-2"
                  style={{ color: colors.primary.dark }}
                />{" "}
                Results
              </h2>

              {results ? (
                <div className=" flex-1 flex flex-col">
                  <div className="flex-1 flex flex-col">
                    <h3
                      style={{ color: colors.gray.dark }}
                      className="text-sm font-semibold mb-2 flex items-center gap-2 shrink-0"
                    >
                      <Video
                        className="w-4 h-4"
                        style={{ color: colors.primary.dark }}
                      />{" "}
                      Processed Video
                    </h3>
                    {processedVideoUrl ? (
                      <video
                        key={videoKey}
                        ref={videoRef}
                        src={processedVideoUrl}
                        controls
                        className="w-full h-48 md:h-64 object-contain rounded-lg shadow-lg bg-black"
                        onError={handleVideoError}
                      />
                    ) : (
                      <p style={{ color: colors.gray.normal }}>
                        Processed video loading...
                      </p>
                    )}
                  </div>

                  {/* Enhanced Report */}
                  <div
                    className="p-4 rounded-lg shadow-lg flex-1 flex flex-col overflow-y-auto"
                    style={{
                      backgroundColor: colors.gray.light,
                    }}
                  >
                    <div className="mb-3 shrink-0">
                      <h3
                        style={{ color: colors.gray.dark }}
                        className="font-bold text-sm mb-2 flex items-center gap-2"
                      >
                        <BarChart3 className="w-4 h-4" style={{ color: colors.primary.normal }} />
                        Summary
                      </h3>
                      <div 
                        className="p-2 rounded-lg mb-3"
                        style={{ backgroundColor: colors.primary.light }}
                      >
                        <p style={{ color: colors.gray.dark }} className="text-xs">
                          <span className="font-semibold text-base" style={{ color: colors.primary.dark }}>
                            {results.frame_count}
                          </span>
                          {" "}Frames
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto">
                      <p
                        style={{ color: colors.gray.dark }}
                        className="font-semibold mb-2 text-xs"
                      >
                        Top Objects:
                      </p>
                      <div className="space-y-1">
                        {(() => {
                          const objectCounts = Object.entries(results)
                            .filter(
                              ([key]) =>
                                ![
                                  "frame_count",
                                  "timestamp",
                                  "video_url",
                                  "download_url",
                                  "filename",
                                  "total",
                                ].includes(key),
                            )
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 5);

                          return objectCounts.length > 0 ? (
                            objectCounts.map(([name, count], idx) => (
                              <div
                                key={name}
                                className="flex items-center justify-between p-1.5 rounded text-xs"
                                style={{ backgroundColor: colors.background.dark }}
                              >
                                <span style={{ color: colors.gray.dark }} className="font-medium truncate mr-2">
                                  {name}
                                </span>
                                <span
                                  className="font-bold px-2 py-0.5 rounded-full shrink-0"
                                  style={{ 
                                    color: colors.primary.normal,
                                    backgroundColor: colors.primary.light 
                                  }}
                                >
                                  {count}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p style={{ color: colors.gray.normal }}>
                              No objects detected
                            </p>
                          );
                        })()}
                      </div>
                    </div>

                    <div
                      style={{
                        color: colors.gray.dark,
                        borderTopColor: colors.gray.normal,
                      }}
                      className="mt-2 pt-2 border-t space-y-1 text-xs shrink-0"
                    >
                      <p className="font-bold">
                        Total: 
                        <span
                          style={{ color: colors.primary.normal }}
                          className="ml-1 font-bold text-sm"
                        >
                          {results.total}
                        </span>
                      </p>
                      <p style={{ color: colors.gray.normal }}>
                        ⏱️ {new Date(results.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={downloadVideo}
                    className="w-full py-2 px-5 rounded-lg font-medium text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg mt-3 shrink-0"
                    style={{ backgroundColor: colors.success.normal }}
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              ) : (
                <div 
                  className="flex-1 flex flex-col items-center justify-center rounded-lg p-8"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primary.light} 0%, ${colors.secondary.light} 100%)`,
                  }}
                >
                  <Film className="w-16 h-16 mb-4 opacity-60" style={{ color: colors.primary.normal }} />
                  <p style={{ color: colors.primary.dark }} className="font-bold text-base mb-2">
                    Ready to Analyze
                  </p>
                  <p style={{ color: colors.primary.dark }} className="text-xs text-center leading-relaxed max-w-xs opacity-80">
                    Upload a video on the left and click "Detect & Count Objects" to see results here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
