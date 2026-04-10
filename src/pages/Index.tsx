import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ScanFace, TrendingUp, Sparkles, ChevronRight } from "lucide-react";
import { getScans } from "@/lib/store";
import ScoreRing from "@/components/ScoreRing";
import ThemeToggle from "@/components/ThemeToggle";

const tips = [
  "Hydration is the #1 factor for glowing skin. Aim for 8 glasses daily.",
  "Sunscreen is the best anti-aging product. Use SPF 50 every morning.",
  "Sleep on a silk pillowcase to reduce facial creasing and wrinkles.",
  "A 5-minute facial massage boosts circulation and reduces puffiness.",
  "Vitamin C serum brightens skin and fights free radical damage.",
];

const Home = () => {
  const navigate = useNavigate();
  const scans = getScans();
  const lastScan = scans[0];
  const tipOfDay = tips[new Date().getDate() % tips.length];

  return (
    <div className="min-h-screen pb-24 bg-gradient-soft">
      {/* Header */}
      <div className="px-6 pt-14 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground font-medium">Welcome back</p>
          <h1 className="text-2xl font-bold font-display text-foreground mt-0.5">
            Lumina<span className="text-gradient">Face</span>
          </h1>
        </motion.div>
      </div>

      <div className="px-5 space-y-5">
        {/* Scan CTA */}
        <motion.button
          onClick={() => navigate("/scan")}
          className="w-full relative overflow-hidden rounded-2xl bg-gradient-primary p-6 text-left shadow-elevated"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <ScanFace className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-primary-foreground font-semibold text-base">Scan Your Face</p>
                <p className="text-primary-foreground/70 text-xs">AI-powered analysis in seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary-foreground/80 text-xs font-medium">
              <span>Start now</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-primary-foreground/10" />
          <div className="absolute right-8 -top-6 w-16 h-16 rounded-full bg-primary-foreground/5" />
        </motion.button>

        {/* Last Scan Summary */}
        {lastScan && (
          <motion.div
            className="bg-card rounded-2xl p-5 shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-sm text-foreground">Last Scan</h2>
              </div>
              <span className="text-xs text-muted-foreground">{lastScan.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <ScoreRing score={lastScan.overall} size={72} gradient label="Overall" />
              <div className="flex gap-3">
                <ScoreRing score={lastScan.scores.symmetry} size={56} strokeWidth={4} label="Symmetry" />
                <ScoreRing score={lastScan.scores.skinHealth} size={56} strokeWidth={4} label="Skin" />
                <ScoreRing score={lastScan.scores.eyeHarmony} size={56} strokeWidth={4} label="Eyes" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Streak */}
        <motion.div
          className="bg-card rounded-2xl p-5 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <h2 className="font-semibold text-sm text-foreground">Progress Streak</h2>
          </div>
          <div className="flex gap-1.5">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`h-8 flex-1 rounded-lg flex items-center justify-center text-[10px] font-medium ${
                  i < scans.length
                    ? "bg-gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {scans.length > 0 ? `${scans.length} scan${scans.length > 1 ? "s" : ""} this week` : "Start scanning to build your streak!"}
          </p>
        </motion.div>

        {/* Tip of the Day */}
        <motion.div
          className="rounded-2xl p-5 bg-peach shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs font-semibold text-accent-foreground/60 uppercase tracking-wide mb-1">💡 Tip of the Day</p>
          <p className="text-sm text-accent-foreground font-medium leading-relaxed">{tipOfDay}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
