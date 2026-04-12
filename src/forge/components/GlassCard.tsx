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
      "rounded-2xl border border-white/50 bg-white/60 backdrop-blur-2xl p-5",
      "shadow-[0_2px_16px_-4px_rgba(255,143,171,0.1)]",
      "transition-shadow duration-300",
      glow && "shadow-[0_0_24px_-4px_rgba(255,143,171,0.25)]",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
);

export default GlassCard;
