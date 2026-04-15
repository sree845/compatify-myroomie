import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/appStore";
import { Moon, Sun, Volume2, BookOpen, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";

const steps = ["Sleep", "Cleanliness", "Noise", "Study"];

const OnboardingPage = () => {
  const [step, setStep] = useState(0);
  const [sleep, setSleep] = useState<"before11" | "11to1" | "after1">("11to1");
  const [cleanliness, setCleanliness] = useState(50);
  const [noise, setNoise] = useState<"quiet" | "moderate" | "flexible">("moderate");
  const [study, setStudy] = useState<"earlyBird" | "nightOwl" | "flexible">("flexible");
  const setProfile = useAppStore((s) => s.setProfile);
  const navigate = useNavigate();

  const handleFinish = () => {
    setProfile({ sleepSchedule: sleep, cleanliness, noisePreference: noise, studyStyle: study });
    navigate("/matches");
  };

  const OptionButton = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all ${
        selected
          ? "gradient-primary text-primary-foreground shadow-elevated"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen gradient-hero flex flex-col px-6 py-8">
      <div className="max-w-sm mx-auto w-full flex-1 flex flex-col">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? "gradient-primary" : "bg-border"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {step === 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Moon className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Sleep Schedule</h2>
                </div>
                <p className="text-muted-foreground text-sm">When do you usually go to bed?</p>
                <div className="space-y-3">
                  <OptionButton selected={sleep === "before11"} onClick={() => setSleep("before11")}>🌙 Before 11 PM</OptionButton>
                  <OptionButton selected={sleep === "11to1"} onClick={() => setSleep("11to1")}>🕐 11 PM – 1 AM</OptionButton>
                  <OptionButton selected={sleep === "after1"} onClick={() => setSleep("after1")}>🦉 After 1 AM</OptionButton>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Cleanliness</h2>
                </div>
                <p className="text-muted-foreground text-sm">How tidy do you keep your space?</p>
                <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Relaxed</span>
                    <span>Spotless</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={cleanliness}
                    onChange={(e) => setCleanliness(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <p className="text-center text-2xl font-bold text-primary">{cleanliness}%</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Noise Preference</h2>
                </div>
                <p className="text-muted-foreground text-sm">What noise level works for you?</p>
                <div className="space-y-3">
                  <OptionButton selected={noise === "quiet"} onClick={() => setNoise("quiet")}>🤫 Quiet</OptionButton>
                  <OptionButton selected={noise === "moderate"} onClick={() => setNoise("moderate")}>🔊 Moderate</OptionButton>
                  <OptionButton selected={noise === "flexible"} onClick={() => setNoise("flexible")}>🎧 Flexible</OptionButton>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Study Style</h2>
                </div>
                <p className="text-muted-foreground text-sm">When do you prefer to study?</p>
                <div className="space-y-3">
                  <OptionButton selected={study === "earlyBird"} onClick={() => setStudy("earlyBird")}><Sun className="inline w-4 h-4 mr-1" /> Early Bird</OptionButton>
                  <OptionButton selected={study === "nightOwl"} onClick={() => setStudy("nightOwl")}><Moon className="inline w-4 h-4 mr-1" /> Night Owl</OptionButton>
                  <OptionButton selected={study === "flexible"} onClick={() => setStudy("flexible")}>✨ Flexible</OptionButton>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 rounded-xl border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-1 hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}
          <button
            onClick={step < 3 ? () => setStep(step + 1) : handleFinish}
            className="flex-1 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-1 shadow-elevated hover:opacity-90 transition-opacity"
          >
            {step < 3 ? "Next" : "Find Matches"} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
