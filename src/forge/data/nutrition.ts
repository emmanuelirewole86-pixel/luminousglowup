export interface Recipe {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
  description: string;
  ingredients: string[];
  emoji: string;
}

export const mealCategories = ["All", "Breakfast", "Lunch", "Dinner", "Snack", "Pre-Workout", "Post-Workout"];

export const recipes: Recipe[] = [
  { id: "n1", name: "Protein Power Bowl", category: "Lunch", calories: 650, protein: 52, carbs: 55, fat: 18, prepTime: "15 min", emoji: "🥗",
    description: "High-protein bowl with grilled chicken, quinoa, and vegetables. Perfect for muscle recovery.",
    ingredients: ["200g grilled chicken breast", "1 cup quinoa", "1 avocado", "Mixed greens", "Cherry tomatoes", "Olive oil dressing", "Feta cheese"] },
  { id: "n2", name: "Steak & Sweet Potato", category: "Dinner", calories: 780, protein: 58, carbs: 62, fat: 28, prepTime: "25 min", emoji: "🥩",
    description: "Classic muscle-building meal. Lean steak with complex carbs and veggies.",
    ingredients: ["250g sirloin steak", "1 large sweet potato", "Steamed broccoli", "Garlic butter", "Salt & pepper"] },
  { id: "n3", name: "Greek Yogurt Parfait", category: "Breakfast", calories: 420, protein: 35, carbs: 48, fat: 12, prepTime: "5 min", emoji: "🫐",
    description: "Quick, high-protein breakfast that fuels your morning and supports muscle synthesis.",
    ingredients: ["300g Greek yogurt (full fat)", "1/2 cup granola", "Mixed berries", "Honey drizzle", "Chia seeds", "Sliced almonds"] },
  { id: "n4", name: "Salmon & Rice", category: "Dinner", calories: 720, protein: 48, carbs: 65, fat: 24, prepTime: "20 min", emoji: "🐟",
    description: "Omega-3 rich salmon with brown rice. Great for testosterone and brain health.",
    ingredients: ["200g Atlantic salmon fillet", "1 cup brown rice", "Asparagus", "Lemon", "Soy sauce glaze", "Sesame seeds"] },
  { id: "n5", name: "Egg & Avocado Toast", category: "Breakfast", calories: 480, protein: 28, carbs: 35, fat: 26, prepTime: "10 min", emoji: "🥑",
    description: "Healthy fats and protein to kickstart your day. Testosterone-boosting ingredients.",
    ingredients: ["3 whole eggs", "1 avocado", "2 slices sourdough", "Everything bagel seasoning", "Red pepper flakes", "Cherry tomatoes"] },
  { id: "n6", name: "Chicken & Rice Prep", category: "Lunch", calories: 580, protein: 48, carbs: 60, fat: 12, prepTime: "30 min", emoji: "🍗",
    description: "The bodybuilder's staple. Simple, effective, and easy to meal prep in bulk.",
    ingredients: ["250g chicken breast", "1.5 cups jasmine rice", "Broccoli florets", "Teriyaki sauce", "Sesame oil"] },
  { id: "n7", name: "Pre-Workout Smoothie", category: "Pre-Workout", calories: 350, protein: 30, carbs: 45, fat: 8, prepTime: "5 min", emoji: "🥤",
    description: "Fast-digesting fuel for maximum workout performance. Drink 30 min before training.",
    ingredients: ["1 banana", "1 scoop whey protein", "1 cup oat milk", "1 tbsp peanut butter", "Handful of spinach", "Ice"] },
  { id: "n8", name: "Post-Workout Shake", category: "Post-Workout", calories: 450, protein: 45, carbs: 50, fat: 8, prepTime: "3 min", emoji: "💪",
    description: "Rapid recovery shake with fast protein and carbs. Drink within 30 min of training.",
    ingredients: ["2 scoops whey protein", "1 banana", "1 cup orange juice", "1/2 cup frozen mango", "5g creatine monohydrate"] },
  { id: "n9", name: "Turkey Meatball Sub", category: "Lunch", calories: 620, protein: 42, carbs: 58, fat: 20, prepTime: "25 min", emoji: "🥪",
    description: "Lean turkey meatballs in marinara on a whole wheat sub. Comfort food, made clean.",
    ingredients: ["250g ground turkey", "Whole wheat sub roll", "Marinara sauce", "Mozzarella", "Italian herbs", "Garlic"] },
  { id: "n10", name: "Overnight Oats", category: "Breakfast", calories: 380, protein: 25, carbs: 52, fat: 10, prepTime: "5 min (night before)", emoji: "🥣",
    description: "Zero-effort breakfast prep. High in fiber and slow-releasing energy.",
    ingredients: ["1 cup rolled oats", "1 scoop protein powder", "1 cup almond milk", "Chia seeds", "Blueberries", "Cinnamon"] },
  { id: "n11", name: "Beef & Broccoli Stir-Fry", category: "Dinner", calories: 680, protein: 50, carbs: 45, fat: 28, prepTime: "20 min", emoji: "🥘",
    description: "Restaurant-quality stir-fry at home. High in zinc for testosterone support.",
    ingredients: ["250g beef strips", "Broccoli", "Soy sauce", "Ginger", "Garlic", "Brown rice", "Sesame oil"] },
  { id: "n12", name: "Protein Energy Balls", category: "Snack", calories: 180, protein: 12, carbs: 18, fat: 8, prepTime: "10 min", emoji: "⚡",
    description: "Perfect portable snack for between meals. No baking required.",
    ingredients: ["1 cup oats", "1/2 cup peanut butter", "1 scoop protein powder", "Honey", "Dark chocolate chips", "Chia seeds"] },
];

export interface Supplement {
  name: string;
  benefit: string;
  dosage: string;
  emoji: string;
}

export const supplements: Supplement[] = [
  { name: "Creatine Monohydrate", benefit: "Strength, muscle mass, cognitive function", dosage: "5g daily", emoji: "💊" },
  { name: "Whey Protein", benefit: "Muscle recovery and growth", dosage: "25-50g post-workout", emoji: "🥛" },
  { name: "Vitamin D3", benefit: "Testosterone, bone health, immune function", dosage: "2000-5000 IU daily", emoji: "☀️" },
  { name: "Zinc", benefit: "Testosterone production, immune support", dosage: "15-30mg daily", emoji: "⚡" },
  { name: "Magnesium", benefit: "Sleep quality, muscle recovery, stress", dosage: "200-400mg before bed", emoji: "😴" },
  { name: "Omega-3 Fish Oil", benefit: "Heart health, inflammation, brain function", dosage: "1-3g daily", emoji: "🐟" },
  { name: "Ashwagandha", benefit: "Stress reduction, testosterone, recovery", dosage: "300-600mg daily", emoji: "🌿" },
];
