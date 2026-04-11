import { motion } from "framer-motion";
import { User, ChevronRight, Settings, Shield, Bell, Moon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getScans, getSurvey, SurveyData } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { ScanResult } from "@/lib/scoring";
import ScoreRing from "@/components/ScoreRing";

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [survey, setSurvey] = useState<SurveyData | null>(null);

  useEffect(() => {
    if (user) {
      getScans(user.id).then(setScans);
      getSurvey(user.id).then(setSurvey);
    }
  }, [user]);

  const lastScan = scans[0];

  const menuItems = [
    { icon: User, label: "Edit Survey Answers", action: () => navigate("/survey") },
    { icon: Shield, label: "Privacy & Security", action: () => {} },
    { icon: Bell, label: "Notifications", action: () => {} },
    { icon: Moon, label: "Appearance", action: () => {} },
    { icon: Settings, label: "Settings", action: () => {} },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-24">
      <div className="px-5 pt-14 pb-6">
        <h1 className="text-xl font-display font-bold text-foreground">Profile</h1>
      </div>

      <div className="px-5 space-y-5">
        <motion.div className="bg-card rounded-2xl p-6 shadow-card text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto mb-3 flex items-center justify-center overflow-hidden">
            {lastScan ? (
              <img src={lastScan.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-primary-foreground" />
            )}
          </div>
          <h2 className="font-display font-bold text-foreground">
            {survey?.gender ? `${survey.ageRange} · ${survey.gender}` : "Complete Your Profile"}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">{scans.length} scans total</p>

          {lastScan && (
            <div className="flex justify-center gap-6 mt-5">
              <ScoreRing score={lastScan.overall} size={56} strokeWidth={4} label="Best Score" gradient />
              <div className="flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">{scans.length}</span>
                <span className="text-[11px] text-muted-foreground">Total Scans</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">
                  {scans.length > 1
                    ? `${scans[0].overall - scans[scans.length - 1].overall > 0 ? "+" : ""}${scans[0].overall - scans[scans.length - 1].overall}%`
                    : "—"}
                </span>
                <span className="text-[11px] text-muted-foreground">Progress</span>
              </div>
            </div>
          )}
        </motion.div>

        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button key={item.label} onClick={item.action} className="w-full flex items-center gap-3 px-5 py-4 text-left border-b border-border last:border-0" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            );
          })}
        </div>

        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-destructive text-sm font-semibold">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
