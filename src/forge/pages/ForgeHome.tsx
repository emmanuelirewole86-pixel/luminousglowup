import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ScanFace, Dumbbell, Scissors, Utensils, Shirt, Flame, TrendingUp, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getScans } from "@/lib/store";
import { ScanResult } from "@/lib/scoring";
import GlassCard from "../components/GlassCard";
import ProgressRing from "../components/ProgressRing";

const quickAccess = [
  { icon: Dumbbell, label: "Workouts", path: "/forge/discover?tab=exercise", gradient: "from-[#FF8FAB] to-[#FF6B8A]" },
  { icon: Utensils, label: "Nutrition", path: "/forge/discover?tab=nutrition", gradient: "from-[#FFB4C6] to-[#FF8FAB]" },
  { icon: Scissors, label: "Hair", path: "/forge/discover?tab=hair", gradient: "from-[#FF8FAB] to-[#E876A0]" },
  { icon: Shirt, label: "Style", path: "/forge/discover?tab=clothing", gradient: "from-[#FFB4C6] to-[#FF97B5]" },
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

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
  }, []);

  useEffect(() => {
    if (user) getScans(user.id).then(setScans);
  }, [user]);

  const lastScan = scans[0];
  const userName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "King";

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm text-[#8E8E93] font-medium">{greeting}</p>
          <h1 className="text-2xl font-bold text-[#1a1a2e] mt-0.5 tracking-tight">
            {userName} <span className="text-[#FF8FAB]">💪</span>
          </h1>
        </motion.div>
      </div>

      <motion.div className="px-5 space-y-4" variants={container} initial="hidden" animate="show">
        {/* Streak + Score */}
        <motion.div variants={item}>
          <GlassCard className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8FAB] to-[#FFB4C6] flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1a1a2e]">{scans.length} Day Streak</p>
                <p className="text-xs text-[#8E8E93]">Keep it going!</p>
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
                <TrendingUp className="w-4 h-4 text-[#FF8FAB]" />
                <h2 className="font-semibold text-sm text-[#1a1a2e]">Daily Overview</h2>
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
          <h2 className="font-semibold text-sm text-[#1a1a2e] mb-3 px-1">Featured</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-5 px-5">
            {featured.map((f, i) => (
              <motion.button
                key={f.title}
                onClick={() => navigate(f.path)}
                whileTap={{ scale: 0.95 }}
                className="snap-start shrink-0 w-[160px] rounded-2xl border border-white/50 bg-white/60 backdrop-blur-2xl p-4 text-left shadow-sm"
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF8FAB] to-[#FFB4C6] flex items-center justify-center mb-3`}>
                  <f.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-semibold text-[#1a1a2e] leading-tight">{f.title}</p>
                <p className="text-[11px] text-[#8E8E93] mt-1">{f.subtitle}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Quick Access Grid */}
        <motion.div variants={item}>
          <h2 className="font-semibold text-sm text-[#1a1a2e] mb-3 px-1">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickAccess.map((qa) => (
              <GlassCard
                key={qa.label}
                onClick={() => navigate(qa.path)}
                className="flex items-center gap-3 p-4 cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${qa.gradient} flex items-center justify-center shrink-0`}>
                  <qa.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a2e]">{qa.label}</p>
                  <ChevronRight className="w-3 h-3 text-[#8E8E93] mt-0.5" />
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
            className="w-full rounded-2xl bg-gradient-to-r from-[#FF8FAB] to-[#FFB4C6] p-5 text-left shadow-[0_8px_32px_-8px_rgba(255,143,171,0.35)] relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <ScanFace className="w-6 h-6 text-white" />
                <p className="text-white font-bold text-base">Scan Your Face</p>
              </div>
              <p className="text-white/80 text-xs">Get AI-powered face analysis and personalized recommendations</p>
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
