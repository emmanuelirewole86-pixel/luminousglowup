import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

const GlassCard = ({ children, className, glow, ...props }: GlassCardProps) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    className={cn(
      "rounded-2xl border border-border bg-card/60 backdrop-blur-2xl p-5",
      "shadow-card transition-shadow duration-300",
      glow && "shadow-glow",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
);

export default GlassCard;
