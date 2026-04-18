import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Utensils, Flame } from "lucide-react";
import { weeklyMeals, dayName, todayIndex } from "../data/dailySchedules";
import GlassCard from "../components/GlassCard";

const TodayMeals = () => {
  const navigate = useNavigate();
  const day = todayIndex();
  const plan = weeklyMeals[day];

  return (
    <div className="min-h-screen pb-28">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </motion.button>
        <div>
          <p className="text-xs text-muted-foreground font-medium">{dayName(day)}'s Plan</p>
          <h1 className="text-lg font-bold text-foreground">Meal Prep Guide</h1>
        </div>
      </div>

      <div className="px-5 space-y-4">
        <GlassCard glow>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0">
              <Utensils className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Today</p>
              <h2 className="text-xl font-bold text-foreground">{plan.title}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="rounded-xl bg-muted p-2.5 text-center">
              <Flame className="w-3.5 h-3.5 text-primary mx-auto mb-0.5" />
              <p className="text-[10px] text-muted-foreground">Calories</p>
              <p className="text-sm font-bold text-foreground">{plan.totalCalories}</p>
            </div>
            <div className="rounded-xl bg-muted p-2.5 text-center">
              <p className="text-[10px] text-muted-foreground mt-1">Protein</p>
              <p className="text-sm font-bold text-foreground">{plan.totalProtein}g</p>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-2">
          {plan.meals.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <GlassCard>
                <div className="flex items-start gap-3">
                  <div className="w-14 shrink-0">
                    <p className="text-[10px] font-bold text-primary">{m.time}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{m.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{m.macros}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/discover?tab=nutrition")}
          className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg">
          Browse Recipes
        </motion.button>
      </div>
    </div>
  );
};
export default TodayMeals;
