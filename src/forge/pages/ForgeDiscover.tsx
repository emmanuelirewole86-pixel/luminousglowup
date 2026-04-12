import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Scissors, Utensils, Shirt, Search, Heart, ChevronRight, Star, Clock, Flame } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { exercises, exerciseCategories, Exercise } from "../data/exercises";
import { hairstyles, faceShapes, HairStyle } from "../data/hairstyles";
import { recipes, mealCategories, supplements, Recipe } from "../data/nutrition";
import { outfits, occasions, Outfit } from "../data/clothing";

const tabs = [
  { id: "exercise", icon: Dumbbell, label: "Exercise" },
  { id: "hair", icon: Scissors, label: "Hair" },
  { id: "nutrition", icon: Utensils, label: "Nutrition" },
  { id: "clothing", icon: Shirt, label: "Style" },
];

const ForgeDiscover = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "exercise";
  const [search, setSearch] = useState("");
  const [selectedExCat, setSelectedExCat] = useState("All");
  const [selectedFaceShape, setSelectedFaceShape] = useState("All");
  const [selectedMealCat, setSelectedMealCat] = useState("All");
  const [selectedOccasion, setSelectedOccasion] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const setTab = (tab: string) => setSearchParams({ tab });

  const FilterChips = ({ items, selected, onSelect }: { items: string[]; selected: string; onSelect: (v: string) => void }) => (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
      {items.map(item => (
        <motion.button key={item} whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(item)}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selected === item
              ? "bg-gradient-to-r from-[#FF8FAB] to-[#FFB4C6] text-white shadow-sm"
              : "bg-white/60 backdrop-blur-xl border border-white/50 text-[#555]"
          }`}>
          {item}
        </motion.button>
      ))}
    </div>
  );

  const ExerciseCard = ({ ex }: { ex: Exercise }) => {
    const isOpen = expandedId === ex.id;
    return (
      <GlassCard onClick={() => setExpandedId(isOpen ? null : ex.id)} className="cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF8FAB] to-[#FFB4C6] flex items-center justify-center text-lg shrink-0">{ex.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm text-[#1a1a2e] truncate">{ex.name}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                ex.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                ex.difficulty === "Intermediate" ? "bg-amber-100 text-amber-700" :
                "bg-red-100 text-red-700"
              }`}>{ex.difficulty}</span>
            </div>
            <p className="text-[11px] text-[#8E8E93] mt-0.5">{ex.muscle}</p>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden">
              <div className="mt-3 pt-3 border-t border-[#FFE4EC] space-y-2">
                <p className="text-xs text-[#555]">{ex.description}</p>
                <div>
                  <p className="text-xs font-semibold text-[#1a1a2e] mb-1">Steps:</p>
                  <ol className="space-y-1">
                    {ex.steps.map((s, i) => (
                      <li key={i} className="text-xs text-[#555] flex gap-2">
                        <span className="text-[#FF8FAB] font-bold shrink-0">{i+1}.</span>{s}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1a1a2e] mb-1">Tips:</p>
                  <ul className="space-y-1">
                    {ex.tips.map((t, i) => <li key={i} className="text-xs text-[#555]">💡 {t}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    );
  };

  const HairCard = ({ style }: { style: HairStyle }) => {
    const isOpen = expandedId === style.id;
    return (
      <GlassCard onClick={() => setExpandedId(isOpen ? null : style.id)} className="cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF8FAB] to-[#FFB4C6] flex items-center justify-center text-lg shrink-0">{style.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm text-[#1a1a2e] truncate">{style.name}</p>
              {style.trending && <Star className="w-3 h-3 text-[#FF8FAB] fill-[#FF8FAB] shrink-0" />}
            </div>
            <p className="text-[11px] text-[#8E8E93] mt-0.5">{style.faceShapes.join(", ")} • {style.length}</p>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden">
              <div className="mt-3 pt-3 border-t border-[#FFE4EC] space-y-2">
                <p className="text-xs text-[#555]">{style.description}</p>
                <div>
                  <p className="text-xs font-semibold text-[#1a1a2e] mb-1">How to get it:</p>
                  <ol className="space-y-1">
                    {style.howTo.map((s, i) => <li key={i} className="text-xs text-[#555] flex gap-2"><span className="text-[#FF8FAB] font-bold shrink-0">{i+1}.</span>{s}</li>)}
                  </ol>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1a1a2e] mb-1">Products:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {style.products.map(p => <span key={p} className="text-[10px] px-2 py-1 rounded-full bg-[#FFF0F3] text-[#FF8FAB] font-medium">{p}</span>)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    );
  };

  const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const isOpen = expandedId === recipe.id;
    return (
      <GlassCard onClick={() => setExpandedId(isOpen ? null : recipe.id)} className="cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF8FAB] to-[#FFB4C6] flex items-center justify-center text-lg shrink-0">{recipe.emoji}</div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-[#1a1a2e] truncate">{recipe.name}</p>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-[10px] text-[#8E8E93] flex items-center gap-0.5"><Flame className="w-3 h-3" />{recipe.calories} cal</span>
              <span className="text-[10px] text-[#FF8FAB] font-semibold">{recipe.protein}g protein</span>
              <span className="text-[10px] text-[#8E8E93] flex items-center gap-0.5"><Clock className="w-3 h-3" />{recipe.prepTime}</span>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden">
              <div className="mt-3 pt-3 border-t border-[#FFE4EC] space-y-2">
                <p className="text-xs text-[#555]">{recipe.description}</p>
                <div className="flex gap-3">
                  {[{ label: "Protein", val: recipe.protein, color: "#FF8FAB" }, { label: "Carbs", val: recipe.carbs, color: "#FFB4C6" }, { label: "Fat", val: recipe.fat, color: "#FFD6E0" }].map(m => (
                    <div key={m.label} className="flex-1 rounded-xl bg-[#FFF5F7] p-2 text-center">
                      <p className="text-xs font-bold" style={{ color: m.color }}>{m.val}g</p>
                      <p className="text-[10px] text-[#8E8E93]">{m.label}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1a1a2e] mb-1">Ingredients:</p>
                  <ul className="space-y-1">
                    {recipe.ingredients.map((ing, i) => <li key={i} className="text-xs text-[#555]">• {ing}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    );
  };

  const OutfitCard = ({ outfit }: { outfit: Outfit }) => {
    const isOpen = expandedId === outfit.id;
    return (
      <GlassCard onClick={() => setExpandedId(isOpen ? null : outfit.id)} className="cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF8FAB] to-[#FFB4C6] flex items-center justify-center text-lg shrink-0">{outfit.emoji}</div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-[#1a1a2e] truncate">{outfit.name}</p>
            <p className="text-[11px] text-[#8E8E93] mt-0.5">{outfit.occasion} • {outfit.bodyType.join(", ")}</p>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden">
              <div className="mt-3 pt-3 border-t border-[#FFE4EC] space-y-2">
                <p className="text-xs text-[#555]">{outfit.description}</p>
                <div>
                  <p className="text-xs font-semibold text-[#1a1a2e] mb-1">Items:</p>
                  <ul className="space-y-1">
                    {outfit.items.map((item, i) => <li key={i} className="text-xs text-[#555]">👔 {item}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1a1a2e] mb-1">Color Palette:</p>
                  <div className="flex gap-1.5">
                    {outfit.colorPalette.map((c, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-[#FFF0F3] text-[#FF8FAB] font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    );
  };

  const filteredExercises = exercises.filter(e =>
    (selectedExCat === "All" || e.category === selectedExCat) &&
    (!search || e.name.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredHair = hairstyles.filter(h =>
    (selectedFaceShape === "All" || h.faceShapes.includes(selectedFaceShape)) &&
    (!search || h.name.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredRecipes = recipes.filter(r =>
    (selectedMealCat === "All" || r.category === selectedMealCat) &&
    (!search || r.name.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredOutfits = outfits.filter(o =>
    (selectedOccasion === "All" || o.occasion === selectedOccasion) &&
    (!search || o.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen pb-28">
      <div className="px-5 pt-14 pb-2">
        <h1 className="text-xl font-bold text-[#1a1a2e]">Discover</h1>
      </div>

      {/* Tab Bar */}
      <div className="px-5 mb-3">
        <div className="flex gap-1 p-1 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50">
          {tabs.map(tab => (
            <motion.button key={tab.id} whileTap={{ scale: 0.95 }}
              onClick={() => { setTab(tab.id); setExpandedId(null); setSearch(""); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#FF8FAB] to-[#FFB4C6] text-white shadow-sm"
                  : "text-[#8E8E93]"
              }`}>
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="px-5 mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-xl border border-white/50 text-sm text-[#1a1a2e] placeholder:text-[#8E8E93] outline-none focus:ring-2 focus:ring-[#FF8FAB]/30" />
        </div>
      </div>

      <div className="px-5 space-y-3">
        {activeTab === "exercise" && (
          <>
            <FilterChips items={exerciseCategories} selected={selectedExCat} onSelect={setSelectedExCat} />
            {filteredExercises.map(ex => <ExerciseCard key={ex.id} ex={ex} />)}
          </>
        )}

        {activeTab === "hair" && (
          <>
            <FilterChips items={faceShapes} selected={selectedFaceShape} onSelect={setSelectedFaceShape} />
            {filteredHair.map(style => <HairCard key={style.id} style={style} />)}
          </>
        )}

        {activeTab === "nutrition" && (
          <>
            <FilterChips items={mealCategories} selected={selectedMealCat} onSelect={setSelectedMealCat} />
            {filteredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
            {selectedMealCat === "All" && (
              <GlassCard glow>
                <h3 className="font-bold text-sm text-[#1a1a2e] mb-3">💊 Recommended Supplements</h3>
                <div className="space-y-2.5">
                  {supplements.map(s => (
                    <div key={s.name} className="flex items-start gap-2.5">
                      <span className="text-base">{s.emoji}</span>
                      <div>
                        <p className="text-xs font-semibold text-[#1a1a2e]">{s.name}</p>
                        <p className="text-[10px] text-[#8E8E93]">{s.benefit} • {s.dosage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </>
        )}

        {activeTab === "clothing" && (
          <>
            <FilterChips items={occasions} selected={selectedOccasion} onSelect={setSelectedOccasion} />
            {filteredOutfits.map(outfit => <OutfitCard key={outfit.id} outfit={outfit} />)}
          </>
        )}

        {/* Empty state */}
        {((activeTab === "exercise" && !filteredExercises.length) ||
          (activeTab === "hair" && !filteredHair.length) ||
          (activeTab === "nutrition" && !filteredRecipes.length) ||
          (activeTab === "clothing" && !filteredOutfits.length)) && (
          <div className="text-center py-12">
            <p className="text-sm text-[#8E8E93]">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgeDiscover;
