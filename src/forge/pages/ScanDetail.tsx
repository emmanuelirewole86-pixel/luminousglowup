import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Eye, Scissors, Palette, Lightbulb, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getScanById, updateScanDetails, FullScan, ScanDetails } from "@/lib/store";
import GlassCard from "../components/GlassCard";
import ProgressRing from "../components/ProgressRing";
import { toast } from "sonner";

const ScanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scan, setScan] = useState<FullScan | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (!id) return;
    getScanById(id).then(d => { setScan(d); setLoading(false); });
  }, [id]);

  const runAIAnalysis = async () => {
    if (!scan || analyzing) return;
    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-scan", {
        body: { imageBase64: scan.imageUrl },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const details: ScanDetails = {
        eye_color: data.eye_color,
        hair_color: data.hair_color,
        skin_tone: data.skin_tone,
        face_shape: data.face_shape,
        recommendations: data.recommendations,
      };
      await updateScanDetails(scan.id, details);
      setScan({ ...scan, ...details });
      toast.success("AI analysis complete");
    } catch (e: any) {
      toast.error(e.message || "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-sm text-muted-foreground">Loading…</p></div>;
  }
  if (!scan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-muted-foreground">Scan not found</p>
        <button onClick={() => navigate("/scans")} className="text-primary text-sm font-semibold">Back to history</button>
      </div>
    );
  }

  const recs = scan.recommendations;

  return (
    <div className="min-h-screen pb-28">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </motion.button>
        <div>
          <h1 className="text-lg font-bold text-foreground">Scan Details</h1>
          <p className="text-xs text-muted-foreground">{scan.date}</p>
        </div>
      </div>

      <div className="px-5 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-card shadow-elevated">
          <img src={scan.imageUrl} alt="Scan" className="w-full h-full object-cover" />
          <div className="absolute bottom-3 right-3">
            <ProgressRing value={scan.overall} size={64} label="Overall" />
          </div>
        </motion.div>

        {/* AI Detection */}
        {!recs && (
          <motion.button whileTap={{ scale: 0.97 }} onClick={runAIAnalysis} disabled={analyzing}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg flex items-center justify-center gap-2 disabled:opacity-60">
            {analyzing ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing with AI…</> : <><Sparkles className="w-4 h-4" /> Run AI Vision Analysis</>}
          </motion.button>
        )}

        {(scan.eye_color || scan.hair_color || scan.skin_tone || scan.face_shape) && (
          <GlassCard glow>
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-primary" />
              <h2 className="font-bold text-sm text-foreground">AI Detection</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { k: "Face Shape", v: scan.face_shape },
                { k: "Skin Tone", v: scan.skin_tone },
                { k: "Eye Color", v: scan.eye_color },
                { k: "Hair Color", v: scan.hair_color },
              ].map(item => (
                <div key={item.k} className="rounded-xl bg-muted p-2.5">
                  <p className="text-[10px] text-muted-foreground">{item.k}</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{item.v || "—"}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Score breakdown */}
        <GlassCard>
          <h2 className="font-bold text-sm text-foreground mb-3">Score Breakdown</h2>
          <div className="space-y-2.5">
            {[
              { label: "Symmetry", value: scan.scores.symmetry },
              { label: "Golden Ratio", value: scan.scores.goldenRatio },
              { label: "Skin Health", value: scan.scores.skinHealth },
              { label: "Jawline", value: scan.scores.jawline },
              { label: "Eye Harmony", value: scan.scores.eyeHarmony },
              { label: "Lip Balance", value: scan.scores.lipBalance },
            ].map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground font-medium">{s.label}</span>
                  <span className="font-bold text-foreground">{s.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.value}%` }} transition={{ duration: 0.7 }}
                    className="h-full bg-primary rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Hairstyles */}
        {recs?.hairstyles && recs.hairstyles.length > 0 && (
          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <Scissors className="w-4 h-4 text-primary" />
              <h2 className="font-bold text-sm text-foreground">Hairstyles for You</h2>
            </div>
            <div className="space-y-3">
              {recs.hairstyles.map((h, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="rounded-xl bg-muted p-3">
                  <p className="text-sm font-semibold text-foreground">{h.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{h.why}</p>
                </motion.div>
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/discover?tab=hair")}
              className="w-full mt-3 py-2.5 rounded-xl bg-primary/10 text-primary text-xs font-semibold">
              Explore hair library
            </motion.button>
          </GlassCard>
        )}

        {/* Skincare */}
        {recs?.skincare && recs.skincare.length > 0 && (
          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-primary" />
              <h2 className="font-bold text-sm text-foreground">Skincare Routine</h2>
            </div>
            <ol className="space-y-2.5">
              {recs.skincare.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{s.step} <span className="font-normal text-muted-foreground">— {s.product_type}</span></p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{s.tip}</p>
                  </div>
                </li>
              ))}
            </ol>
          </GlassCard>
        )}

        {/* Lifestyle */}
        {recs?.lifestyle && recs.lifestyle.length > 0 && (
          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-primary" />
              <h2 className="font-bold text-sm text-foreground">Lifestyle Tips</h2>
            </div>
            <ul className="space-y-2">
              {recs.lifestyle.map((t, i) => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2">
                  <span className="text-primary font-bold">•</span>{t}
                </li>
              ))}
            </ul>
          </GlassCard>
        )}

        {recs && (
          <motion.button whileTap={{ scale: 0.97 }} onClick={runAIAnalysis} disabled={analyzing}
            className="w-full py-3 rounded-2xl bg-card/60 backdrop-blur-xl border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
            {analyzing ? <><Loader2 className="w-4 h-4 animate-spin" /> Re-analyzing…</> : <>↻ Re-run AI analysis</>}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ScanDetail;
