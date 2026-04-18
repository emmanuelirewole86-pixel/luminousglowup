// Pre-defined 7-day rotation. Picks based on new Date().getDay() (0=Sun … 6=Sat).

export interface WorkoutBlock { name: string; sets: string; muscle: string; }
export interface DayWorkout {
  title: string;
  focus: string;
  duration: string;
  warmup: string[];
  blocks: WorkoutBlock[];
  finisher: string;
  notes: string;
}

export const weeklyWorkouts: DayWorkout[] = [
  // Sunday — Active recovery
  {
    title: "Active Recovery",
    focus: "Mobility & Walk",
    duration: "30 min",
    warmup: ["5-min easy walk", "Cat-cow x 10", "World's greatest stretch x 6/side"],
    blocks: [
      { name: "Brisk Walk / Easy Bike", sets: "20 min Z2", muscle: "Cardio" },
      { name: "Hip Mobility Flow", sets: "3 rounds", muscle: "Mobility" },
      { name: "Foam Roll Full Body", sets: "10 min", muscle: "Recovery" },
    ],
    finisher: "5 min box breathing",
    notes: "Easy day. Goal: blood flow, recovery, mental reset.",
  },
  // Monday — Push
  {
    title: "Push Day",
    focus: "Chest, Shoulders, Triceps",
    duration: "55 min",
    warmup: ["Arm circles x 20", "Band pull-aparts x 15", "Push-ups x 10"],
    blocks: [
      { name: "Barbell Bench Press", sets: "4 x 6-8", muscle: "Chest" },
      { name: "Incline DB Press", sets: "3 x 10", muscle: "Upper Chest" },
      { name: "Seated DB Shoulder Press", sets: "3 x 10", muscle: "Shoulders" },
      { name: "Lateral Raises", sets: "3 x 12", muscle: "Side Delts" },
      { name: "Cable Triceps Pushdown", sets: "3 x 12", muscle: "Triceps" },
      { name: "Overhead Triceps Ext.", sets: "3 x 12", muscle: "Triceps" },
    ],
    finisher: "Push-up AMRAP — 60 sec",
    notes: "Start the week strong. Prioritize bar speed on the bench.",
  },
  // Tuesday — Pull
  {
    title: "Pull Day",
    focus: "Back & Biceps",
    duration: "55 min",
    warmup: ["Dead hangs 30s x 2", "Scapular pulls x 10", "Band rows x 15"],
    blocks: [
      { name: "Pull-ups (or Lat Pulldown)", sets: "4 x 6-10", muscle: "Lats" },
      { name: "Barbell Row", sets: "4 x 8", muscle: "Mid Back" },
      { name: "Seated Cable Row", sets: "3 x 10", muscle: "Back Width" },
      { name: "Face Pulls", sets: "3 x 15", muscle: "Rear Delts" },
      { name: "Barbell Curls", sets: "3 x 10", muscle: "Biceps" },
      { name: "Hammer Curls", sets: "3 x 12", muscle: "Brachialis" },
    ],
    finisher: "Bicep curl 21s — 1 set",
    notes: "Squeeze at the top of every rep. Elbows in.",
  },
  // Wednesday — Legs
  {
    title: "Leg Day",
    focus: "Quads, Hamstrings, Glutes",
    duration: "60 min",
    warmup: ["Bodyweight squats x 20", "Glute bridge x 15", "Leg swings x 10/side"],
    blocks: [
      { name: "Back Squat", sets: "4 x 6-8", muscle: "Quads/Glutes" },
      { name: "Romanian Deadlift", sets: "4 x 8", muscle: "Hamstrings" },
      { name: "Walking Lunges", sets: "3 x 12/leg", muscle: "Quads/Glutes" },
      { name: "Leg Curl", sets: "3 x 12", muscle: "Hamstrings" },
      { name: "Standing Calf Raise", sets: "4 x 15", muscle: "Calves" },
    ],
    finisher: "Wall sit — 60 sec",
    notes: "Don't skip leg day. Eat 30g protein after.",
  },
  // Thursday — Upper
  {
    title: "Upper Body",
    focus: "Strength + Aesthetics",
    duration: "50 min",
    warmup: ["Jump rope 2 min", "Band dislocates x 10", "Push-ups x 10"],
    blocks: [
      { name: "Overhead Press", sets: "4 x 5", muscle: "Shoulders" },
      { name: "Weighted Pull-ups", sets: "3 x 6", muscle: "Back" },
      { name: "Incline DB Bench", sets: "3 x 10", muscle: "Upper Chest" },
      { name: "Single-Arm DB Row", sets: "3 x 10/side", muscle: "Lats" },
      { name: "Lateral Raises", sets: "3 x 15", muscle: "Side Delts" },
      { name: "EZ-Bar Curls + Dips Superset", sets: "3 x 10/10", muscle: "Arms" },
    ],
    finisher: "Plank — 90 sec",
    notes: "Heavy compounds first, isolation second.",
  },
  // Friday — Lower + Core
  {
    title: "Lower + Core",
    focus: "Posterior Chain & Abs",
    duration: "55 min",
    warmup: ["Cossack squats x 10", "Glute bridge x 15", "Dead bug x 10"],
    blocks: [
      { name: "Deadlift", sets: "4 x 5", muscle: "Posterior Chain" },
      { name: "Front Squat", sets: "3 x 8", muscle: "Quads" },
      { name: "Bulgarian Split Squat", sets: "3 x 10/leg", muscle: "Glutes" },
      { name: "Hanging Leg Raise", sets: "3 x 12", muscle: "Lower Abs" },
      { name: "Cable Woodchop", sets: "3 x 12/side", muscle: "Obliques" },
      { name: "Weighted Plank", sets: "3 x 45 sec", muscle: "Core" },
    ],
    finisher: "Farmer's carry — 2 x 40m",
    notes: "Brace hard. Strong core = strong everything.",
  },
  // Saturday — Conditioning
  {
    title: "Conditioning",
    focus: "Full-body Cardio + Athleticism",
    duration: "40 min",
    warmup: ["Jumping jacks x 30", "Inchworm x 8", "Squat to stand x 10"],
    blocks: [
      { name: "Kettlebell Swings", sets: "5 x 20", muscle: "Hips/Back" },
      { name: "Burpee + Box Jump", sets: "5 x 8", muscle: "Full Body" },
      { name: "Battle Ropes / Sled", sets: "5 x 30 sec", muscle: "Power" },
      { name: "Sprint Intervals", sets: "8 x 20s on / 40s off", muscle: "Cardio" },
    ],
    finisher: "Cool-down walk 5 min + stretch",
    notes: "High intensity. Hydrate well, push the pace.",
  },
];

