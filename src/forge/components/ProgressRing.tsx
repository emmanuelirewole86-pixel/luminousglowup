import { motion } from "framer-motion";

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
}

const ProgressRing = ({ value, max = 100, size = 64, strokeWidth = 5, label, color = "#FF8FAB" }: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#FFE4EC" strokeWidth={strokeWidth} />
          <motion.circle
            cx={size/2} cy={size/2} r={radius} fill="none"
            stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-[#1a1a2e]">{Math.round(value)}</span>
        </div>
      </div>
      {label && <span className="text-[10px] font-medium text-[#8E8E93]">{label}</span>}
    </div>
  );
};

export default ProgressRing;
