import { motion } from "framer-motion";
import { Search, Droplets, Dumbbell, Scissors, Sparkles, Moon, Apple, Heart } from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "all", label: "All" },
  { id: "skincare", label: "Skincare" },
  { id: "exercise", label: "Exercises" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "style", label: "Style" },
];

const allTips = [
  { id: 1, cat: "skincare", icon: Droplets, title: "Double Cleansing Method", desc: "Remove makeup with oil cleanser, then follow with a gentle water-based cleanser for perfectly clean skin.", color: "bg-rose-light" },
  { id: 2, cat: "skincare", icon: Sparkles, title: "Vitamin C Serum Routine", desc: "Apply vitamin C serum every morning before sunscreen to brighten skin and fight hyperpigmentation.", color: "bg-peach" },
  { id: 3, cat: "exercise", icon: Dumbbell, title: "Jawline Sculpting Exercises", desc: "Practice chin lifts and jaw clenches for 5 minutes daily to define and strengthen your jawline.", color: "bg-secondary" },
  { id: 4, cat: "exercise", icon: Heart, title: "Facial Yoga for Symmetry", desc: "Do face yoga stretches targeting both sides equally to improve facial muscle balance.", color: "bg-rose-light" },
  { id: 5, cat: "lifestyle", icon: Moon, title: "Beauty Sleep Optimization", desc: "Sleep 7-9 hours on your back with a silk pillowcase. Elevate your head slightly to reduce puffiness.", color: "bg-peach" },
  { id: 6, cat: "lifestyle", icon: Apple, title: "Anti-Inflammatory Diet", desc: "Eat omega-3 rich foods, berries, and leafy greens. Reduce sugar and dairy for clearer skin.", color: "bg-secondary" },
  { id: 7, cat: "style", icon: Scissors, title: "Face-Shape Hairstyles", desc: "Choose a hairstyle that complements your face shape to create the illusion of perfect proportions.", color: "bg-rose-light" },
  { id: 8, cat: "skincare", icon: Droplets, title: "Retinol Night Routine", desc: "Start with 0.25% retinol 2x/week, gradually increase. Always pair with moisturizer and SPF.", color: "bg-secondary" },
];

const ImprovementHub = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTips = allTips.filter((tip) => {
    const matchCat = activeCategory === "all" || tip.cat === activeCategory;
    const matchSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-soft pb-24">
      <div className="px-5 pt-14 pb-2">
        <h1 className="text-xl font-display font-bold text-foreground">Improvement Hub</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Personalized tips for your best self</p>
      </div>

      {/* Search */}
      <div className="px-5 py-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-5 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? "bg-gradient-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="px-5 space-y-3">
        {filteredTips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={tip.id}
              className="bg-card rounded-2xl p-4 shadow-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${tip.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5 text-foreground/70" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{tip.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">{tip.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ImprovementHub;
