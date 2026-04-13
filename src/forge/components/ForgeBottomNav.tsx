import { useLocation, useNavigate } from "react-router-dom";
import { Home, ScanFace, Compass, User } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { path: "/forge", icon: Home, label: "Home" },
  { path: "/forge/scan", icon: ScanFace, label: "Scan" },
  { path: "/forge/discover", icon: Compass, label: "Discover" },
  { path: "/forge/profile", icon: User, label: "Profile" },
];

const ForgeBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hiddenPaths = ["/forge/scan/results", "/forge/settings"];
  if (hiddenPaths.some(p => location.pathname.startsWith(p))) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-3 mb-3 rounded-2xl border border-border bg-card/60 backdrop-blur-2xl shadow-elevated">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path || 
              (tab.path !== "/forge" && location.pathname.startsWith(tab.path));
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="relative flex flex-col items-center justify-center w-16 h-full gap-0.5"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="forge-nav-indicator"
                    className="absolute -top-0 left-4 right-4 h-[3px] rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? "text-primary scale-110" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ForgeBottomNav;
