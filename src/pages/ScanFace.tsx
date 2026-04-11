import { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, RotateCcw, Zap, X, AlertCircle } from "lucide-react";
import { computeOverall, type ScanResult } from "@/lib/scoring";
import { analyzeFace, loadModels } from "@/lib/faceAnalysis";
import { saveScan } from "@/lib/store";

const ScanFacePage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [modelsReady, setModelsReady] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisStage, setAnalysisStage] = useState("");

  // Preload face-api models on mount
  useEffect(() => {
    loadModels().then(() => setModelsReady(true)).catch(() => {});
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setIsCameraOn(true);
    } catch {
      alert("Camera access is needed to scan your face. Please allow camera permissions.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setIsCameraOn(false);
  }, [stream]);

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setCapturedImage(dataUrl);
    stopCamera();
  }, [stopCamera]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCapturedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const analyze = useCallback(async () => {
    if (!capturedImage) return;
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisStage("Loading AI models...");

    try {
      // Create an image element for face-api
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = capturedImage;
      });

      setAnalysisStage("Detecting face landmarks...");
      const scores = await analyzeFace(img);

      if (!scores) {
        setAnalysisError("No face detected. Please use a clear, front-facing photo with good lighting.");
        setIsAnalyzing(false);
        return;
      }

      setAnalysisStage("Computing scores...");
      const overall = computeOverall(scores);
      const result: ScanResult = {
        id: crypto.randomUUID(),
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        imageUrl: capturedImage,
        scores,
        overall,
      };
      saveScan(result);
      setIsAnalyzing(false);
      navigate(`/results/${result.id}`);
    } catch (err) {
      console.error("Analysis failed:", err);
      setAnalysisError("Analysis failed. Please try again with a different photo.");
      setIsAnalyzing(false);
    }
  }, [capturedImage, navigate]);

  const reset = () => {
    setCapturedImage(null);
    setIsAnalyzing(false);
    setAnalysisError(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">Scan Face</h1>
          {!modelsReady && (
            <p className="text-xs text-muted-foreground mt-0.5">Loading AI models...</p>
          )}
        </div>
        {(isCameraOn || capturedImage) && (
          <button onClick={() => { stopCamera(); reset(); }} className="text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center px-5">
        {/* Camera / Preview Area */}
        <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden bg-muted mb-6">
          {isCameraOn && !capturedImage && (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
              {/* Face Guide Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-52 h-72 rounded-[50%] border-2 border-primary-foreground/40 shadow-glow" />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-xs text-primary-foreground/80 font-medium bg-foreground/30 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
                  Position your face in the oval
                </p>
              </div>
            </>
          )}

          {capturedImage && (
            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
          )}

          {!isCameraOn && !capturedImage && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-28 rounded-[50%] border-2 border-dashed border-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Take a selfie or upload a photo</p>
            </div>
          )}

          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                className="absolute inset-0 bg-foreground/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  <Zap className="w-7 h-7 text-primary-foreground" />
                </motion.div>
                <p className="text-primary-foreground font-medium text-sm">{analysisStage}</p>
                <div className="w-48 h-1.5 bg-primary-foreground/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary-foreground rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <canvas ref={canvasRef} className="hidden" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        {/* Error Message */}
        {analysisError && (
          <motion.div
            className="w-full max-w-sm mb-4 p-3 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-start gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
            <p className="text-xs text-destructive">{analysisError}</p>
          </motion.div>
        )}

        {/* Actions */}
        <div className="w-full max-w-sm space-y-3">
          {!capturedImage && !isCameraOn && (
            <>
              <motion.button
                onClick={startCamera}
                className="w-full py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-glow"
                whileTap={{ scale: 0.97 }}
              >
                <Camera className="w-5 h-5" />
                Take a Selfie
              </motion.button>
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 rounded-2xl bg-card border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-card"
                whileTap={{ scale: 0.97 }}
              >
                <Upload className="w-5 h-5" />
                Upload Photo
              </motion.button>
            </>
          )}

          {isCameraOn && !capturedImage && (
            <motion.button
              onClick={capture}
              className="w-full py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-glow"
              whileTap={{ scale: 0.97 }}
            >
              <Camera className="w-5 h-5" />
              Capture
            </motion.button>
          )}

          {capturedImage && !isAnalyzing && (
            <div className="flex gap-3">
              <motion.button
                onClick={reset}
                className="flex-1 py-4 rounded-2xl bg-card border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-2"
                whileTap={{ scale: 0.97 }}
              >
                <RotateCcw className="w-4 h-4" />
                Retake
              </motion.button>
              <motion.button
                onClick={analyze}
                className="flex-[2] py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-glow"
                whileTap={{ scale: 0.97 }}
              >
                <Zap className="w-4 h-4" />
                Analyze Face
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanFacePage;
