'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import Header from '../components/Header'

interface Message {
  type: 'user' | 'ai';
  content: string;
}

interface Player {
  name: string;
  role: string;
}

interface BetOption {
  label: string;
  value: string;
}

interface BetDetails {
  [key: string]: string;
}

const TEAM_PLAYERS: Record<string, Player[]> = {
  "your_team_name": [
    { name: "Player 1", role: "Batsman" },
    { name: "Player 2", role: "Bowler" }
    // Add more players as needed
  ]
};

const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`p-4 rounded-lg ${
        message.type === 'user' ? 'bg-blue-500/20 ml-auto' : 'bg-gray-500/20'
      }`}
    >
      {message.content}
    </motion.div>
  );
};

export default function CreateBetPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [betOptions, setBetOptions] = useState<BetOption[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [hasBetDetails, setHasBetDetails] = useState(false);
  const [betDetails, setBetDetails] = useState<BetDetails>({});
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) {
      alert("Please enter a message!");
      return;
    }
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');
    const team = "your_team_name"; // Replace with the actual team name or logic to get the team
    setMessages(prev => [
      ...prev,
      { type: 'user', content: `I'll predict the team for ${team}` },
      { type: 'ai', content: `Great! Select 11 players you think will be in the ${team} playing XI:` }
    ]);
    
    setBetOptions([]);
    setSelectedPlayers([]);
    
    const teamPlayers = TEAM_PLAYERS[team] || [];
    setBetOptions(
      teamPlayers.map(player => ({
        label: `${player.name} (${player.role})`,
        value: player.name
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Header />
      <main className="mt-[11vh]">
        <motion.div 
          className="max-w-4xl mx-auto backdrop-blur-lg bg-black/30 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              AI Betting Assistant
            </h1>
            <p className="text-white/60 mt-2">Let's create your perfect bet together</p>
          </div>

          {/* Chat Area */}
          <div className="h-[60vh] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 text-white/60"
                >
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/10">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                          focus:ring-2 focus:ring-cyan-400 transition-all duration-300
                          text-white placeholder-white/50"
                placeholder="Type your message..."
              />
              <motion.button
                onClick={handleSend}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 
                         rounded-lg font-semibold text-white shadow-lg
                         hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <IoSendSharp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Quick Options */}
          <div className="p-4 border-t border-white/10">
            <div className="flex flex-wrap gap-2 justify-center">
              {betOptions.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    // Handle option selection logic
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                           text-white hover:bg-white/10 transition-all duration-300"
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Bet Summary */}
          {hasBetDetails && (
            <motion.div 
              className="p-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Bet Summary</h2>
              <div className="grid grid-cols-2 gap-4 text-white/80">
                {Object.entries(betDetails).map(([key, value]) => (
                  value && (
                    <div key={key} className="bg-white/5 p-3 rounded-lg">
                      <span className="text-white/60">{key}: </span>
                      <span>{value}</span>
                    </div>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
