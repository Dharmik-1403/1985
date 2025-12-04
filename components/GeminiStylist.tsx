import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { getStylingAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GeminiStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello. I am your personal stylist at 1985-Timeless. How may I assist you with your wardrobe today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Provide context of what store sells
    const context = "Nike Air Jordans, Formal Shirts (Raymond), Anime Oversize Tees, Denim Jeans";
    
    const response = await getStylingAdvice(userMessage, context);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white border border-timeless-gold shadow-2xl rounded-lg overflow-hidden pointer-events-auto flex flex-col h-[500px] animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-timeless-navy p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <Sparkles size={18} className="text-timeless-gold" />
              <h3 className="font-display font-semibold tracking-wide text-sm">Timeless AI Stylist</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-timeless-gold transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-timeless-cream/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 text-sm rounded-lg shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-timeless-navy text-white rounded-br-none' 
                      : 'bg-white text-timeless-charcoal border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-timeless-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-timeless-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-timeless-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about matching shoes..."
              className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-timeless-gold"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2 bg-timeless-navy text-white rounded hover:bg-timeless-gold transition-colors disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-timeless-navy hover:bg-timeless-gold text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

export default GeminiStylist;