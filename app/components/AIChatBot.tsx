"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageCircle,
    X,
    Send,
    Bot,
    Minimize2,
    Maximize2,
    Sparkles,
    Trash2,
    Rocket,
    Key,
    Phone,
    Monitor,
    CircleDollarSign
} from "lucide-react";
import AIRegistrationModal from "./AIRegistrationModal";
import LoginModal from "./LoginModal";
import { useAuth } from '@/contexts/AuthContext';

interface Message {
    id: string;
    text: string;
    sender: "user" | "ai";
    timestamp: Date;
}

const AIChatBot = () => {
    const { user, isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial greeting
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: "1",
                    text: "สวัสดีครับ! ผมคือ BCI AI ยินดีที่ได้พบคุณครับ มีอะไรให้ผมช่วยแนะนำเกี่ยวกับ ERP หรือบริการของเราไหมครับ?",
                    sender: "ai",
                    timestamp: new Date(),
                },
            ]);
        }
    }, [messages.length]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && !isMinimized) {
            scrollToBottom();
        }
    }, [messages, isOpen, isTyping, isMinimized]);

    const handleSend = (textOverride?: string) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: textToSend,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        if (!textOverride) setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let aiText = "ขอบคุณที่สอบถามครับ ผมกำลังรวบรวมข้อมูลให้คุณอยู่...";

            const lowerInput = textToSend.toLowerCase();
            if (lowerInput.includes("สวัสดี") || lowerInput.includes("hello") || lowerInput.includes("hi")) {
                aiText = "สวัสดีครับ! ยินดีต้อนรับสู่ BCI Thailand ครับ ผมพร้อมให้ข้อมูลเกี่ยวกับระบบบริหารจัดการธุรกิจอัจฉริยะแล้วครับ";
            } else if (lowerInput.includes("erp")) {
                aiText = "BCI ERP ของเราเป็นระบบที่ออกแบบมาเพื่อธุรกิจคนไทยโดยเฉพาะครับ ครอบคลุมทั้งระบบคลังสินค้า (WMS), การผลิต (MRP), และการบัญชีแบบครบวงจร คุณสนใจโมดูลไหนเป็นพิเศษไหมครับ?";
            } else if (lowerInput.includes("ติดต่อ") || lowerInput.includes("เบอร์")) {
                aiText = "คุณสามารถติดต่อเราได้ที่หน้า Contact หรือโทร 02-xxx-xxxx ครับ หรือจะฝากเบอร์ไว้ให้เจ้าหน้าที่ติดต่อกลับก็ได้นะครับ";
            } else {
                aiText = "ขอบคุณสำหรับคำถามครับ ขณะนี้ระบบ Chatbot แบบเต็มรูปแบบกำลังอยู่ระหว่างการพัฒนาเชื่อมต่อกับความรู้ด้าน ERP ของเรา หากคุณต้องการข้อมูลเชิงลึก สามารถนัดล่วงหน้าเพื่อ Demo ระบบได้เลยนะคะ!";
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: aiText,
                sender: "ai",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const clearChat = () => {
        setMessages([
            {
                id: Date.now().toString(),
                text: "ล้างการสนทนาเรียบร้อยครับ มีอะไรให้ช่วยใหม่ไหมครับ?",
                sender: "ai",
                timestamp: new Date(),
            },
        ]);
    };

    return (
        <>
            {/* External Registration Modal */}
            <AIRegistrationModal
                isOpen={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onSwitchToLogin={() => {
                    setShowRegisterModal(false);
                    setShowLoginModal(true);
                }}
            />

            {/* Login Modal */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onSwitchToRegister={() => {
                    setShowLoginModal(false);
                    setShowRegisterModal(true);
                }}
            />

            <div className="fixed bottom-6 right-6 z-[999] font-kanit">
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        /* Floating Toggle Button */
                        <motion.button
                            key="chat-button"
                            initial={{ scale: 0, opacity: 0, rotate: -20 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0, rotate: 20 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(true)}
                            className="w-16 h-16 bg-[#0e9aef] text-white rounded-full shadow-[0_8px_30px_rgb(14,154,239,0.4)] flex items-center justify-center relative group overflow-hidden border-2 border-white/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                            <MessageCircle size={30} className="relative z-10" />
                        </motion.button>
                    ) : (
                        /* Chat Window */
                        <motion.div
                            key="chat-window"
                            initial={{ opacity: 0, scale: 0.5, y: 40, x: 20 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                x: 0,
                                height: isMinimized ? "72px" : "clamp(450px, 75vh, 600px)",
                                width: "min(360px, calc(100vw - 40px))"
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.5,
                                y: 40,
                                x: 20,
                                transition: { duration: 0.2 }
                            }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 400
                            }}
                            style={{ transformOrigin: "bottom right" }}
                            className="bg-white border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2rem] overflow-hidden flex flex-col"
                        >
                            {/* Premium Header */}
                            <div className="bg-gradient-to-r from-[#0e9aef] to-[#0a82cc] px-4 py-4 text-white shrink-0">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2.5">
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 rotate-3">
                                                <Bot size={22} className="-rotate-3" />
                                            </div>
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-[#0e9aef] rounded-full" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base leading-tight">BCI Smart AI</h3>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[11px] font-medium opacity-90">ผู้ช่วยอัจฉริยะ</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => setIsMinimized(!isMinimized)}
                                            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                                        >
                                            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                                        </button>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {!isMinimized && (
                                <div className="flex-1 flex flex-col overflow-hidden relative">
                                    {!isAuthenticated ? (
                                        /* Welcome Placeholder in Chat Window */
                                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-white/10 to-white/90">
                                            <div className="w-16 h-16 bg-[#0e9aef]/10 rounded-[1.5rem] flex items-center justify-center mb-5 animate-pulse">
                                                <Sparkles size={32} className="text-[#0e9aef]" />
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-800 mb-2">เข้าสู่ระบบการสนทนา</h4>
                                            <p className="text-sm text-slate-500 mb-8 px-2 leading-relaxed">กรุณาเข้าสู่ระบบเพื่อเริ่มต้นการใช้งานผู้ช่วยอัจฉริยะ</p>

                                            <div className="w-full space-y-4">
                                                <button
                                                    onClick={() => setShowLoginModal(true)}
                                                    className="w-full bg-[#0e9aef] text-white font-bold py-4 rounded-[1.25rem] shadow-[0_8px_20px_rgba(14,154,239,0.25)] hover:bg-[#0c86d1] transition-all active:scale-95 flex items-center justify-center gap-2 group"
                                                >
                                                    <Key size={18} /> เข้าสู่ระบบ
                                                </button>

                                                <div className="flex items-center gap-3 px-2">
                                                    <div className="flex-1 h-px bg-slate-100" />
                                                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">หรือ</span>
                                                    <div className="flex-1 h-px bg-slate-100" />
                                                </div>

                                                <button
                                                    onClick={() => setShowRegisterModal(true)}
                                                    className="w-full bg-white text-slate-600 border-2 border-slate-50 font-bold py-3.5 rounded-[1.25rem] hover:bg-slate-50/50 hover:border-[#0e9aef]/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    <Rocket size={18} /> สมัครสมาชิกใหม่
                                                </button>
                                            </div>
                                        </div>
                                    ) : null}

                                    {/* Chat Area */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/30 min-h-[300px]">
                                        {messages.map((msg) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={msg.id}
                                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed relative ${msg.sender === "user"
                                                        ? "bg-[#0e9aef] text-white rounded-tr-none shadow-[0_4px_12px_rgba(14,154,239,0.25)]"
                                                        : "bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm"
                                                        }`}
                                                >
                                                    {msg.text}
                                                    <div className={`text-[10px] mt-2 font-medium opacity-40 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}

                                        {isTyping && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex justify-start"
                                            >
                                                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                                                    <span className="w-1.5 h-1.5 bg-[#0e9aef]/40 rounded-full animate-bounce" />
                                                    <span className="w-1.5 h-1.5 bg-[#0e9aef]/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                                    <span className="w-1.5 h-1.5 bg-[#0e9aef]/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                                </div>
                                            </motion.div>
                                        )}
                                        <div ref={messagesEndRef} className="h-2" />
                                    </div>

                                    {/* Suggestions */}
                                    {!isTyping && messages.length < 5 && (
                                        <div className="px-4 py-2 flex gap-2 overflow-x-auto custom-scrollbar no-scrollbar scroll-smooth">
                                            {[
                                                { text: "BCI ERP คืออะไร?", icon: <Rocket size={14} /> },
                                                { text: "ติดต่อเรา", icon: <Phone size={14} /> },
                                                { text: "ขอ Demo", icon: <Monitor size={14} /> },
                                                { text: "สอบถามราคา", icon: <CircleDollarSign size={14} /> }
                                            ].map((s, i) => (
                                                <motion.button
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    key={s.text}
                                                    onClick={() => handleSend(s.text)}
                                                    className="whitespace-nowrap px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-full text-[11px] font-medium text-slate-600 hover:border-[#0e9aef] hover:text-[#0e9aef] hover:bg-[#0e9aef]/5 transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                                                >
                                                    <span>{s.icon}</span>
                                                    {s.text}
                                                </motion.button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Actions & Input */}
                                    <div className="px-3 py-3.5 bg-white border-t border-slate-100/50 shrink-0">
                                        <div className="relative flex items-end gap-2 group">
                                            {/* Subtle Glow Effect */}
                                            <div className="absolute inset-0 bg-[#0e9aef]/5 blur-xl group-focus-within:bg-[#0e9aef]/10 transition-colors rounded-2xl pointer-events-none" />

                                            <div className="relative flex-1 bg-slate-50 border border-slate-100 rounded-2xl focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0e9aef]/20 focus-within:border-[#0e9aef]/30 transition-all duration-300 overflow-hidden flex items-end">
                                                <textarea
                                                    rows={1}
                                                    value={input}
                                                    onChange={(e) => setInput(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" && !e.shiftKey) {
                                                            e.preventDefault();
                                                            handleSend();
                                                        }
                                                    }}
                                                    placeholder="ถามคำถามที่นี่..."
                                                    className="w-full pl-4 pr-3 py-2.5 bg-transparent text-[13px] outline-none placeholder:text-slate-400 text-slate-700 resize-none max-h-32 custom-scrollbar min-h-[44px]"
                                                    ref={(el) => {
                                                        if (el) {
                                                            el.style.height = 'auto';
                                                            el.style.height = `${el.scrollHeight}px`;
                                                        }
                                                    }}
                                                />
                                            </div>

                                            <button
                                                onClick={() => handleSend()}
                                                disabled={!input.trim()}
                                                className="relative p-2 bg-[#0e9aef] text-white rounded-[1rem] hover:bg-[#0c86d1] disabled:opacity-30 disabled:grayscale transition-all shadow-[0_4px_12px_rgba(14,154,239,0.25)] active:scale-90 shrink-0 h-[44px] w-[44px] flex items-center justify-center overflow-hidden group/btn"
                                            >
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                                <Send size={18} className="relative z-10" />
                                            </button>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between px-1 opacity-60 hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={clearChat}
                                                className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-[0.15em]"
                                            >
                                                <Trash2 size={12} /> ล้างประวัติแชท
                                            </button>
                                            <div className="flex items-center gap-1.5 text-slate-300">
                                                <Sparkles size={11} className="text-[#0e9aef]/40" />
                                                <span className="text-[9px] uppercase font-bold tracking-[0.2em] bg-gradient-to-r from-slate-400 to-slate-500 bg-clip-text text-transparent">BCI Intelligent AI</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default AIChatBot;
