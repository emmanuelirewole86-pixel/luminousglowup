import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Edit3, Trophy, TrendingUp, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getScans } from "@/lib/store";
import { ScanResult } from "@/lib/scoring";
import { supabase } from "@/integrations/supabase/client";
import GlassCard from "../components/GlassCard";
import ProgressRing from "../components/ProgressRing";

const ForgeProfile = () => {
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [profile, setProfile] = useState<{ display_name: string | null; avatar_url: string | null }>({ display_name: null, avatar_url: null });
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (!user) return;
    getScans(user.id).then(setScans);
    supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile({ display_name: data.display_name, avatar_url: data.avatar_url });
          setEditName(data.display_name || "");
        }
      });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    await supabase.from("profiles").update({ display_name: editName }).eq("user_id", user.id);
    setProfile(prev => ({ ...prev, display_name: editName }));
    setEditing(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const avgScore = scans.length > 0 ? Math.round(scans.reduce((a, s) => a + s.overall, 0) / scans.length) : 0;
  const bestScore = scans.length > 0 ? Math.max(...scans.map(s => s.overall)) : 0;
  const displayName = profile.display_name || user?.email?.split("@")[0] || "User";

  const badges = [
    { label: "First Scan", unlocked: scans.length >= 1, emoji: "🎯" },
    { label: "5 Scans", unlocked: scans.length >= 5, emoji: "🔥" },
    { label: "High Score", unlocked: bestScore >= 80, emoji: "👑" },
    { label: "Streak King", unlocked: scans.length >= 7, emoji: "⚡" },
  ];

  return (
    <div className="min-h-screen pb-28">
      <div className="px-5 pt-14 pb-6">
        <h1 className="text-xl font-bold text-[#1a1a2e]">Profile</h1>
      </div>

      <div className="px-5 space-y-4">
        {/* Avatar & Info */}
        <GlassCard glow className="flex flex-col items-center py-6">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF8FAB] to-[#FFB4C6] flex items-center justify-center overflow-hidden shadow-lg">
              {scans[0]?.imageUrl ? (
                <img src={scans[0].imageUrl} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <Camera className="w-10 h-10 text-white/80" />
              )}
            </div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setEditing(true)}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md border border-[#FFE4EC] flex items-center justify-center">
              <Edit3 className="w-3.5 h-3.5 text-[#FF8FAB]" />
            </motion.button>
          </div>

          {editing ? (
            <div className="flex gap-2 items-center">
              <input value={editName} onChange={e => setEditName(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-white/60 border border-[#FFE4EC] text-sm text-center outline-none focus:ring-2 focus:ring-[#FF8FAB]/30"
                autoFocus />
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleSave}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF8FAB] to-[#FFB4C6] text-white text-xs font-semibold">
                Save
              </motion.button>
            </div>
          ) : (
            <p className="text-lg font-bold text-[#1a1a2e]">{displayName}</p>
          )}
          <p className="text-xs text-[#8E8E93] mt-0.5">{user?.email}</p>
        </GlassCard>

        {/* Stats */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#FF8FAB]" />
            <h2 className="font-semibold text-sm text-[#1a1a2e]">Stats</h2>
          </div>
          <div className="flex justify-around">
            <ProgressRing value={avgScore} size={64} label="Avg Score" />
            <ProgressRing value={bestScore} size={64} label="Best" color="#FFB4C6" />
            <div className="flex flex-col items-center gap-1">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F3] flex items-center justify-center">
                <span className="text-lg font-bold text-[#FF8FAB]">{scans.length}</span>
              </div>
              <span className="text-[10px] font-medium text-[#8E8E93]">Scans</span>
            </div>
          </div>
        </GlassCard>

        {/* Badges */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-[#FF8FAB]" />
            <h2 className="font-semibold text-sm text-[#1a1a2e]">Badges</h2>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {badges.map(b => (
              <div key={b.label} className={`flex flex-col items-center gap-1 p-2 rounded-xl ${b.unlocked ? "bg-[#FFF0F3]" : "bg-[#F5F5F5] opacity-40"}`}>
                <span className="text-xl">{b.emoji}</span>
                <span className="text-[9px] font-semibold text-center text-[#1a1a2e] leading-tight">{b.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Recent Scans */}
        {scans.length > 0 && (
          <GlassCard>
            <h2 className="font-semibold text-sm text-[#1a1a2e] mb-3">Recent Scans</h2>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {scans.slice(0, 5).map(scan => (
                <div key={scan.id} className="shrink-0 w-16">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5F5F5]">
                    <img src={scan.imageUrl} className="w-full h-full object-cover" alt={scan.date} />
                  </div>
                  <p className="text-[9px] text-[#8E8E93] text-center mt-1">{scan.overall}%</p>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Sign Out */}
        <motion.button whileTap={{ scale: 0.98 }} onClick={handleSignOut}
          className="w-full py-3 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 text-[#FF8FAB] font-semibold text-sm flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
};

export default ForgeProfile;