export interface FaceRitual {
  title: string;
  am: string[];
  pm: string[];
  weeklyTip: string;
}

export const weeklyFaceRituals: FaceRitual[] = [
  // Sun
  { title: "Renewal Sunday", am: ["Gentle cleanser", "Hydrating toner", "Vitamin C serum", "SPF 50"], pm: ["Double cleanse", "Exfoliating mask 10 min", "Hydrating serum", "Rich night cream"], weeklyTip: "Mask day — let the skin breathe and reset." },
  // Mon
  { title: "Fresh Start Monday", am: ["Foam cleanser", "Niacinamide serum", "Light moisturizer", "SPF 50"], pm: ["Oil cleanse", "Foam cleanse", "Retinol (pea-size)", "Ceramide moisturizer"], weeklyTip: "Start retinol slow — 2-3 nights/week if new." },
  // Tue
  { title: "Hydration Tuesday", am: ["Cream cleanser", "Hyaluronic acid serum", "Moisturizer", "SPF 50"], pm: ["Gentle cleanse", "Eye cream", "Sleeping mask"], weeklyTip: "Drink 3L water today. Your skin will thank you." },
  // Wed
  { title: "Glow Wednesday", am: ["Cleanser", "Vitamin C serum", "Moisturizer", "SPF 50"], pm: ["Cleanse", "AHA toner (5%)", "Peptide serum", "Moisturizer"], weeklyTip: "AHA night — skip retinol to avoid irritation." },
  // Thu
  { title: "Recovery Thursday", am: ["Gentle cleanser", "Calming toner (centella)", "Moisturizer", "SPF 50"], pm: ["Double cleanse", "Hydrating mask 15 min", "Rich night cream"], weeklyTip: "Recover from yesterday's exfoliation." },
  // Fri
  { title: "Defense Friday", am: ["Foam cleanser", "Antioxidant serum", "Moisturizer", "SPF 50"], pm: ["Oil cleanse", "Foam cleanse", "Retinol", "Moisturizer"], weeklyTip: "Pre-weekend reset. Lock in the routine." },
  // Sat
  { title: "Detox Saturday", am: ["Cleanser", "Brightening serum", "Moisturizer", "SPF 50"], pm: ["Double cleanse", "Clay mask 10 min", "Hydrating toner", "Sleeping mask"], weeklyTip: "Clay mask = pore reset. Beard groomed too." },
];

