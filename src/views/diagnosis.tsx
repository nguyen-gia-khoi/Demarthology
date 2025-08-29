import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  User,
  Send,
  Paperclip,
  Sparkles,
  Mic,
  Image as ImageIcon,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import ChatSidebar from "../components/chatSidebar";

// Types
interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  time?: string;
}

interface ChatHistory {
  id: string;
  title: string;
  time: string;
  messages: ChatMessage[];
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "Xin chào! Mình là trợ lý chẩn đoán. Bạn mô tả triệu chứng hoặc đính kèm ảnh da liễu để mình hỗ trợ nhé ✨",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

const DUMMY_HISTORY: ChatHistory[] = [
  { 
    id: "1", 
    title: "Ngứa rát khi đổ mồ hôi", 
    time: "10:45",
    messages: [
      { id: "1-1", role: "user", content: "Tôi bị ngứa rát khi đổ mồ hôi", time: "10:45" },
      { id: "1-2", role: "assistant", content: "Mình đã nhận được mô tả của bạn. Hãy kiểm tra lại:\n- Triệu chứng bắt đầu khi nào?\n- Có ngứa/rát/đau không?\n- Đã dùng thuốc/bôi gì chưa?", time: "10:46" }
    ]
  },
  { 
    id: "2", 
    title: "Mẩn đỏ quanh miệng", 
    time: "09:30",
    messages: [
      { id: "2-1", role: "user", content: "Tôi có mẩn đỏ quanh miệng", time: "09:30" },
      { id: "2-2", role: "assistant", content: "Có thể bạn bị viêm da tiếp xúc. Hãy cho mình biết thêm:\n- Triệu chứng xuất hiện từ khi nào?\n- Có tiếp xúc với chất gì mới không?", time: "09:31" }
    ]
  },
  { 
    id: "3", 
    title: "Bong tróc da tay", 
    time: "Hôm qua",
    messages: [
      { id: "3-1", role: "user", content: "Da tay tôi bị bong tróc", time: "Hôm qua" },
      { id: "3-2", role: "assistant", content: "Đây có thể là dấu hiệu của bệnh chàm. Mình cần thêm thông tin:\n- Vùng da nào bị ảnh hưởng?\n- Có ngứa không?\n- Có tiền sử bệnh da liễu không?", time: "Hôm qua" }
    ]
  },
];

const formatTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// FloatingOrbs with subtle 3D rotation and layered gradients
const FloatingOrbs: React.FC = () => {
  const orbs = useMemo(
    () =>
      new Array(6).fill(0).map((_, i) => ({
        id: i,
        size: 140 + Math.random() * 220,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 25 + Math.random() * 30,
        delay: Math.random() * 6,
        rotate: Math.random() * 360,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ perspective: 1200 }}>
      {orbs.map((o) => (
        <motion.div
          key={o.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ duration: 1.2, delay: o.delay }}
          className="absolute rounded-full blur-3xl"
          style={{
            width: o.size,
            height: o.size,
            left: `${o.x}%`,
            top: `${o.y}%`,
            transformStyle: "preserve-3d",
            background:
              "radial-gradient(600px circle at 50% 50%, rgba(20,85,102,.36), rgba(28,107,132,.18), transparent 60%)",
            filter: "saturate(110%)",
          }}
        >
          <motion.div
            className="w-full h-full"
            animate={{ rotateY: [0 + o.rotate, 40 + o.rotate, 0 + o.rotate], y: [0, -20, 0], x: [0, 12, 0] }}
            transition={{ duration: o.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ))}

      {/* subtle global slow rotation */}
      <motion.div
        className="absolute inset-0"
        style={{ pointerEvents: "none" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

const TypingDots: React.FC = () => (
  <div className="flex items-center gap-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="inline-block w-1.5 h-1.5 rounded-full bg-current/70"
        animate={{ y: [0, -6, 0], opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
      />
    ))}
  </div>
);

const Bubble: React.FC<{ m: ChatMessage }> = ({ m }) => {
  const isUser = m.role === "user";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98, rotateX: -6 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex items-end gap-3 max-w-[86%]`}>      
        {!isUser && (
          <motion.div
            whileHover={{ rotate: 10, scale: 1.06 }}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#145566] to-[#1b6b82] text-white grid place-items-center shadow-2xl"
          >
            <Bot className="w-4 h-4" />
          </motion.div>
        )}

        <motion.div
          whileHover={isUser ? { rotateY: -6, scale: 1.02 } : { rotateY: 6, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`rounded-2xl px-4 py-3 shadow-xl backdrop-blur-md transform-gpu"
            ${isUser
              ? "bg-gradient-to-br from-[#145566] to-[#1c6b84] text-white shadow-[#145566]/40"
              : "bg-white/95 border border-white/40 text-slate-800 shadow-lg"}
          `}
          style={{ perspective: 800, transformStyle: "preserve-3d" }}
        >
          <div className="whitespace-pre-wrap leading-relaxed text-sm">{m.content}</div>
          {m.time && (
            <div className={`text-xs mt-2 opacity-70 ${isUser ? "text-white/80" : "text-slate-500"}`}>
              {m.time}
            </div>
          )}
        </motion.div>

        {isUser && (
          <motion.div 
            whileHover={{ rotate: -10, scale: 1.06 }} 
            className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 grid place-items-center shadow-xl"
          >
            <User className="w-4 h-4" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const Suggestion: React.FC<{ label: string; onPick: (v: string) => void }> = ({ label, onPick }) => (
  <motion.button
    onClick={() => onPick(label)}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="px-3 py-2 rounded-xl text-sm bg-white/90 border border-white/50 hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-slate-700 hover:border-[#145566]/30"
  >
    {label}
  </motion.button>
);

const Diagnosis: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streaming, setStreaming] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(DUMMY_HISTORY);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSelect = (id: string) => {
    setSelectedChatId(id);
    const selectedChat = chatHistory.find(chat => chat.id === id);
    if (selectedChat) {
      setMessages(selectedChat.messages);
      setCurrentChatId(id);
    }
  };

  const handleClear = () => {
    setChatHistory([]);
    setMessages(INITIAL_MESSAGES);
    setSelectedChatId(null);
    setCurrentChatId(null);
  };

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, streaming]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: ChatMessage = { 
      id: crypto.randomUUID(), 
      role: "user", 
      content: text.trim(), 
      time: formatTime() 
    };
    
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    // Update chat history if this is a new chat
    if (!currentChatId) {
      const newChatId = crypto.randomUUID();
      const newChat: ChatHistory = {
        id: newChatId,
        title: text.trim().length > 30 ? text.trim().substring(0, 30) + "..." : text.trim(),
        time: formatTime(),
        messages: newMessages
      };
      setChatHistory(prev => [newChat, ...prev]);
      setCurrentChatId(newChatId);
      setSelectedChatId(newChatId);
    } else {
      // Update existing chat
      setChatHistory(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: newMessages }
          : chat
      ));
    }

    // quick UI typing feedback
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 450));
    setIsTyping(false);

    // Simulated streaming assistant
    const answer =
      "Mình đã nhận được mô tả của bạn. Hãy kiểm tra lại:\n- Triệu chứng bắt đầu khi nào?\n- Có ngứa/rát/đau không?\n- Đã dùng thuốc/bôi gì chưa?\n\nBạn có thể gửi kèm ảnh để phân tích ROI chuẩn hơn.";

    setStreaming("");
    for (let i = 0; i < answer.length; i++) {
      await new Promise((r) => setTimeout(r, 8 + Math.random() * 10));
      setStreaming((s) => (s ?? "") + answer[i]);
    }

    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: answer,
      time: formatTime(),
    };
    
    const finalMessages = [...newMessages, assistantMsg];
    setMessages(finalMessages);
    setStreaming(null);

    // Update chat history with final messages
    if (currentChatId) {
      setChatHistory(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: finalMessages }
          : chat
      ));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const pickSuggestion = (text: string) => {
    setInput(text);
    sendMessage(text);
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    setCurrentChatId(null);
    setSelectedChatId(null);
  };

  const startNewChat = () => {
    setMessages(INITIAL_MESSAGES);
    setCurrentChatId(null);
    setSelectedChatId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 text-slate-800 overflow-hidden">
      <div className="flex h-screen">
        <ChatSidebar 
          onSelect={handleSelect} 
          onClear={handleClear} 
          onNewChat={startNewChat}
          selectedChatId={selectedChatId}
          chatHistory={chatHistory}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="relative flex-1 flex flex-col">
          <FloatingOrbs />

          {/* Toggle button for mobile */}
          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden fixed top-20 left-4 z-40 p-3 rounded-xl bg-white/95 backdrop-blur-xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-200"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </motion.button>

          {/* Main container */}
          <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-80px)]">
            <motion.div
              initial={{ scale: 0.995, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative rounded-3xl border border-white/50 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl shadow-2xl overflow-hidden h-full flex flex-col max-h-[calc(100vh-100px)]"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#145566]/20 via-transparent to-[#1c6b84]/20 opacity-50" />
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

              {/* Chat messages area */}
              <div ref={listRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-0 relative z-10">
                <AnimatePresence initial={false} mode="popLayout">
                  {messages.map((m) => (
                    <Bubble key={m.id} m={m} />
                  ))}

                  {streaming !== null && (
                    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                      <div className="flex items-end gap-3 max-w-[86%]">
                        <motion.div 
                          whileHover={{ rotate: 10, scale: 1.06 }}
                          className="w-9 h-9 rounded-full bg-gradient-to-br from-[#145566] to-[#1b6b82] text-white grid place-items-center shadow-2xl"
                        >
                          <Bot className="w-4 h-4" />
                        </motion.div>
                        <motion.div
                          whileHover={{ rotateY: 6, scale: 1.02 }}
                          className="bg-white/95 backdrop-blur-md border border-white/40 text-slate-800 rounded-2xl px-4 py-3 shadow-lg"
                        >
                          <div className="whitespace-pre-wrap leading-relaxed text-sm">{streaming.length === 0 ? <TypingDots /> : streaming}</div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {isTyping && (
                    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                      <div className="flex items-end gap-3 max-w-[86%]">
                        <motion.div 
                          whileHover={{ rotate: 10, scale: 1.06 }}
                          className="w-9 h-9 rounded-full bg-gradient-to-br from-[#145566] to-[#1b6b82] text-white grid place-items-center shadow-2xl"
                        >
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </motion.div>
                        <motion.div
                          whileHover={{ rotateY: 6, scale: 1.02 }}
                          className="bg-white/95 backdrop-blur-md border border-white/40 text-slate-800 rounded-2xl px-4 py-3 shadow-lg"
                        >
                          <TypingDots />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Suggestions */}
              <div className="px-4 sm:px-6 pb-3 flex flex-wrap gap-2 relative z-10">
                <Suggestion label="Mẩn đỏ quanh miệng 3 ngày" onPick={pickSuggestion} />
                <Suggestion label="Ngứa rát khi đổ mồ hôi" onPick={pickSuggestion} />
                <Suggestion label="Bong tróc da ở khuỷu tay" onPick={pickSuggestion} />
              </div>

              {/* Input form */}
              <form onSubmit={handleSubmit} className="border-t border-white/40 p-4 sm:p-6 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl relative z-10">
                <div className="flex items-end gap-3">
                  <div className="flex items-center gap-2">
                    <motion.button 
                      type="button" 
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 rounded-xl bg-white/90 border border-white/50 hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl" 
                      title="Đính kèm"
                    >
                      <Paperclip className="w-4 h-4 text-slate-600" />
                    </motion.button>
                    <motion.button 
                      type="button" 
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 rounded-xl bg-white/90 border border-white/50 hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl" 
                      title="Gửi ảnh"
                    >
                      <ImageIcon className="w-4 h-4 text-slate-600" />
                    </motion.button>
                    <motion.button 
                      type="button" 
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 rounded-xl bg-white/90 border border-white/50 hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl" 
                      title="Nói chuyện"
                    >
                      <Mic className="w-4 h-4 text-slate-600" />
                    </motion.button>
                  </div>

                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={1}
                        placeholder="Nhập tin nhắn…"
                        className="w-full resize-none rounded-2xl border border-white/50 bg-white/95 backdrop-blur px-4 py-3 pr-16 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#145566]/60 focus:border-[#145566]/40 text-sm transition-all duration-200 text-slate-800 placeholder-slate-500"
                        onInput={(e) => {
                          const t = e.currentTarget;
                          t.style.height = "auto";
                          t.style.height = Math.min(t.scrollHeight, 100) + "px";
                        }}
                      />
                      <div className="absolute right-3 bottom-2.5 flex items-center gap-1.5 text-xs text-slate-500">
                        <Sparkles className="w-4 h-4 text-[#145566]" />
                        <span className="font-medium">AI Ready</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, rotateX: -4, rotateY: 6 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold bg-gradient-to-r from-[#145566] to-[#1c6b84] text-white shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                    Gửi
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
