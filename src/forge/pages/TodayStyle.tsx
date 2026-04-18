import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shirt } from "lucide-react";
import { weeklyOutfits, dayName, todayIndex } from "../data/dailySchedules";
import GlassCard from "../components/GlassCard";

const TodayStyle = () => {
  const navigate = useNavigate();
  const day = todayIndex();
  const outfit = weeklyOutfits[day];

  return (
    <div className="min-h-screen pb-28">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </motion.button>
        <div>
          <p className="text-xs text-muted-foreground font-medium">{dayName(day)}'s Look</p>
          <h1 className="text-lg font-bold text-foreground">Smart Fit</h1>
        </div>
      </div>

      <div className="px-5 space-y-4">
        <GlassCard glow>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0">
              <Shirt className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Today's Vibe</p>
              <h2 className="text-xl font-bold text-foreground">{outfit.title}</h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">{outfit.vibe}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold text-sm text-foreground mb-3">The Outfit</h3>
          <ul className="space-y-2">
            {outfit.pieces.map((p, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2 text-xs text-foreground">
                <span className="text-primary font-bold">👔</span>{p}
              </motion.li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold text-sm text-foreground mb-3">Color Palette</h3>
          <div className="flex flex-wrap gap-1.5">
            {outfit.palette.map((c, i) => (
              <span key={i} className="text-[11px] px-3 py-1.5 rounded-full bg-muted text-primary font-semibold">{c}</span>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Finishing touch:</span> {outfit.finishingTouch}</p>
        </GlassCard>

        <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/discover?tab=clothing")}
          className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg">
          Browse Outfits
        </motion.button>
      </div>
    </div>
  );
};
export default TodayStyle;
