import React, { useState, useRef } from "react";
import {
  Folder,
  Check,
  BarChart3,
  Video,
  Rocket,
  RotateCcw,
  Download,
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

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

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

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await fetch(`${API_URL}/process-video`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Processing failed");
      }

      console.log("Processing complete:", data);

      setResults(data);

      // Video URL with cache busting
      if (data.video_url) {
        const videoUrl = `${API_URL}${data.video_url}?t=${Date.now()}`;
        setProcessedVideoUrl(videoUrl);
        setVideoKey(Date.now());
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to process video.");
    } finally {
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
    setVideoFile(null);
    setPreviewUrl(null);
    setResults(null);
    setProcessedVideoUrl(null);
    setError("");
    setVideoKey(Date.now());
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
      // style={{ backgroundColor: colors.background.subtle }}
      style={{ background: gradients.backgroundwall }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />

      <main className="flex-1">
        <div className="p-8 md:p-6">
          <header className="text-center mb-8 md:mb-12">
            <h1
              style={{ color: colors.gray.dark }}
              className="text-3xl md:text-4xl font-bold mb-3"
            >
              Object Detection System
            </h1>
            <p style={{ color: colors.gray.normal }} className="text-lg">
              Detect, track, and count object by size
            </p>
          </header>

          <div className="max-w-375 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

            {/* Upload */}
            <div
              style={{ backgroundColor: colors.background.normal }}
              className="rounded-2xl shadow-xl p-6 md:p-8"
            >
              <h2
                style={{ color: colors.gray.dark }}
                className="text-2xl font-bold mb-6 flex items-center"
              >
                <Folder
                  className="w-6 h-6 mr-2"
                  style={{ color: colors.primary.normal }}
                />{" "}
                Upload Video
              </h2>
              <div
                className="border-2 border-dashed rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer hover:transition-colors"
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
                  <div className="flex items-center gap-2 truncate">
                    <Check
                      className="w-5 h-5"
                      style={{ color: colors.success.normal }}
                    />
                    <p
                      style={{ color: colors.gray.dark }}
                      className="text-sm truncate"
                    >
                      {videoFile.name}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Folder
                      className="w-5 h-5"
                      style={{ color: colors.gray.normal }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: colors.gray.normal }}
                    >
                      Upload Video
                    </span>
                  </div>
                )}
              </div>

              {previewUrl && (
                <div className="mt-4">
                  <h3
                    style={{ color: colors.gray.dark }}
                    className="text-lg font-semibold mb-3"
                  >
                    Original Video Preview
                  </h3>
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-48 md:h-64 object-contain rounded-lg shadow-md bg-black"
                  />
                </div>
              )}

              {error && (
                <div
                  className="mt-4 p-4 border rounded-lg"
                  style={{
                    backgroundColor: colors.danger.light,
                    borderColor: colors.danger.normal,
                  }}
                >
                  <p style={{ color: colors.danger.dark }}>{error}</p>
                </div>
              )}

              <div className="mt-6 space-y-4">
                <button
                  onClick={processVideo}
                  disabled={!videoFile || loading}
                  className="w-full py-4 px-6 rounded-xl font-semibold text-lg text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    background:
                      !videoFile || loading
                        ? colors.gray.normal
                        : gradients.primary,
                    cursor: !videoFile || loading ? "not-allowed" : "pointer",
                    opacity: !videoFile || loading ? 0.6 : 1,
                  }}
                >
                  {loading ? (
                    "Processing Video..."
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" /> Detect & Count Objects
                    </>
                  )}
                </button>

                <button
                  onClick={resetAll}
                  className="w-full py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: colors.gray.dark,
                    color: colors.gray.light,
                  }}
                >
                  <RotateCcw className="w-5 h-5" /> Reset
                </button>
              </div>
            </div>

            {/* Results  */}
            <div
              // style={{ backgroundColor: #9477db }}
              // style={{ background: "linear-gradient(135deg, #cfedfb 0%, #9fdbf6 50%, #56c0f0 100%)" }}
              style={{ background: gradients.card }}
              className="rounded-2xl shadow-xl p-6 md:p-8"
            >
              <h2
                style={{ color: colors.gray.light }}
                className="text-2xl font-bold mb-6 flex items-center"
              >
                <BarChart3
                  className="w-6 h-6 mr-2"
                  style={{ color: colors.primary.dark }}
                />{" "}
                Detection Results
              </h2>

              {results ? (
                <>
                  <div className="mb-6">
                    <h3
                      style={{ color: colors.gray.dark }}
                      className="text-xl font-semibold mb-4 flex items-center gap-2"
                    >
                      <Video
                        className="w-5 h-5"
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
                        className="w-full h-64 md:h-72 object-contain rounded-lg shadow-lg bg-black"
                        onError={handleVideoError}
                      />
                    ) : (
                      <p style={{ color: colors.gray.normal }}>
                        Processed video loading...
                      </p>
                    )}
                  </div>

                  {/* Report */}
                  <div
                    className="p-4 rounded-lg  shadow-xl  md:p-8 "
                    style={{
                      backgroundColor: colors.gray.light,
                      // borderColor: colors.gray.normal,
                    }}
                  >
                    <h3
                      style={{ color: colors.gray.dark }}
                      className="font-bold mb-2"
                    >
                      Detection Summary
                    </h3>
                    <p style={{ color: colors.gray.dark }}>
                      Total Frames: {results.frame_count}
                    </p>
                    <p
                      style={{ color: colors.gray.dark }}
                      className="font-semibold mt-3 mb-2"
                    >
                      Top Detected Objects:
                    </p>
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
                        objectCounts.map(([name, count]) => (
                          <p
                            key={name}
                            style={{ color: colors.gray.normal }}
                            className="text-sm md:text-base"
                          >
                            {name}:{" "}
                            <span
                              style={{ color: colors.primary.normal }}
                              className="font-semibold"
                            >
                              {count}
                            </span>
                          </p>
                        ))
                      ) : (
                        <p style={{ color: colors.gray.normal }}>
                          No objects detected
                        </p>
                      );
                    })()}
                    <p
                      style={{
                        color: colors.gray.dark,
                        borderTopColor: colors.gray.normal,
                      }}
                      className="mt-3 border-t pt-3 font-semibold"
                    >
                      Total Unique: {results.total}
                    </p>
                    <p
                      style={{ color: colors.gray.normal }}
                      className="text-sm"
                    >
                      Processed at:{" "}
                      {new Date(results.timestamp).toLocaleTimeString()}
                    </p>
                  </div>

                  <button
                    onClick={downloadVideo}
                    className="mt-4 w-full py-3 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.success.normal }}
                  >
                    <Download className="w-5 h-5" /> Download Processed Video
                  </button>
                </>
              ) : (
                <p style={{ color:"white" }}>No results yet.</p>
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
