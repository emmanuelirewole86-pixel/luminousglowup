import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center shadow-card"
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4 text-accent" />
        ) : (
          <Moon className="w-4 h-4 text-muted-foreground" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
