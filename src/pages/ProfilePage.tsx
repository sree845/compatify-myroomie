import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/appStore";
import { sampleUsers, sleepLabels, noiseLabels, studyLabels } from "@/lib/matchingData";
import { ChevronLeft, MessageCircle, UserPlus, Moon, Volume2, BookOpen, Sparkles, Check } from "lucide-react";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const matches = useAppStore((s) => s.matches);
  const sentRequests = useAppStore((s) => s.sentRequests);
  const sendRequest = useAppStore((s) => s.sendRequest);

  const user = sampleUsers.find((u) => u.id === id);
  const match = matches.find((m) => m.user.id === id);
  const hasSent = sentRequests.includes(id || "");

  if (!user) return null;

  const stats = [
    { icon: Moon, label: "Sleep", value: sleepLabels[user.sleepSchedule] },
    { icon: BookOpen, label: "Study", value: studyLabels[user.studyStyle] },
    { icon: Volume2, label: "Noise", value: noiseLabels[user.noisePreference] },
    { icon: Sparkles, label: "Clean", value: `${user.cleanliness}%` },
  ];

  return (
    <div className="min-h-screen gradient-hero px-6 py-6">
      <div className="max-w-sm mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground mb-6 hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="text-6xl mb-3">{user.avatar}</div>
          <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.major} · Age {user.age}</p>
          {match && (
            <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full gradient-primary text-primary-foreground text-sm font-semibold">
              {match.score}% Match
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-5 shadow-card mb-4">
          <h3 className="font-semibold text-foreground mb-2">About</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{user.about}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-2xl p-5 shadow-card mb-4">
          <h3 className="font-semibold text-foreground mb-3">Lifestyle</h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-secondary rounded-xl p-3 text-center">
                <s.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-sm font-semibold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {match && match.reasons.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-5 shadow-card mb-6">
            <h3 className="font-semibold text-foreground mb-2">Why you match</h3>
            <ul className="space-y-1.5">
              {match.reasons.map((r, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-3 h-3 text-primary flex-shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/chat/${user.id}`)}
            className="flex-1 py-3 rounded-xl border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Chat
          </button>
          <button
            onClick={() => !hasSent && sendRequest(user.id)}
            disabled={hasSent}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              hasSent
                ? "bg-success text-success-foreground"
                : "gradient-primary text-primary-foreground shadow-elevated hover:opacity-90"
            }`}
          >
            {hasSent ? <><Check className="w-4 h-4" /> Sent!</> : <><UserPlus className="w-4 h-4" /> Request</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
