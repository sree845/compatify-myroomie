import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/appStore";
import { sampleUsers } from "@/lib/matchingData";
import { ChevronLeft, Send } from "lucide-react";

const sampleMessages = [
  { from: "them", text: "Hey! I saw we got matched 😊", time: "2:30 PM" },
  { from: "them", text: "What dorm are you looking at?", time: "2:31 PM" },
  { from: "me", text: "Hi! Yeah pretty cool right? I'm looking at West Hall", time: "2:33 PM" },
  { from: "them", text: "Nice! I was thinking the same. Want to coordinate?", time: "2:34 PM" },
];

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useAppStore((s) => s.currentUser);
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState("");

  const user = sampleUsers.find((u) => u.id === id);
  if (!user) return null;

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "me", text: input.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <div className="bg-card shadow-card px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-2xl">{user.avatar}</span>
        <div>
          <h2 className="font-bold text-foreground text-sm">{user.name}</h2>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3 max-w-sm mx-auto w-full">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
              msg.from === "me"
                ? "gradient-primary text-primary-foreground rounded-br-md"
                : "bg-card text-foreground shadow-card rounded-bl-md"
            }`}>
              <p>{msg.text}</p>
              <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-card shadow-card px-4 py-3">
        <div className="max-w-sm mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button onClick={send} className="p-2.5 rounded-xl gradient-primary text-primary-foreground shadow-elevated hover:opacity-90 transition-opacity">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
