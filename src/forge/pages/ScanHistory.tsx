import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Images, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getScans, FullScan } from "@/lib/store";
import GlassCard from "../components/GlassCard";
import ProgressRing from "../components/ProgressRing";

const ScanHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scans, setScans] = useState<FullScan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getScans(user.id).then(d => { setScans(d); setLoading(false); });
  }, [user]);

  return (
    <div className="min-h-screen pb-28">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </motion.button>
        <div>
          <h1 className="text-lg font-bold text-foreground">Scan History</h1>
          <p className="text-xs text-muted-foreground">{loading ? "Loading…" : `${scans.length} scan${scans.length !== 1 ? "s" : ""}`}</p>
        </div>
      </div>

      <div className="px-5 space-y-3">
        {!loading && scans.length === 0 && (
          <motion.div className="flex flex-col items-center py-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Images className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">No scans yet — take your first one</p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate("/scan")}
              className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg">
              Take a Scan
            </motion.button>
          </motion.div>
        )}

        {scans.map((s, i) => (
          <motion.button
            key={s.id}
            onClick={() => navigate(`/scans/${s.id}`)}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left"
          >
            <GlassCard className="flex items-center gap-3">
              <img src={s.imageUrl} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{s.face_shape ? `${s.face_shape} face` : "Face Scan"}</p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {s.date}{s.eye_color ? ` • ${s.eye_color} eyes` : ""}{s.hair_color ? ` • ${s.hair_color} hair` : ""}
                </p>
              </div>
              <ProgressRing value={s.overall} size={44} strokeWidth={4} />
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </GlassCard>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ScanHistory;
