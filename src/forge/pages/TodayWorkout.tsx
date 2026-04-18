import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Dumbbell, Clock, Flame, Target } from "lucide-react";
import { weeklyWorkouts, dayName, todayIndex } from "../data/dailySchedules";
import GlassCard from "../components/GlassCard";

const TodayWorkout = () => {
  const navigate = useNavigate();
  const day = todayIndex();
  const plan = weeklyWorkouts[day];

  return (
    <div className="min-h-screen pb-28">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </motion.button>
        <div>
          <p className="text-xs text-muted-foreground font-medium">{dayName(day)}'s Plan</p>
          <h1 className="text-lg font-bold text-foreground">Today's Workout</h1>
        </div>
      </div>

      <div className="px-5 space-y-4">
        <GlassCard glow>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0">
              <Dumbbell className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Today</p>
              <h2 className="text-xl font-bold text-foreground">{plan.title}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{plan.focus}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="rounded-xl bg-muted p-2.5 text-center">
              <Clock className="w-3.5 h-3.5 text-primary mx-auto mb-0.5" />
              <p className="text-[10px] text-muted-foreground">Time</p>
              <p className="text-xs font-bold text-foreground">{plan.duration}</p>
            </div>
            <div className="rounded-xl bg-muted p-2.5 text-center">
              <Target className="w-3.5 h-3.5 text-primary mx-auto mb-0.5" />
              <p className="text-[10px] text-muted-foreground">Blocks</p>
              <p className="text-xs font-bold text-foreground">{plan.blocks.length}</p>
            </div>
            <div className="rounded-xl bg-muted p-2.5 text-center">
              <Flame className="w-3.5 h-3.5 text-primary mx-auto mb-0.5" />
              <p className="text-[10px] text-muted-foreground">Intensity</p>
              <p className="text-xs font-bold text-foreground">High</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold text-sm text-foreground mb-2">Warm-up</h3>
          <ul className="space-y-1.5">
            {plan.warmup.map((w, i) => (
              <li key={i} className="text-xs text-muted-foreground flex gap-2">
                <span className="text-primary font-bold">•</span>{w}
              </li>
            ))}
          </ul>
        </GlassCard>

        <div>
          <h3 className="font-semibold text-sm text-foreground mb-2 px-1">Workout</h3>
          <div className="space-y-2">
            {plan.blocks.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <GlassCard>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{b.name}</p>
                      <p className="text-[11px] text-muted-foreground">{b.muscle}</p>
                    </div>
                    <span className="text-xs font-bold text-primary shrink-0">{b.sets}</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        <GlassCard>
          <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Finisher:</span> {plan.finisher}</p>
        </GlassCard>
        <GlassCard>
          <p className="text-xs text-muted-foreground italic">💡 {plan.notes}</p>
        </GlassCard>

        <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/discover?tab=exercise")}
          className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg">
          Browse Exercise Library
        </motion.button>
      </div>
    </div>
  );
};
export default TodayWorkout;
