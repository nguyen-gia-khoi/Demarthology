import { Trash2, Download, MessageSquare, X, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

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

const ChatSidebar: React.FC<{
  onSelect: (id: string) => void;
  onClear: () => void;
  onNewChat: () => void;
  selectedChatId?: string | null;
  chatHistory: ChatHistory[];
  isOpen: boolean;
  onToggle: () => void;
}> = ({ onSelect, onClear, onNewChat, selectedChatId, chatHistory, isOpen, onToggle }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -320,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 40,
          opacity: { duration: 0.2 }
        }}
        className={`z-40 h-full overflow-hidden ${
          isOpen ? 'block' : 'hidden'
        } md:block md:relative md:translate-x-0`}
      >
        <div className="flex flex-col w-80 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl border-r border-white/40 h-full overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-4 border-b border-white/30 flex-shrink-0 to-transparent">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-slate-800 flex items-center gap-2 text-base">
                Lịch sử chat
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={onClear}
                  className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors duration-200 text-slate-600"
                  title="Xóa tất cả"
                >
                  <Trash2 className="size-4" />
                </button>
                <button
                  onClick={onToggle}
                  className="p-2 rounded-lg hover:bg-slate-200/60 transition-colors duration-200 md:hidden text-slate-600"
                  title="Đóng sidebar"
                >
                  <ChevronLeft className="size-4" />
                </button>
              </div>
            </div>
            <motion.button
              onClick={onNewChat}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-[#145566] to-[#1c6b84] text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <MessageSquare className="size-4" />
              Chat mới
            </motion.button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto min-h-0 p-2">
            {chatHistory.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 text-center text-slate-500"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <MessageSquare className="size-6 opacity-50" />
                </div>
                <p className="text-sm font-medium">Chưa có lịch sử chat</p>
                <p className="text-xs mt-1 opacity-70">Bắt đầu cuộc trò chuyện mới</p>
              </motion.div>
            ) : (
              <div className="space-y-1">
                {!selectedChatId && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-3 py-3 bg-gradient-to-r from-[#145566]/15 to-[#145566]/5 border-l-4 border-[#145566] rounded-lg"
                  >
                    <span className="text-sm font-semibold text-[#145566]">Chat mới</span>
                  </motion.div>
                )}
                <AnimatePresence>
                  {chatHistory.map((c, index) => (
                    <motion.button
                      key={c.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => onSelect(c.id)}
                      className={`w-full px-3 py-3 text-left hover:bg-slate-100/80 transition-all duration-200 rounded-lg group ${
                        selectedChatId === c.id 
                          ? 'bg-gradient-to-r from-[#145566]/20 to-[#145566]/10 border-l-4 border-[#145566] shadow-sm' 
                          : 'hover:border-l-2 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          selectedChatId === c.id 
                            ? 'bg-[#145566]' 
                            : 'bg-slate-300 group-hover:bg-slate-400'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <span className="block truncate font-medium text-slate-700 text-sm">
                            {c.title}
                          </span>
                          <span className="text-xs text-slate-500 mt-1 block">
                            {c.time}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChatSidebar;
