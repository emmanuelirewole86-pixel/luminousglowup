import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getScans } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { ScanResult } from "@/lib/scoring";
import ScoreRing from "@/components/ScoreRing";
import { Images } from "lucide-react";

const MyScans = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanResult[]>([]);

  useEffect(() => {
    if (user) getScans(user.id).then(setScans);
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-soft pb-24">
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-xl font-display font-bold text-foreground">My Scans</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{scans.length} scan{scans.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="px-5">
        {scans.length === 0 ? (
          <motion.div className="flex flex-col items-center justify-center py-20 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Images className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">No scans yet</p>
            <button onClick={() => navigate("/scan")} className="px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold">
              Take Your First Scan
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {scans.map((scan, i) => (
              <motion.button key={scan.id} onClick={() => navigate(`/results/${scan.id}`)} className="w-full bg-card rounded-2xl p-4 shadow-card flex items-center gap-4 text-left" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileTap={{ scale: 0.98 }}>
                <img src={scan.imageUrl} alt="Scan" className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">Face Scan</p>
                  <p className="text-xs text-muted-foreground">{scan.date}</p>
                </div>
                <ScoreRing score={scan.overall} size={48} strokeWidth={4} />
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyScans;
