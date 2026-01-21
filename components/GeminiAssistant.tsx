import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini, isAIAvailable } from '../services/geminiService';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const aiAvailable = isAIAvailable();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: aiAvailable 
        ? 'Hello. I am Mind. Tell me about your current workflow challenges, and I can recommend the right tools.' 
        : 'Hello! The AI assistant is currently in demo mode. To enable full AI capabilities, the site administrator needs to configure the GEMINI_API_KEY. You can still browse our products below!'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(messages.concat([{ role: 'user', text: userText }]), userText);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I'm having trouble thinking right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 hover:scale-105 ${isOpen ? 'bg-charcoal text-white rotate-45' : 'bg-accent text-white rotate-0'}`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <span className="font-semibold text-sm hidden md:inline pr-1">Ask Mind</span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-charcoal border border-cement rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-obsidian px-4 py-3 border-b border-cement flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Mind Concierge</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-charcoal">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-accent text-white rounded-br-none' 
                      : 'bg-cement text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                <div className="bg-cement rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-obsidian border-t border-cement">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ex: I need to organize my notes..."
                className="w-full bg-cement text-white placeholder-gray-500 text-sm rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-accent border border-transparent transition-all"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-accent/20 text-accent rounded-lg hover:bg-accent hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-accent"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default GeminiAssistant;