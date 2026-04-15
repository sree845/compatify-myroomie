import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/appStore";
import { Users } from "lucide-react";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const login = useAppStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-elevated animate-pulse-glow">
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">RoomieMatch</h1>
          <p className="text-muted-foreground mt-1 text-sm">Find your perfect roommate</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-card space-y-5"
        >
          <h2 className="text-lg font-bold text-center text-foreground">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {isSignup && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm shadow-elevated hover:opacity-90 transition-opacity"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button type="button" onClick={() => setIsSignup(!isSignup)} className="text-primary font-semibold">
              {isSignup ? "Log In" : "Sign Up"}
            </button>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
