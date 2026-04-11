import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getScans } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { ScanResult, getScoreLabel, getImprovementTips } from "@/lib/scoring";
import ScoreRing from "@/components/ScoreRing";
import ScoreRadar from "@/components/ScoreRadar";

const labels: Record<string, string> = {
  symmetry: "Symmetry",
  goldenRatio: "Golden Ratio",
  skinHealth: "Skin Health",
  attractiveness: "Attractiveness",
  jawline: "Jawline",
  eyeHarmony: "Eye Harmony",
  lipBalance: "Lip Balance",
  overallHarmony: "Harmony",
};

const ScanResults = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getScans(user.id).then((scans) => {
        setScan(scans.find((s) => s.id === id) || null);
        setLoading(false);
      });
    }
  }, [user, id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  }

  if (!scan) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Scan not found</p></div>;
  }

  const radarData = Object.entries(scan.scores)
    .filter(([k]) => k !== "estimatedAge")
    .map(([key, val]) => ({ category: labels[key] || key, score: val as number }));

  const tips = getImprovementTips(scan.scores);

  return (
    <div className="min-h-screen bg-gradient-soft pb-8">
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="text-foreground"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="text-lg font-display font-bold text-foreground">Your Results</h1>
        <button className="text-muted-foreground"><Share2 className="w-5 h-5" /></button>
      </div>

      <div className="px-5 space-y-5">
        <motion.div className="bg-card rounded-3xl p-6 shadow-elevated text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <div className="flex justify-center mb-3"><ScoreRing score={scan.overall} size={120} strokeWidth={8} gradient /></div>
          <h2 className="text-2xl font-display font-bold text-foreground">{getScoreLabel(scan.overall)}</h2>
          <p className="text-sm text-muted-foreground mt-1">Estimated age: {scan.scores.estimatedAge}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{scan.date}</p>
        </motion.div>

        <motion.div className="bg-card rounded-2xl p-4 shadow-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="font-semibold text-sm text-foreground mb-1 px-1">Analysis Breakdown</h3>
          <ScoreRadar data={radarData} />
        </motion.div>

        <motion.div className="bg-card rounded-2xl p-5 shadow-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="font-semibold text-sm text-foreground mb-4">Detailed Scores</h3>
          <div className="grid grid-cols-4 gap-y-5 gap-x-2">
            {Object.entries(scan.scores)
              .filter(([k]) => k !== "estimatedAge")
              .map(([key, val]) => (
                <ScoreRing key={key} score={val as number} size={56} strokeWidth={4} label={labels[key]} />
              ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-accent" />
            <h3 className="font-semibold text-sm text-foreground">Improvement Plan</h3>
          </div>
          <div className="space-y-3">
            {tips.map((tip, i) => (
              <motion.div key={tip.area} className="bg-card rounded-2xl p-4 shadow-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                <div className="flex items-start gap-3">
                  <span className="text-xl">{tip.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-foreground capitalize">{labels[tip.area] || tip.area}</span>
                      <span className="text-xs text-muted-foreground">{tip.score}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tip.tip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button onClick={() => navigate("/")} className="w-full py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-glow" whileTap={{ scale: 0.97 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          Back to Home
        </motion.button>
      </div>
    </div>
  );
};

export default ScanResults;
