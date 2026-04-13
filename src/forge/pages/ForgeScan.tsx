import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, RotateCcw, Sparkles, ArrowLeft, Sun } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { loadModels, analyzeFace } from "@/lib/faceAnalysis";
import { computeOverall, FaceScores } from "@/lib/scoring";
import { saveScan } from "@/lib/store";
import GlassCard from "../components/GlassCard";

type Stage = "idle" | "loading-models" | "detecting" | "analyzing" | "done" | "error";

const ForgeScan = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [scores, setScores] = useState<FaceScores | null>(null);
  const [error, setError] = useState("");
  const [faceInView, setFaceInView] = useState(true);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setStage("idle");
      setCapturedImage(null);
      setScores(null);
      setError("");
    } catch {
      setError("Camera access denied. Please allow camera access or upload a photo.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    stream?.getTracks().forEach(t => t.stop());
    setStream(null);
  }, [stream]);

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const c = canvasRef.current;
    c.width = videoRef.current.videoWidth;
    c.height = videoRef.current.videoHeight;
    c.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    const dataUrl = c.toDataURL("image/jpeg", 0.9);
    setCapturedImage(dataUrl);
    stopCamera();
    runAnalysis(dataUrl);
  }, [stopCamera]);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCapturedImage(dataUrl);
      stopCamera();
      runAnalysis(dataUrl);
    };
    reader.readAsDataURL(file);
  }, [stopCamera]);

  const runAnalysis = async (imageUrl: string) => {
    try {
      setStage("loading-models");
      await loadModels();
      setStage("detecting");
      const img = new Image();
      img.src = imageUrl;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      setStage("analyzing");
      const result = await analyzeFace(img);
      if (!result) {
        setStage("error");
        setError("No face detected. Ensure your face is well-lit and centered.");
        return;
      }
      setScores(result);
      setStage("done");

      if (user) {
        const overall = computeOverall(result);
        await saveScan({
          id: crypto.randomUUID(),
          date: new Date().toLocaleDateString(),
          imageUrl,
          scores: result,
          overall,
        }, user.id);
      }
    } catch (err) {
      setStage("error");
      setError("Analysis failed. Try a clearer photo with good lighting.");
    }
  };

  const stageMessages: Record<Stage, string> = {
    idle: "",
    "loading-models": "Loading AI models…",
    detecting: "Detecting face landmarks…",
    analyzing: "Analyzing features…",
    done: "Analysis complete!",
    error: "",
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => { stopCamera(); navigate("/forge"); }}
          className="w-9 h-9 rounded-full bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </motion.button>
        <h1 className="text-lg font-bold text-foreground">Face Scan</h1>
      </div>

      <div className="px-5 space-y-4">
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-card shadow-xl">
          {!capturedImage && stream && (
            <>
              <video ref={videoRef} className="w-full h-full object-cover scale-x-[-1]" playsInline muted />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[70%] h-[85%] rounded-[50%] border-2 border-primary/40 shadow-[inset_0_0_30px_hsl(var(--forge-primary)/0.15)]" />
              </div>
              {!faceInView && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute top-4 left-4 right-4 px-4 py-3 rounded-xl bg-black/50 backdrop-blur-lg flex items-center gap-2">
                  <Sun className="w-4 h-4 text-primary" />
                  <p className="text-white text-xs">Make sure your face is well-lit and centered</p>
                </motion.div>
              )}
            </>
          )}
          {capturedImage && (
            <img src={capturedImage} className="w-full h-full object-cover" alt="Captured" />
          )}
          {!capturedImage && !stream && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <Camera className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">Start camera or upload a photo</p>
            </div>
          )}

          <AnimatePresence>
            {stage !== "idle" && stage !== "done" && stage !== "error" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="w-12 h-12 rounded-full border-3 border-white/20 border-t-primary"
                />
                <p className="text-white text-sm font-medium">{stageMessages[stage]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-3">
          {!capturedImage ? (
            <>
              <motion.button whileTap={{ scale: 0.95 }} onClick={stream ? capture : startCamera}
                className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" />
                {stream ? "Capture" : "Start Camera"}
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-3.5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Photo
              </motion.button>
            </>
          ) : (
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setCapturedImage(null); setScores(null); setStage("idle"); setError(""); }}
              className="flex-1 py-3.5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Retake
            </motion.button>
          )}
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />

        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard className="border-destructive/30 bg-destructive/5">
              <p className="text-sm text-foreground">{error}</p>
            </GlassCard>
          </motion.div>
        )}

        <AnimatePresence>
          {scores && stage === "done" && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <GlassCard glow>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h2 className="font-bold text-sm text-foreground">Face Analysis</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Symmetry", value: scores.symmetry },
                    { label: "Golden Ratio", value: scores.goldenRatio },
                    { label: "Skin Health", value: scores.skinHealth },
                    { label: "Jawline", value: scores.jawline },
                    { label: "Eye Harmony", value: scores.eyeHarmony },
                    { label: "Lip Balance", value: scores.lipBalance },
                    { label: "Attractiveness", value: scores.attractiveness },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground font-medium">{s.label}</span>
                        <span className="font-bold text-foreground">{s.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.value}%` }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Estimated Age</span>
                  <span className="text-lg font-bold text-primary">{scores.estimatedAge}</span>
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="font-bold text-sm text-foreground mb-2">Recommendations</h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {scores.jawline < 70 && <li>💪 Jaw exercises and mewing can improve jawline definition</li>}
                  {scores.skinHealth < 75 && <li>💧 Start a consistent skincare routine with SPF and retinol</li>}
                  {scores.symmetry < 75 && <li>🧘 Facial yoga can help balance muscle symmetry</li>}
                  <li>✨ Check out hairstyles matched to your face shape in Discover</li>
                </ul>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ForgeScan;
