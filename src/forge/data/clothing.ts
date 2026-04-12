export interface Outfit {
  id: string;
  name: string;
  occasion: string;
  bodyType: string[];
  items: string[];
  colorPalette: string[];
  description: string;
  emoji: string;
}

export const occasions = ["All", "Casual", "Smart Casual", "Formal", "Activewear", "Date Night"];
export const bodyTypes = ["All", "Athletic", "Muscular", "Slim", "Average"];

export const outfits: Outfit[] = [
  { id: "o1", name: "Classic Casual", occasion: "Casual", bodyType: ["Athletic", "Slim", "Average"], emoji: "👕",
    description: "Effortless everyday look. Clean, simple, and always appropriate.",
    items: ["White crew neck tee", "Dark wash slim jeans", "White leather sneakers", "Minimal watch"],
    colorPalette: ["White", "Indigo", "White", "Silver"] },
  { id: "o2", name: "Smart Casual Friday", occasion: "Smart Casual", bodyType: ["Athletic", "Slim", "Average"], emoji: "👔",
    description: "The perfect office-to-drinks transition outfit.",
    items: ["Navy blue Oxford shirt", "Chinos (khaki or olive)", "Brown suede Chelsea boots", "Leather belt"],
    colorPalette: ["Navy", "Khaki", "Brown", "Brown"] },
  { id: "o3", name: "Formal Power", occasion: "Formal", bodyType: ["Athletic", "Slim", "Average", "Muscular"], emoji: "🤵",
    description: "Command any room. The tailored suit done right.",
    items: ["Charcoal slim-fit suit", "White dress shirt", "Burgundy silk tie", "Black Oxford shoes", "Pocket square"],
    colorPalette: ["Charcoal", "White", "Burgundy", "Black"] },
  { id: "o4", name: "Gym Ready", occasion: "Activewear", bodyType: ["Athletic", "Muscular"], emoji: "🏋️",
    description: "Functional and stylish. Look good while putting in work.",
    items: ["Fitted performance tee", "Tapered joggers", "Training shoes", "Sports watch"],
    colorPalette: ["Black", "Charcoal", "White accents"] },
  { id: "o5", name: "Date Night", occasion: "Date Night", bodyType: ["Athletic", "Slim", "Average"], emoji: "🌹",
    description: "Make an impression. Refined without trying too hard.",
    items: ["Black fitted mock neck", "Dark slim trousers", "Suede loafers", "Subtle cologne", "Leather bracelet"],
    colorPalette: ["Black", "Charcoal", "Tan"] },
  { id: "o6", name: "Weekend Warrior", occasion: "Casual", bodyType: ["Athletic", "Muscular", "Average"], emoji: "🧢",
    description: "Relaxed weekend vibes. Comfortable but still put-together.",
    items: ["Fitted henley (gray or olive)", "Cargo shorts or joggers", "Clean running shoes", "Baseball cap"],
    colorPalette: ["Olive", "Khaki", "White"] },
  { id: "o7", name: "Summer Smart", occasion: "Smart Casual", bodyType: ["Athletic", "Slim"], emoji: "☀️",
    description: "Stay cool and look sharp in warm weather.",
    items: ["Linen button-up (white or light blue)", "Tailored chino shorts", "Leather sandals or loafers", "Sunglasses"],
    colorPalette: ["White", "Beige", "Tan"] },
  { id: "o8", name: "All Black Everything", occasion: "Date Night", bodyType: ["Athletic", "Slim", "Muscular"], emoji: "🖤",
    description: "Sleek, mysterious, and always flattering. The monochrome power move.",
    items: ["Black slim fit tee", "Black skinny jeans", "Black Chelsea boots", "Silver chain necklace"],
    colorPalette: ["Black", "Black", "Black", "Silver"] },
  { id: "o9", name: "Business Meeting", occasion: "Formal", bodyType: ["Athletic", "Slim", "Average"], emoji: "💼",
    description: "Professional and authoritative. Dress for the role you want.",
    items: ["Navy blazer", "Light blue dress shirt", "Gray dress trousers", "Brown brogues", "Silk pocket square"],
    colorPalette: ["Navy", "Light Blue", "Gray", "Brown"] },
  { id: "o10", name: "Athleisure King", occasion: "Activewear", bodyType: ["Athletic", "Muscular"], emoji: "👟",
    description: "The gym-to-street look. When comfort meets style.",
    items: ["Tech fleece hoodie", "Slim joggers", "Chunky sneakers", "Crossbody bag"],
    colorPalette: ["Charcoal", "Black", "White"] },
  { id: "o11", name: "Layered Fall", occasion: "Smart Casual", bodyType: ["Athletic", "Slim", "Average"], emoji: "🍂",
    description: "Master the art of layering for transitional weather.",
    items: ["Fitted crew neck sweater", "Oxford shirt underneath", "Dark wash jeans", "Leather boots", "Watch"],
    colorPalette: ["Burgundy", "White", "Indigo", "Brown"] },
  { id: "o12", name: "Minimalist Clean", occasion: "Casual", bodyType: ["Slim", "Athletic"], emoji: "🤍",
    description: "Less is more. A capsule wardrobe essential.",
    items: ["Oversized neutral tee", "Wide straight trousers", "Chunky white sneakers", "Tote bag"],
    colorPalette: ["Cream", "Black", "White", "Tan"] },
];

export const capsuleWardrobe = {
  essentials: [
    "White crew neck tee (3x)",
    "Black crew neck tee (2x)",
    "Navy Oxford shirt",
    "White dress shirt",
    "Dark slim jeans",
    "Chinos (khaki + olive)",
    "Charcoal dress trousers",
    "Navy blazer",
    "Black leather Chelsea boots",
    "White leather sneakers",
    "Brown leather belt",
    "Minimal watch",
  ],
  colorWheel: {
    neutrals: ["White", "Black", "Gray", "Navy", "Charcoal"],
    accents: ["Burgundy", "Olive", "Tan", "Light Blue"],
    avoid: ["Neon colors", "Overly busy patterns", "Ill-fitting clothes"],
  },
};
