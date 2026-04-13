import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Moon, Sun, Bell, Shield, Info, ChevronRight, ScanFace, Dumbbell, Utensils, Scissors } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import GlassCard from "../components/GlassCard";

const shortcuts = [
  { icon: ScanFace, label: "Scan Face", path: "/forge/scan" },
  { icon: Dumbbell, label: "Start Workout", path: "/forge/discover?tab=exercise" },
  { icon: Utensils, label: "Log Meal", path: "/forge/discover?tab=nutrition" },
  { icon: Scissors, label: "Hair Styles", path: "/forge/discover?tab=hair" },
];

const ForgeSettings = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen pb-28">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/forge/profile")}
          className="w-9 h-9 rounded-full bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </motion.button>
        <h1 className="text-lg font-bold text-foreground">Settings</h1>
      </div>

      <div className="px-5 space-y-4">
        {/* Quick Shortcuts */}
        <GlassCard>
          <h2 className="font-semibold text-sm text-foreground mb-3">Quick Shortcuts</h2>
          <div className="grid grid-cols-2 gap-2">
            {shortcuts.map(s => (
              <motion.button key={s.label} whileTap={{ scale: 0.95 }} onClick={() => navigate(s.path)}
                className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 border border-border">
                <s.icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">{s.label}</span>
              </motion.button>
            ))}
          </div>
        </GlassCard>

        {/* Preferences */}
        <GlassCard>
          <h2 className="font-semibold text-sm text-foreground mb-3">Preferences</h2>
          <div className="space-y-1">
            <motion.button whileTap={{ scale: 0.98 }} onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="flex items-center gap-3 text-sm text-foreground">
                {theme === "dark" ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}
                Dark Mode
              </span>
              <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 ${theme === "dark" ? "bg-primary" : "bg-muted"}`}>
                <motion.div layout className={`w-5 h-5 rounded-full bg-white shadow-sm ${theme === "dark" ? "ml-auto" : ""}`} />
              </div>
            </motion.button>

            <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="flex items-center gap-3 text-sm text-foreground">
                <Bell className="w-4 h-4 text-primary" />
                Notifications
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="flex items-center gap-3 text-sm text-foreground">
                <Shield className="w-4 h-4 text-primary" />
                Privacy
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </GlassCard>

        {/* About */}
        <GlassCard>
          <div className="flex items-center gap-3 px-1">
            <Info className="w-4 h-4 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Forge</p>
              <p className="text-[11px] text-muted-foreground">Version 1.0.0 • Built with Lovable</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ForgeSettings;
