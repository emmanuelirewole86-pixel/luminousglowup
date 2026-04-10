import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { saveSurvey, setOnboarded, type SurveyData } from "@/lib/store";

interface Question {
  id: keyof SurveyData;
  title: string;
  subtitle: string;
  options: string[];
  multi?: boolean;
}

const questions: Question[] = [
  { id: "ageRange", title: "What's your age range?", subtitle: "This helps personalize your analysis", options: ["18-24", "25-34", "35-44", "45-54", "55+"] },
  { id: "gender", title: "How do you identify?", subtitle: "For more accurate scoring", options: ["Female", "Male", "Non-binary", "Prefer not to say"] },
  { id: "skinType", title: "What's your skin type?", subtitle: "We'll tailor skincare tips for you", options: ["Dry", "Oily", "Combination", "Normal", "Sensitive"] },
  { id: "hairType", title: "What's your hair type?", subtitle: "For hairstyle recommendations", options: ["Straight", "Wavy", "Curly", "Coily", "Thinning"] },
  { id: "goals", title: "What are your goals?", subtitle: "Select all that apply", options: ["Clearer Skin", "Anti-Aging", "Better Symmetry", "Confidence Boost", "Skincare Routine", "Style Upgrade"], multi: true },
  { id: "lifestyle", title: "Your lifestyle?", subtitle: "Helps us give better tips", options: ["Very Active", "Moderately Active", "Sedentary", "Stressed / Busy"] },
];

const Survey = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<SurveyData>>({});

  const q = questions[step];
  const currentAnswer = answers[q.id];
  const isMulti = q.multi;

  const select = (option: string) => {
    if (isMulti) {
      const current = (currentAnswer as string[]) || [];
      const updated = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      setAnswers({ ...answers, [q.id]: updated });
    } else {
      setAnswers({ ...answers, [q.id]: option });
    }
  };

  const isSelected = (option: string) => {
    if (isMulti) return ((currentAnswer as string[]) || []).includes(option);
    return currentAnswer === option;
  };

  const canProceed = isMulti ? ((currentAnswer as string[]) || []).length > 0 : !!currentAnswer;

  const next = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      saveSurvey(answers as SurveyData);
      setOnboarded();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <div className="px-5 pt-14 pb-2 flex items-center justify-between">
        <button
          onClick={() => (step > 0 ? setStep(step - 1) : navigate("/"))}
          className="text-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i <= step ? "w-6 bg-gradient-primary" : "w-3 bg-muted"
              }`}
            />
          ))}
        </div>
        <button onClick={() => { setOnboarded(); navigate("/"); }} className="text-xs text-muted-foreground font-medium">
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col px-5 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <h1 className="text-2xl font-display font-bold text-foreground">{q.title}</h1>
            <p className="text-sm text-muted-foreground mt-1 mb-6">{q.subtitle}</p>

            <div className="space-y-3">
              {q.options.map((option) => (
                <motion.button
                  key={option}
                  onClick={() => select(option)}
                  className={`w-full py-4 px-5 rounded-2xl text-left text-sm font-medium transition-all flex items-center justify-between ${
                    isSelected(option)
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "bg-card text-foreground border border-border shadow-card"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                  {isSelected(option) && <Check className="w-4 h-4" />}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="py-6">
          <motion.button
            onClick={next}
            disabled={!canProceed}
            className={`w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-opacity ${
              canProceed
                ? "bg-gradient-primary text-primary-foreground shadow-glow"
                : "bg-muted text-muted-foreground"
            }`}
            whileTap={canProceed ? { scale: 0.97 } : {}}
          >
            {step < questions.length - 1 ? (
              <>Continue <ArrowRight className="w-4 h-4" /></>
            ) : (
              <>Get Started <Sparkles className="w-4 h-4" /></>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
