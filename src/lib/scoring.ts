export interface FaceScores {
  symmetry: number;
  goldenRatio: number;
  skinHealth: number;
  estimatedAge: number;
  attractiveness: number;
  jawline: number;
  eyeHarmony: number;
  lipBalance: number;
  overallHarmony: number;
}

export interface ScanResult {
  id: string;
  date: string;
  imageUrl: string;
  scores: FaceScores;
  overall: number;
}

// Simulated scoring — in production, replace with face-api.js / MediaPipe analysis
export const generateScores = (): FaceScores => {
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    symmetry: rand(62, 95),
    goldenRatio: rand(58, 92),
    skinHealth: rand(55, 96),
    estimatedAge: rand(20, 45),
    attractiveness: rand(60, 94),
    jawline: rand(55, 90),
    eyeHarmony: rand(60, 95),
    lipBalance: rand(58, 93),
    overallHarmony: rand(60, 94),
  };
};

export const computeOverall = (scores: FaceScores): number => {
  const vals = [
    scores.symmetry,
    scores.goldenRatio,
    scores.skinHealth,
    scores.attractiveness,
    scores.jawline,
    scores.eyeHarmony,
    scores.lipBalance,
    scores.overallHarmony,
  ];
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
};

export const getScoreLabel = (score: number): string => {
  if (score >= 90) return "Exceptional";
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Very Good";
  if (score >= 60) return "Good";
  if (score >= 50) return "Average";
  return "Needs Improvement";
};

export const getImprovementTips = (scores: FaceScores) => {
  const tips: { area: string; score: number; tip: string; icon: string }[] = [];
  const sorted = Object.entries(scores)
    .filter(([k]) => k !== "estimatedAge")
    .sort(([, a], [, b]) => a - b);

  const tipMap: Record<string, { tip: string; icon: string }> = {
    symmetry: { tip: "Try facial yoga exercises to improve muscle balance. Sleep on your back to avoid facial compression.", icon: "🧘" },
    goldenRatio: { tip: "A flattering hairstyle can frame your face proportionally. Consider contouring techniques.", icon: "✨" },
    skinHealth: { tip: "Start a consistent routine: gentle cleanser, vitamin C serum, SPF 50 daily, retinol at night.", icon: "💧" },
    attractiveness: { tip: "Focus on overall grooming, hydration, and confident posture. Small changes compound.", icon: "💫" },
    jawline: { tip: "Jaw exercises and mewing technique can help define your jawline. Reduce sodium intake.", icon: "💪" },
    eyeHarmony: { tip: "Use an eye cream with peptides. Get 7-8 hours of sleep. Consider brow grooming.", icon: "👁️" },
    lipBalance: { tip: "Keep lips hydrated with quality balm. Lip exercises can improve fullness naturally.", icon: "💋" },
    overallHarmony: { tip: "Balanced nutrition, regular exercise, and quality sleep are the foundation of facial harmony.", icon: "🌟" },
  };

  for (const [key, value] of sorted.slice(0, 4)) {
    const info = tipMap[key];
    if (info) {
      tips.push({ area: key, score: value, ...info });
    }
  }

  return tips;
};
