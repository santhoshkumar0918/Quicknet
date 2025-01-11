import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUser, FaChartLine, FaSpinner } from 'react-icons/fa';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface Prediction {
  team: string;
  confidence: number;
  odds: number;
  reasoning: string[];
  keyStats: {
    label: string;
    value: string;
  }[];
}

export default function AIPredictionChat({ matchId, onClose }: { matchId: string; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const mockAIPrediction: Prediction = {
    team: "India",
    confidence: 75,
    odds: 1.85,
    reasoning: [
      "Strong historical performance in home conditions",
      "Key players in excellent form",
      "Favorable pitch conditions",
      "Better head-to-head record"
    ],
    keyStats: [
      { label: "Win Rate (Last 10)", value: "80%" },
      { label: "Average Score", value: "185" },
      { label: "Form Rating", value: "8.5/10" }
    ]
  };

  useEffect(() => {
    // Initial AI message
    addMessage("Hello! I'm your AI betting assistant. I've analyzed this match and prepared detailed predictions. Would you like to see my analysis?", 'ai');
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (content: string, type: 'ai' | 'user') => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    addMessage(input, 'user');
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setPrediction(mockAIPrediction);
      addMessage("Based on my analysis, here's my prediction for the match:", 'ai');
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    >
      <motion.div 
        className="bg-gray-900 rounded-2xl w-full max-w-3xl h-[80vh] flex flex-col"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaRobot className="text-2xl text-purple-400" />
            <h2 className="text-xl font-bold">AI Betting Assistant</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                {message.type === 'ai' && (
                  <FaRobot className="text-xl text-purple-400 mt-1" />
                )}
                <div className={`rounded-xl p-4 max-w-[80%] ${
                  message.type === 'ai' 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-purple-600 text-white'
                }`}>
                  {message.content}
                </div>
                {message.type === 'user' && (
                  <FaUser className="text-xl text-purple-400 mt-1" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="flex gap-2 items-center text-gray-400">
              <FaSpinner className="animate-spin" />
              AI is typing...
            </div>
          )}

          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-xl p-6 mt-4"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaChartLine className="text-purple-400" />
                AI Prediction
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Predicted Winner:</span>
                  <span className="text-xl font-bold text-purple-400">
                    {prediction.team}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Confidence:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.confidence}%` }}
                        className="h-full bg-purple-500"
                      />
                    </div>
                    <span className="text-purple-400">{prediction.confidence}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-gray-400">Key Factors:</h4>
                  <ul className="space-y-1">
                    {prediction.reasoning.map((reason, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-sm text-gray-300"
                      >
                        • {reason}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  {prediction.keyStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-gray-700/50 p-3 rounded-lg"
                    >
                      <div className="text-sm text-gray-400">{stat.label}</div>
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about the match..."
              className="flex-1 bg-gray-800 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 px-4 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 