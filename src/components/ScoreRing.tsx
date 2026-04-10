import { motion } from "framer-motion";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showPercentage?: boolean;
  gradient?: boolean;
}

const ScoreRing = ({
  score,
  size = 80,
  strokeWidth = 6,
  label,
  showPercentage = true,
  gradient = false,
}: ScoreRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "hsl(142, 60%, 45%)";
    if (score >= 60) return "hsl(38, 85%, 55%)";
    if (score >= 40) return "hsl(350, 65%, 55%)";
    return "hsl(0, 84%, 60%)";
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          {gradient && (
            <defs>
              <linearGradient id={`ring-grad-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(350, 65%, 55%)" />
                <stop offset="100%" stopColor="hsl(38, 85%, 55%)" />
              </linearGradient>
            </defs>
          )}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={gradient ? `url(#ring-grad-${label})` : getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-foreground">{score}%</span>
          </div>
        )}
      </div>
      {label && (
        <span className="text-[11px] text-muted-foreground font-medium text-center leading-tight max-w-[70px]">
          {label}
        </span>
      )}
    </div>
  );
};

export default ScoreRing;