export interface MealPlan {
  title: string;
  totalCalories: number;
  totalProtein: number;
  meals: { time: string; name: string; macros: string }[];
}

export const weeklyMeals: MealPlan[] = [
  // Sun
  { title: "Light & Lean", totalCalories: 2200, totalProtein: 170, meals: [
    { time: "8:00 AM", name: "Greek yogurt parfait + berries", macros: "420 cal • 35P" },
    { time: "12:30 PM", name: "Grilled chicken salad + olive oil", macros: "550 cal • 45P" },
    { time: "3:30 PM", name: "Protein shake + apple", macros: "300 cal • 30P" },
    { time: "7:00 PM", name: "Salmon + roasted veggies", macros: "650 cal • 45P" },
    { time: "9:30 PM", name: "Cottage cheese + almonds", macros: "280 cal • 25P" },
  ]},
  // Mon
  { title: "Push Day Fuel", totalCalories: 2800, totalProtein: 200, meals: [
    { time: "7:30 AM", name: "Oats + whey + banana + PB", macros: "650 cal • 45P" },
    { time: "12:00 PM", name: "Chicken & rice prep + broccoli", macros: "700 cal • 55P" },
    { time: "3:00 PM", name: "Pre-workout smoothie", macros: "350 cal • 30P" },
    { time: "6:30 PM", name: "Steak + sweet potato + greens", macros: "780 cal • 55P" },
    { time: "9:00 PM", name: "Casein shake", macros: "320 cal • 30P" },
  ]},
  // Tue
  { title: "Pull Day Fuel", totalCalories: 2750, totalProtein: 195, meals: [
    { time: "7:30 AM", name: "Egg & avocado toast", macros: "480 cal • 30P" },
    { time: "12:00 PM", name: "Tuna wrap + side salad", macros: "620 cal • 45P" },
    { time: "3:30 PM", name: "Greek yogurt + granola", macros: "400 cal • 30P" },
    { time: "7:00 PM", name: "Beef stir-fry + jasmine rice", macros: "850 cal • 60P" },
    { time: "9:30 PM", name: "Whey + walnuts", macros: "400 cal • 30P" },
  ]},
  // Wed
  { title: "Leg Day Fuel", totalCalories: 3000, totalProtein: 210, meals: [
    { time: "7:00 AM", name: "Big breakfast: eggs, oats, fruit", macros: "750 cal • 40P" },
    { time: "12:00 PM", name: "Double chicken & rice bowl", macros: "850 cal • 65P" },
    { time: "3:00 PM", name: "Pre-workout: rice cakes + honey + whey", macros: "400 cal • 30P" },
    { time: "7:00 PM", name: "Salmon + pasta + veggies", macros: "750 cal • 50P" },
    { time: "10:00 PM", name: "Casein + almond butter", macros: "350 cal • 30P" },
  ]},
  // Thu
  { title: "Upper Body Fuel", totalCalories: 2650, totalProtein: 190, meals: [
    { time: "7:30 AM", name: "Overnight oats + protein", macros: "550 cal • 40P" },
    { time: "12:30 PM", name: "Turkey & quinoa bowl", macros: "650 cal • 50P" },
    { time: "3:00 PM", name: "Cottage cheese + fruit", macros: "350 cal • 30P" },
    { time: "7:00 PM", name: "Chicken thighs + rice + veg", macros: "750 cal • 55P" },
    { time: "9:30 PM", name: "Whey + dark chocolate", macros: "350 cal • 25P" },
  ]},
  // Fri
  { title: "Lean Friday", totalCalories: 2400, totalProtein: 180, meals: [
    { time: "8:00 AM", name: "Egg white omelet + spinach", macros: "400 cal • 35P" },
    { time: "12:30 PM", name: "Grilled chicken + sweet potato", macros: "650 cal • 50P" },
    { time: "4:00 PM", name: "Protein bar + apple", macros: "300 cal • 25P" },
    { time: "7:30 PM", name: "Lean steak + asparagus + rice", macros: "700 cal • 50P" },
    { time: "10:00 PM", name: "Greek yogurt + berries", macros: "350 cal • 25P" },
  ]},
  // Sat
  { title: "Refuel Saturday", totalCalories: 2900, totalProtein: 200, meals: [
    { time: "9:00 AM", name: "Protein pancakes + berries + whey", macros: "700 cal • 50P" },
    { time: "1:00 PM", name: "Burger bowl (lean beef + rice)", macros: "800 cal • 55P" },
    { time: "4:00 PM", name: "Smoothie + nuts", macros: "450 cal • 35P" },
    { time: "7:30 PM", name: "Pizza night (controlled portion) + side salad", macros: "650 cal • 35P" },
    { time: "10:00 PM", name: "Casein shake", macros: "300 cal • 25P" },
  ]},
];

