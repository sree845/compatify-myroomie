import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/appStore";
import { sleepLabels, noiseLabels, studyLabels } from "@/lib/matchingData";
import { ChevronLeft, Moon, Volume2, BookOpen, Sparkles, Pencil, User } from "lucide-react";

const MyProfilePage = () => {
  const navigate = useNavigate();
  const currentUser = useAppStore((s) => s.currentUser);
  const userProfile = useAppStore((s) => s.userProfile);
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);

  if (!isLoggedIn) {
    navigate("/");
    return null;
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen gradient-hero px-6 py-6 flex items-center justify-center">
        <div className="bg-card rounded-2xl p-6 shadow-card text-center max-w-sm">
          <p className="text-foreground font-semibold mb-3">No preferences yet</p>
          <p className="text-sm text-muted-foreground mb-4">Complete the onboarding to see your profile.</p>
          <button
            onClick={() => navigate("/onboarding")}
            className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-elevated"
          >
            Start Onboarding
          </button>
        </div>
      </div>
    );
  }

  const about =
    "Friendly student looking for a chill, respectful roommate. I value good vibes, honest communication, and a tidy shared space.";

  const prefs = [
    { icon: Moon, label: "Sleep Schedule", value: sleepLabels[userProfile.sleepSchedule] },
    { icon: BookOpen, label: "Study Style", value: studyLabels[userProfile.studyStyle] },
    { icon: Volume2, label: "Noise Preference", value: noiseLabels[userProfile.noisePreference] },
  ];

  return (
    <div className="min-h-screen gradient-hero px-6 py-6">
      <div className="max-w-sm mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-muted-foreground mb-6 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card rounded-2xl p-6 shadow-elevated mb-4 overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-20 gradient-primary opacity-90" />
          <div className="relative flex flex-col items-center text-center pt-8">
            <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center text-4xl shadow-elevated ring-4 ring-card">
              👤
            </div>
            <h1 className="mt-3 text-xl font-bold text-foreground">{currentUser || "You"}</h1>
            <p className="text-xs text-muted-foreground">Your RoomieMatch profile</p>
            <button
              onClick={() => navigate("/onboarding")}
              className="mt-3 inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Pencil className="w-3 h-3" /> Edit preferences
            </button>
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 shadow-card mb-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">About Me</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{about}</p>
        </motion.div>

        {/* Cleanliness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl p-5 shadow-card mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground">Cleanliness</h3>
            </div>
            <span className="text-lg font-extrabold text-primary">{userProfile.cleanliness}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${userProfile.cleanliness}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full gradient-primary rounded-full"
            />
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-wide text-muted-foreground mt-2">
            <span>Relaxed</span>
            <span>Spotless</span>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-card mb-6"
        >
          <h3 className="font-semibold text-foreground mb-3">Lifestyle Preferences</h3>
          <div className="space-y-2.5">
            {prefs.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/60"
              >
                <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-card">
                  <p.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{p.label}</p>
                  <p className="text-sm font-semibold text-foreground">{p.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <button
          onClick={() => navigate("/matches")}
          className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm shadow-elevated hover:opacity-90 transition-opacity"
        >
          Back to Matches
        </button>
      </div>
    </div>
  );
};

export default MyProfilePage;
