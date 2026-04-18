import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sun, Moon, Sparkles } from "lucide-react";
import { weeklyFaceRituals, dayName, todayIndex } from "../data/dailySchedules";
import GlassCard from "../components/GlassCard";

const TodayFace = () => {
  const navigate = useNavigate();
  const day = todayIndex();
  const ritual = weeklyFaceRituals[day];

  return (
    <div className="min-h-screen pb-28">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </motion.button>
        <div>
          <p className="text-xs text-muted-foreground font-medium">{dayName(day)}'s Ritual</p>
          <h1 className="text-lg font-bold text-foreground">Face & Skincare</h1>
        </div>
      </div>

      <div className="px-5 space-y-4">
        <GlassCard glow>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Today</p>
              <h2 className="text-xl font-bold text-foreground">{ritual.title}</h2>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <Sun className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm text-foreground">Morning Routine</h3>
          </div>
          <ol className="space-y-2">
            {ritual.am.map((step, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                {step}
              </motion.li>
            ))}
          </ol>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <Moon className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm text-foreground">Evening Routine</h3>
          </div>
          <ol className="space-y-2">
            {ritual.pm.map((step, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                {step}
              </motion.li>
            ))}
          </ol>
        </GlassCard>

        <GlassCard>
          <p className="text-xs text-muted-foreground italic">💡 {ritual.weeklyTip}</p>
        </GlassCard>

        <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/scan")}
          className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg">
          Scan Your Face
        </motion.button>
      </div>
    </div>
  );
};
export default TodayFace;
