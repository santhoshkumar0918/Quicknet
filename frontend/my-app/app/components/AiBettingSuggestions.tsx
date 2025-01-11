"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaChartLine, FaCoins, FaExclamationTriangle, FaCheckCircle, FaChartBar } from 'react-icons/fa';

interface BettingSuggestion {
  type: 'optimal' | 'safe' | 'risky';
  amount: number;
  odds: number;
  confidence: number;
  reasoning: string[];
  potentialReturn: number;
  riskLevel: number;
}

interface AiBettingSuggestionsProps {
  matchId: string;
  team1: string;
  team2: string;
  onSelectBet: (suggestion: BettingSuggestion) => void;
}

export default function AiBettingSuggestions({ matchId, team1, team2, onSelectBet }: AiBettingSuggestionsProps) {
  // In a real app, these would come from your AI backend
  const suggestions: BettingSuggestion[] = [
    {
      type: 'optimal',
      amount: 0.5,
      odds: 2.1,
      confidence: 85,
      reasoning: [
        "Strong historical performance in similar conditions",
        "Key players in peak form",
        "Favorable weather conditions"
      ],
      potentialReturn: 1.05,
      riskLevel: 2
    },
    {
      type: 'safe',
      amount: 0.2,
      odds: 1.5,
      confidence: 92,
      reasoning: [
        "Conservative bet based on team statistics",
        "High probability of positive outcome",
        "Minimal exposure to volatility"
      ],
      potentialReturn: 0.3,
      riskLevel: 1
    },
    {
      type: 'risky',
      amount: 1.0,
      odds: 3.5,
      confidence: 65,
      reasoning: [
        "Potential for high returns",
        "Historical upset patterns detected",
        "Recent team momentum shift"
      ],
      potentialReturn: 3.5,
      riskLevel: 3
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/90 backdrop-blur-md rounded-xl p-6 border border-purple-500/20"
    >
      <div className="flex items-center gap-3 mb-6">
        <FaRobot className="text-2xl text-purple-400" />
        <h2 className="text-xl font-bold text-white">AI Betting Suggestions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestions.map((suggestion) => (
          <motion.div
            key={suggestion.type}
            className="relative"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl" />
            <motion.div
              className="relative bg-gray-800/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white capitalize mb-1">
                    {suggestion.type} Bet
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <FaChartLine className="text-purple-400" />
                    <span className="text-purple-300">{suggestion.confidence}% Confidence</span>
                  </div>
                </div>
                {getRiskBadge(suggestion.riskLevel)}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Suggested Amount:</span>
                  <span className="text-white font-semibold">{suggestion.amount} ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Potential Return:</span>
                  <span className="text-green-400 font-semibold">+{suggestion.potentialReturn} ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Odds:</span>
                  <span className="text-blue-400 font-semibold">{suggestion.odds}x</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">AI Reasoning:</h4>
                <ul className="space-y-2">
                  {suggestion.reasoning.map((reason, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >
                      <FaCheckCircle className="text-purple-400 flex-shrink-0" />
                      <span>{reason}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.button
                onClick={() => onSelectBet(suggestion)}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg py-2 px-4 font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCoins />
                Apply This Bet
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function getRiskBadge(riskLevel: number) {
  const badges = {
    1: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Low Risk' },
    2: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Medium Risk' },
    3: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'High Risk' }
  };

  const badge = badges[riskLevel as keyof typeof badges];

  return (
    <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
      {badge.label}
    </div>
  );
} 