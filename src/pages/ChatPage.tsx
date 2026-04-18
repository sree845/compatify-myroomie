import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/appStore";
import { sampleUsers } from "@/lib/matchingData";
import { ChevronLeft, Send } from "lucide-react";

const autoReplies = [
  "Hey! Nice to hear from you 😊",
  "That sounds great!",
  "Haha, totally agree.",
  "What dorm are you thinking about?",
  "Let me know when you're free to chat more!",
  "Cool, I'll think about it.",
];

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const messages = useAppStore((s) => (id ? s.conversations[id] ?? [] : []));
  const sendMessage = useAppStore((s) => s.sendMessage);
  const receiveMessage = useAppStore((s) => s.receiveMessage);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const user = sampleUsers.find((u) => u.id === id);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  if (!user || !id) return null;

  const send = () => {
    const text = input.trim();
    if (!text) return;
    sendMessage(id, text);
    setInput("");

    // Simulated reply
    setIsTyping(true);
    const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    setTimeout(() => {
      receiveMessage(id, reply);
      setIsTyping(false);
    }, 1200 + Math.random() * 1200);
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
          <p className="text-xs text-muted-foreground">{isTyping ? "Typing…" : "Online"}</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 px-4 py-4 overflow-y-auto space-y-3 max-w-sm mx-auto w-full">
        {messages.length === 0 && !isTyping && (
          <div className="text-center text-xs text-muted-foreground py-10">
            No messages yet. Say hi to {user.name}! 👋
          </div>
        )}
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
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
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-card text-foreground shadow-card rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
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