export interface OutfitOfDay {
  title: string;
  vibe: string;
  pieces: string[];
  palette: string[];
  finishingTouch: string;
}

export const weeklyOutfits: OutfitOfDay[] = [
  { title: "Easy Sunday", vibe: "Relaxed at-home + brunch", pieces: ["Heather grey crew tee", "Tapered black joggers", "Clean white sneakers"], palette: ["Grey", "Black", "White"], finishingTouch: "Minimal silver watch" },
  { title: "Power Monday", vibe: "Set the tone for the week", pieces: ["Navy Oxford shirt", "Charcoal trousers", "Brown leather boots", "Leather belt"], palette: ["Navy", "Charcoal", "Brown"], finishingTouch: "Stainless watch + light woody cologne" },
  { title: "Smart Tuesday", vibe: "Sharp but not stiff", pieces: ["Black mock neck", "Olive chinos", "White minimalist sneakers"], palette: ["Black", "Olive", "White"], finishingTouch: "Black leather strap watch" },
  { title: "Mid-Week Cool", vibe: "Effortless confidence", pieces: ["White linen shirt (sleeves rolled)", "Beige tailored shorts (or chinos)", "Tan loafers"], palette: ["White", "Beige", "Tan"], finishingTouch: "Aviators + light citrus cologne" },
  { title: "Statement Thursday", vibe: "Stand out, tastefully", pieces: ["Cream knit polo", "Dark indigo jeans", "White leather sneakers"], palette: ["Cream", "Indigo", "White"], finishingTouch: "Gold-tone watch" },
  { title: "Friday Night", vibe: "Date / drinks ready", pieces: ["Black fitted henley", "Black slim trousers", "Suede chelsea boots", "Leather bracelet"], palette: ["Black", "Black", "Tan"], finishingTouch: "Bold woody-spicy cologne" },
  { title: "Weekend Saturday", vibe: "Outdoor active", pieces: ["Olive overshirt", "Plain white tee", "Slim cargo pants", "Trail runners"], palette: ["Olive", "White", "Khaki"], finishingTouch: "Cap + sport watch" },
];

export const dayName = (idx: number) =>
  ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][idx];

export const todayIndex = () => new Date().getDay();
