"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  X, 
  Send, 
  MessageCircle, 
  Sparkles,
  Beaker,
  Trash2,
  ChevronRight,
  HandHelping,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AssistantChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { messages, sendMessage, status, error, setMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (error) {
      console.error("AI CHAT ERROR:", error);
    }
  }, [error]);

  const isStreaming = status === "streaming" || status === "submitted";

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 100;
    setShowScrollButton(!isAtBottom);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  const handleManualSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isStreaming) return;
    
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleSuggestionClick = (text: string) => {
    sendMessage({ text });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMessageText = (m: any) => {
    if (m.content) {
      if (typeof m.content === 'string') return m.content;
      return JSON.stringify(m.content);
    }
    
    return m.parts
      ? (m.parts as Array<{ type: string; text?: string }>)
          .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
          .map(p => p.text)
          .join('')
      : "";
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[100]"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 shadow-[0_12px_44px_rgba(16,185,129,0.4)] flex items-center justify-center group border-none relative"
          size="icon"
        >
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping [animation-duration:3s]" />
          <MessageCircle className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300 relative z-10" />
          <div className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 rounded-full border-2 border-white animate-pulse z-20 shadow-lg" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 120, scale: 0.8, filter: "blur(15px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 120, scale: 0.8, filter: "blur(15px)" }}
            transition={{ type: "spring", damping: 28, stiffness: 450 }}
            className="fixed bottom-24 right-6 z-[100] w-[420px] h-[720px] bg-white/98 backdrop-blur-3xl rounded-[3rem] border border-white/40 shadow-[0_40px_120px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden ring-1 ring-black/[0.08]"
          >
            {/* Header */}
            <div className="p-8 bg-gradient-to-br from-green-600 via-emerald-600 to-green-800 text-white flex items-center justify-between shadow-2xl relative overflow-hidden group">
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-1000" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/20 backdrop-blur-md flex items-center justify-center relative border border-white/30 shadow-[inset_0_2px_2px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform duration-700">
                  <Bot className="w-8 h-8 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-2 border-green-700 rounded-full shadow-xl" />
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight leading-none mb-2">Cisco Assistant</h3>
                  <div className="flex items-center gap-2 opacity-90">
                    <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="text-[11px] uppercase font-black tracking-[0.25em] text-emerald-100/90">Enterprise AI</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <button
                  onClick={handleClearChat}
                  title="Clear Conversation"
                  className="p-3.5 hover:bg-white/20 rounded-2xl transition-all text-white/80 hover:text-white group/btn backdrop-blur-sm border border-white/10"
                >
                  <Trash2 className="w-5 h-5 group-hover/btn:scale-110" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3.5 hover:bg-white/20 rounded-2xl transition-all group/btn backdrop-blur-sm border border-white/10"
                >
                  <X className="w-6 h-6 group-hover/btn:scale-110" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_40%_20%,rgba(16,185,129,0.04),transparent_60%)] bg-white">
              <ScrollArea 
                className="h-full px-8 pt-8" 
                type="scroll"
                onScroll={onScroll}
              >
                <div className="space-y-10 pb-10 pr-2">
                  {messages.length === 0 && (
                    <div className="py-12 space-y-12">
                      {/* Hero Welcome */}
                      <div className="text-center space-y-6">
                        <motion.div 
                          initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          className="w-28 h-28 bg-gradient-to-br from-green-50 via-emerald-50 to-white rounded-[3rem] flex items-center justify-center mx-auto text-green-600 shadow-[0_10px_30px_rgba(16,185,129,0.1)] ring-1 ring-green-100/50"
                        >
                          <HandHelping className="w-14 h-14" />
                        </motion.div>
                        <div className="space-y-3 px-4">
                          <h4 className="font-black text-3xl text-gray-900 tracking-tighter leading-tight">Elite Support</h4>
                          <p className="text-[15px] text-gray-500 font-medium max-w-[300px] mx-auto leading-relaxed">
                            Certified chemicals, bespoke pricing, and global logistics simplified.
                          </p>
                        </div>
                      </div>

                      {/* Featured Quick Actions */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-4 px-4">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-100 to-gray-200" />
                          <p className="text-[12px] font-black uppercase tracking-[0.3em] text-gray-400">Core Services</p>
                          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-100 to-gray-200" />
                        </div>
                        <div className="grid grid-cols-1 gap-4 px-2">
                          {[
                            { icon: Zap, text: "Explore Chemical Catalog", color: "text-amber-500", bg: "bg-amber-50" },
                            { icon: ShieldCheck, text: "Bulk Quote & Strategy", color: "text-blue-500", bg: "bg-blue-50" },
                            { icon: Beaker, text: "Lab Specs & Safety", color: "text-purple-500", bg: "bg-purple-50" }
                          ].map((item, idx) => (
                            <motion.button
                              key={idx}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 * idx }}
                              onClick={() => handleSuggestionClick(item.text)}
                              className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50/50 rounded-[2rem] border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:translate-y-[-4px] hover:border-green-200 transition-all duration-500 group"
                            >
                              <div className="flex items-center gap-5">
                                <div className={`w-12 h-12 ${item.bg} rounded-[1.25rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                   <item.icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <span className="text-[16px] font-extrabold text-gray-700 tracking-tight">{item.text}</span>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-green-600 transition-all duration-300">
                                 <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-4`}
                    >
                      {m.role !== "user" && (
                        <div className="w-11 h-11 shrink-0 rounded-[1.25rem] bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-[13px] font-black shadow-lg shadow-green-500/20 border border-green-400/20 tracking-tighter uppercase transition-transform hover:scale-105">
                          AI
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] p-6 rounded-[2.25rem] text-[16px] leading-[1.7] shadow-sm whitespace-pre-wrap ${
                          m.role === "user"
                            ? "bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white font-semibold rounded-tr-none shadow-green-600/30 ring-1 ring-white/10"
                            : "bg-white text-gray-800 rounded-tl-none border border-gray-100 relative overflow-hidden ring-1 ring-black/[0.02]"
                        }`}
                      >
                        {m.role !== "user" && (
                          <div className="absolute top-0 right-0 w-24 h-24 bg-green-50/40 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
                        )}
                        {getMessageText(m)}
                      </div>
                    </motion.div>
                  ))}

                  {isStreaming && (
                    <div className="flex justify-start gap-4">
                      <div className="w-11 h-11 shrink-0 rounded-[1.25rem] bg-green-50 flex items-center justify-center relative shadow-sm border border-green-100 overflow-hidden">
                        <Sparkles className="w-6 h-6 text-green-600 animate-pulse" />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-100/50 to-transparent animate-pulse" />
                      </div>
                      <div className="bg-white rounded-[2rem] rounded-tl-none border border-gray-100 p-6 shadow-sm ring-1 ring-black/[0.01]">
                         <div className="flex gap-2.5 items-center">
                            <span className="w-3 h-3 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-3 h-3 bg-green-600 rounded-full animate-bounce" />
                         </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-6 bg-red-50 text-red-600 text-[14px] rounded-[2rem] border border-red-100 font-bold text-center shadow-lg shadow-red-500/5"
                    >
                      <div className="flex flex-col items-center gap-3">
                         <div className="p-3 bg-red-100 rounded-2xl">
                            <Zap className="w-6 h-6" />
                         </div>
                         <p>
                          {error.message?.includes("429") || error.message?.includes("Quota") 
                            ? "AI Capacity limit reached. Please wait 15s." 
                            : "AI connection disrupted."}
                         </p>
                         <button onClick={handleClearChat} className="px-6 py-2.5 bg-red-600 text-white border-none rounded-2xl hover:bg-red-700 transition-all text-[12px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20 active:scale-95">
                          Reset Stream
                        </button>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} className="h-10" />
                </div>
              </ScrollArea>
              
              {/* Floating Scroll to Bottom Button */}
              <AnimatePresence>
                {showScrollButton && (
                  <motion.button
                    initial={{ opacity: 0, y: 20, scale: 0.8, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                    exit={{ opacity: 0, y: 20, scale: 0.8, x: "-50%" }}
                    onClick={scrollToBottom}
                    className="absolute bottom-6 left-1/2 px-6 py-3 bg-green-600 text-white rounded-full shadow-[0_15px_40px_rgba(16,185,129,0.4)] hover:bg-green-700 transition-all z-20 flex items-center gap-3 text-[12px] font-black uppercase tracking-widest border border-white/30 backdrop-blur-sm"
                  >
                    <span>Jump to Latest</span>
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Enhanced Depth Shadows */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white via-white/40 to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-10" />
            </div>

            {/* Input Area */}
            <div className="p-8 bg-white/90 backdrop-blur-3xl border-t border-gray-100/60 space-y-5">
              <form
                onSubmit={handleManualSubmit}
                className="relative bg-gray-50/70 border border-gray-200 rounded-[2.25rem] shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] focus-within:bg-white focus-within:border-green-500 focus-within:ring-[8px] focus-within:ring-green-500/10 transition-all duration-700"
              >
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Cisco enterprise AI..."
                  className="w-full px-8 py-6 bg-transparent outline-none text-lg font-bold text-gray-800 placeholder:text-gray-400 placeholder:font-semibold"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                   <Button
                    type="submit"
                    disabled={isStreaming || !inputValue}
                    className="w-14 h-14 bg-gradient-to-tr from-green-600 to-emerald-500 text-white rounded-[1.5rem] flex items-center justify-center hover:from-green-700 hover:to-emerald-600 transition-all duration-500 disabled:opacity-30 shadow-xl shadow-green-600/40 active:scale-90 border-none group/send overflow-hidden"
                    size="icon"
                   >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/send:translate-y-0 transition-transform duration-500" />
                    <Send className="w-6 h-6 group-hover/send:translate-x-1 group-hover/send:-translate-y-1 transition-transform relative z-10" />
                   </Button>
                </div>
              </form>
              <div className="flex items-center justify-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500" />
                 <p className="text-[11px] text-gray-400 font-extrabold uppercase tracking-[0.4em] leading-none">
                   Enterprise Core v1.2
                 </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
