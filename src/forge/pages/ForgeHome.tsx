import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ScanFace, Dumbbell, Scissors, Utensils, Shirt, Flame, TrendingUp, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getScans } from "@/lib/store";
import { ScanResult } from "@/lib/scoring";
import GlassCard from "../components/GlassCard";
import ProgressRing from "../components/ProgressRing";
import fitnessModel1 from "@/assets/fitness-model-1.jpg";
import fitnessModel2 from "@/assets/fitness-model-2.jpg";
import fitnessModel3 from "@/assets/fitness-model-3.jpg";

const fitnessModels = [fitnessModel1, fitnessModel2, fitnessModel3];

const quickAccess = [
  { icon: Dumbbell, label: "Workouts", path: "/forge/discover?tab=exercise" },
  { icon: Utensils, label: "Nutrition", path: "/forge/discover?tab=nutrition" },
  { icon: Scissors, label: "Hair", path: "/forge/discover?tab=hair" },
  { icon: Shirt, label: "Style", path: "/forge/discover?tab=clothing" },
];

const featured = [
  { title: "AI Face Analysis", subtitle: "Know your strengths", icon: ScanFace, path: "/forge/scan" },
  { title: "Today's Workout", subtitle: "Push Day • 45 min", icon: Dumbbell, path: "/forge/discover?tab=exercise" },
  { title: "Hair Style Match", subtitle: "Based on your face shape", icon: Scissors, path: "/forge/discover?tab=hair" },
  { title: "Meal Prep Guide", subtitle: "High protein • 2500 cal", icon: Utensils, path: "/forge/discover?tab=nutrition" },
  { title: "Smart Casual Fit", subtitle: "Outfit of the day", icon: Shirt, path: "/forge/discover?tab=clothing" },
];

const ForgeHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [greeting, setGreeting] = useState("Good morning");
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
  }, []);

  useEffect(() => {
    if (user) getScans(user.id).then(setScans);
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % fitnessModels.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const lastScan = scans[0];
  const userName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "King";

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm text-muted-foreground font-medium">{greeting}</p>
          <h1 className="text-2xl font-bold text-foreground mt-0.5 tracking-tight">
            {userName} <span>💪</span>
          </h1>
        </motion.div>
      </div>

      <motion.div className="px-5 space-y-4" variants={container} initial="hidden" animate="show">
        {/* Hero Fitness Model Banner */}
        <motion.div variants={item} className="relative rounded-3xl overflow-hidden h-48 shadow-elevated">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroIndex}
              src={fitnessModels[heroIndex]}
              alt="Fitness inspiration"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              width={640}
              height={800}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <p className="text-white text-lg font-bold">Forge Your Best Self</p>
            <p className="text-white/70 text-xs mt-0.5">Train • Groom • Elevate</p>
          </div>
          {/* Dots */}
          <div className="absolute bottom-4 right-5 flex gap-1.5">
            {fitnessModels.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === heroIndex ? 'bg-white w-4' : 'bg-white/40'}`} />
            ))}
          </div>
        </motion.div>

        {/* Streak + Score */}
        <motion.div variants={item}>
          <GlassCard className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Flame className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{scans.length} Day Streak</p>
                <p className="text-xs text-muted-foreground">Keep it going!</p>
              </div>
            </div>
            {lastScan && <ProgressRing value={lastScan.overall} size={56} label="Score" />}
          </GlassCard>
        </motion.div>

        {/* Daily Overview */}
        {lastScan && (
          <motion.div variants={item}>
            <GlassCard>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-sm text-foreground">Daily Overview</h2>
              </div>
              <div className="flex justify-around">
                <ProgressRing value={lastScan.scores.symmetry} size={52} strokeWidth={4} label="Symmetry" />
                <ProgressRing value={lastScan.scores.skinHealth} size={52} strokeWidth={4} label="Skin" />
                <ProgressRing value={lastScan.scores.jawline} size={52} strokeWidth={4} label="Jaw" />
                <ProgressRing value={lastScan.scores.eyeHarmony} size={52} strokeWidth={4} label="Eyes" />
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Featured Carousel */}
        <motion.div variants={item}>
          <h2 className="font-semibold text-sm text-foreground mb-3 px-1">Featured</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-5 px-5">
            {featured.map((f) => (
              <motion.button
                key={f.title}
                onClick={() => navigate(f.path)}
                whileTap={{ scale: 0.95 }}
                className="snap-start shrink-0 w-[160px] rounded-2xl border border-border bg-card/60 backdrop-blur-2xl p-4 text-left shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center mb-3">
                  <f.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <p className="text-sm font-semibold text-foreground leading-tight">{f.title}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{f.subtitle}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Quick Access Grid */}
        <motion.div variants={item}>
          <h2 className="font-semibold text-sm text-foreground mb-3 px-1">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickAccess.map((qa) => (
              <GlassCard
                key={qa.label}
                onClick={() => navigate(qa.path)}
                className="flex items-center gap-3 p-4 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <qa.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{qa.label}</p>
                  <ChevronRight className="w-3 h-3 text-muted-foreground mt-0.5" />
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Scan CTA */}
        <motion.div variants={item}>
          <motion.button
            onClick={() => navigate("/forge/scan")}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-2xl bg-primary p-5 text-left shadow-glow relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <ScanFace className="w-6 h-6 text-primary-foreground" />
                <p className="text-primary-foreground font-bold text-base">Scan Your Face</p>
              </div>
              <p className="text-primary-foreground/80 text-xs">Get AI-powered face analysis and personalized recommendations</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10" />
            <div className="absolute right-10 -top-8 w-20 h-20 rounded-full bg-white/5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgeHome;
