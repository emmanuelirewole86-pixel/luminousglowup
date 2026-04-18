import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ForgeBottomNav from "./ForgeBottomNav";
import ForgeFloatingAction from "./ForgeFloatingAction";

const ForgeLayout = () => {
  const location = useLocation();
  return (
    <div className="forge-theme min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <ForgeFloatingAction />
      <ForgeBottomNav />
    </div>
  );
};

export default ForgeLayout;
