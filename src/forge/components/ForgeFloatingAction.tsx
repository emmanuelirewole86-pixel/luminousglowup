import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ScanFace, Utensils, Dumbbell, MessageCircle, X } from "lucide-react";

const actions = [
  { icon: ScanFace, label: "Scan Face", path: "/scan" },
  { icon: Dumbbell, label: "Today's Workout", path: "/today/workout" },
  { icon: Utensils, label: "Today's Meals", path: "/today/meals" },
  { icon: MessageCircle, label: "Ask AI Coach", path: "/discover?tab=chat" },
];

const ForgeFloatingAction = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-24 right-4 z-[60] flex flex-col-reverse items-center gap-3">
      <AnimatePresence>
        {open && actions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.3, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.3, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: i * 0.05 }}
            onClick={() => { navigate(action.path); setOpen(false); }}
            className="flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-lg"
          >
            <action.icon className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">{action.label}</span>
          </motion.button>
        ))}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-primary shadow-glow flex items-center justify-center"
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
          {open ? <X className="w-6 h-6 text-primary-foreground" /> : <Plus className="w-6 h-6 text-primary-foreground" />}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ForgeFloatingAction;
