import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/appStore";
import { sleepLabels, studyLabels } from "@/lib/matchingData";
import { Trophy, LogOut, Sparkles, User } from "lucide-react";

const MatchesPage = () => {
  const matches = useAppStore((s) => s.matches);
  const currentUser = useAppStore((s) => s.currentUser);
  const logout = useAppStore((s) => s.logout);
  const navigate = useNavigate();

  if (!matches.length) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen gradient-hero px-6 py-6 pb-24">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-muted-foreground">Welcome, {currentUser}</p>
            <h1 className="text-xl font-bold text-foreground">Your Matches</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/me")} className="p-2 rounded-xl gradient-primary text-primary-foreground shadow-card" aria-label="My profile">
              <User className="w-4 h-4" />
            </button>
            <button onClick={() => { logout(); navigate("/"); }} className="p-2 rounded-xl bg-secondary text-secondary-foreground" aria-label="Log out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {matches.map((match, i) => (
            <motion.div
              key={match.user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(`/profile/${match.user.id}`)}
              className={`relative bg-card rounded-2xl p-5 shadow-card cursor-pointer hover:shadow-elevated transition-shadow ${
                i === 0 ? "ring-2 ring-primary/30" : ""
              }`}
            >
              {i === 0 && (
                <div className="absolute -top-2 -right-2 gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-elevated">
                  <Trophy className="w-3 h-3" /> Top Match
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="text-4xl">{match.user.avatar}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground">{match.user.name}</h3>
                  <p className="text-xs text-muted-foreground">{match.user.major}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {sleepLabels[match.user.sleepSchedule]}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {studyLabels[match.user.studyStyle]}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-extrabold ${match.score >= 70 ? "text-primary" : "text-muted-foreground"}`}>
                    {match.score}%
                  </div>
                </div>
              </div>

              {match.reasons.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-primary font-medium">
                    <Sparkles className="w-3 h-3" />
                    {match.reasons[0]}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;
