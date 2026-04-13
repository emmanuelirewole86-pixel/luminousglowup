import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Edit3, Trophy, TrendingUp, LogOut, Settings, ChevronRight, Lock, Mail, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getScans } from "@/lib/store";
import { ScanResult } from "@/lib/scoring";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import GlassCard from "../components/GlassCard";
import ProgressRing from "../components/ProgressRing";

const ForgeProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [profile, setProfile] = useState<{ display_name: string | null; avatar_url: string | null }>({ display_name: null, avatar_url: null });
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    getScans(user.id).then(setScans);
    setEditEmail(user.email || "");
    supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile({ display_name: data.display_name, avatar_url: data.avatar_url });
          setEditName(data.display_name || "");
        }
      });
  }, [user]);

  const handleSaveName = async () => {
    if (!user) return;
    await supabase.from("profiles").update({ display_name: editName }).eq("user_id", user.id);
    setProfile(prev => ({ ...prev, display_name: editName }));
    setEditing(false);
    toast({ title: "Name updated" });
  };

  const handleUpdateEmail = async () => {
    const { error } = await supabase.auth.updateUser({ email: editEmail });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Confirmation email sent", description: "Check your inbox to confirm the new email." });
  };

  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      toast({ title: "Password too short", description: "Minimum 6 characters", variant: "destructive" });
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Password updated" });
      setChangingPassword(false);
      setNewPassword("");
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      await supabase.from("profiles").update({ avatar_url: dataUrl }).eq("user_id", user.id);
      setProfile(prev => ({ ...prev, avatar_url: dataUrl }));
      toast({ title: "Profile picture updated" });
    };
    reader.readAsDataURL(file);
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
      <div className="px-5 pt-14 pb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Profile</h1>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/forge/settings")}
          className="w-9 h-9 rounded-full bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>

      <div className="px-5 space-y-4">
        {/* Avatar & Info */}
        <GlassCard glow className="flex flex-col items-center py-6">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center overflow-hidden shadow-lg">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
              ) : scans[0]?.imageUrl ? (
                <img src={scans[0].imageUrl} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <Camera className="w-10 h-10 text-primary-foreground/80" />
              )}
            </div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => avatarInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-card shadow-md border border-border flex items-center justify-center">
              <Edit3 className="w-3.5 h-3.5 text-primary" />
            </motion.button>
            <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>

          {editing ? (
            <div className="flex gap-2 items-center">
              <input value={editName} onChange={e => setEditName(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-card/60 border border-border text-sm text-center outline-none focus:ring-2 focus:ring-primary/30"
                autoFocus />
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleSaveName}
                className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold">
                Save
              </motion.button>
            </div>
          ) : (
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setEditing(true)}>
              <p className="text-lg font-bold text-foreground flex items-center gap-1">{displayName} <Edit3 className="w-3 h-3 text-muted-foreground" /></p>
            </motion.button>
          )}
          <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
        </GlassCard>

        {/* Account Management */}
        <GlassCard>
          <h2 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-primary" /> Account
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Email</label>
              <div className="flex gap-2">
                <input value={editEmail} onChange={e => setEditEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-card/60 border border-border text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground" />
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleUpdateEmail}
                  className="px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold">
                  Update
                </motion.button>
              </div>
            </div>
            <div>
              {!changingPassword ? (
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setChangingPassword(true)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-card/60 border border-border">
                  <span className="flex items-center gap-2 text-sm text-foreground"><Lock className="w-4 h-4 text-primary" /> Change Password</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              ) : (
                <div className="flex gap-2">
                  <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" placeholder="New password (min 6 chars)"
                    className="flex-1 px-3 py-2 rounded-xl bg-card/60 border border-border text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground" />
                  <motion.button whileTap={{ scale: 0.95 }} onClick={handleUpdatePassword}
                    className="px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold">
                    Save
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Stats */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-sm text-foreground">Stats</h2>
          </div>
          <div className="flex justify-around">
            <ProgressRing value={avgScore} size={64} label="Avg Score" />
            <ProgressRing value={bestScore} size={64} label="Best" />
            <div className="flex flex-col items-center gap-1">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{scans.length}</span>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">Scans</span>
            </div>
          </div>
        </GlassCard>

        {/* Badges */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-sm text-foreground">Badges</h2>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {badges.map(b => (
              <div key={b.label} className={`flex flex-col items-center gap-1 p-2 rounded-xl ${b.unlocked ? "bg-muted" : "bg-muted/40 opacity-40"}`}>
                <span className="text-xl">{b.emoji}</span>
                <span className="text-[9px] font-semibold text-center text-foreground leading-tight">{b.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Recent Scans */}
        {scans.length > 0 && (
          <GlassCard>
            <h2 className="font-semibold text-sm text-foreground mb-3">Recent Scans</h2>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {scans.slice(0, 5).map(scan => (
                <div key={scan.id} className="shrink-0 w-16">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted">
                    <img src={scan.imageUrl} className="w-full h-full object-cover" alt={scan.date} />
                  </div>
                  <p className="text-[9px] text-muted-foreground text-center mt-1">{scan.overall}%</p>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Sign Out */}
        <motion.button whileTap={{ scale: 0.98 }} onClick={handleSignOut}
          className="w-full py-3 rounded-2xl bg-card/60 backdrop-blur-xl border border-border text-destructive font-semibold text-sm flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
};

export default ForgeProfile;
