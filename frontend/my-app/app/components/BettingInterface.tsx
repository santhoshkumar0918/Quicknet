import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaEthereum, FaChartLine, FaTimes, FaInfoCircle, FaUserCog, FaAward, FaShieldAlt, FaBalanceScale } from 'react-icons/fa';
import AIPredictionChat from './AIPredictionChat';
import { useQuicknetContract } from '../hooks/useQuicknetContract';

interface BettingInterfaceProps {
  matchId: string;
  team1: string;
  team2: string;
  onClose: () => void;
}

interface Bet {
  team: string;
  amount: number;
  players: string[];
}

type BettingMode = 'selection' | 'manual' | 'assisted';

interface PrebuiltBet {
  name: string;
  description: string;
  risk: 'Low' | 'Medium' | 'High';
  potentialReturn: string;
  aiConfidence: number;
  amount: number;
  icon: React.ReactNode;
}

export default function BettingInterface({ 
  matchId, 
  team1, 
  team2, 
  onClose 
}: BettingInterfaceProps): ReactElement {
  const [bettingMode, setBettingMode] = useState<BettingMode>('selection');
  const [betAmount, setBetAmount] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiPrediction, setAiPrediction] = useState({
    team: team1,
    confidence: 75,
    odds: 1.85
  });

  const { placeBet, isPending, error } = useQuicknetContract();

  const [odds, setOdds] = useState(() => {
    switch (bettingMode) {
      case 'manual':
        return 3.0; // Higher risk, higher reward
      case 'assisted':
        return 1.5; // Lower risk, lower reward
      default:
        return 2.0;
    }
  });

  const handlePlaceBet = async () => {
    if (!betAmount || !selectedTeam) return;
    
    const amount = parseFloat(betAmount);
    
    if (bettingMode === 'assisted' && amount > 1.0) {
      alert('AI Safety: Maximum bet in assisted mode is 1.0 ETH');
      return;
    }

    try {
      const bet: Bet = {
        team: selectedTeam,
        amount: amount,
        players: []
      };
      await placeBet(bet);
    } catch (err) {
      console.error('Betting error:', err instanceof Error ? err.message : String(err));
    }
  };

  const renderModeSelection = () => (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Betting Mode</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          onClick={() => setBettingMode('manual')}
          className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-xl hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center gap-4">
            <FaUserCog className="text-4xl" />
            <h3 className="text-xl font-bold">Manual Betting</h3>
            <p className="text-gray-300 text-center">
              Bet against AI predictions for higher potential returns
            </p>
            <div className="mt-4 flex items-center gap-2">
              <FaAward className="text-yellow-400" />
              <span>Up to 3x returns</span>
            </div>
          </div>
        </motion.button>

        <motion.button
          onClick={() => setBettingMode('assisted')}
          className="bg-gradient-to-br from-green-600 to-teal-600 p-6 rounded-xl hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center gap-4">
            <FaRobot className="text-4xl" />
            <h3 className="text-xl font-bold">AI-Assisted Betting</h3>
            <p className="text-gray-300 text-center">
              Let AI guide your bets for safer, more consistent returns
            </p>
            <div className="mt-4 flex items-center gap-2">
              <FaAward className="text-green-400" />
              <span>Up to 1.5x returns</span>
            </div>
          </div>
        </motion.button>
      </div>

      <div className="text-center mt-8 text-gray-400">
        <p>Choose wisely based on your risk tolerance</p>
      </div>
    </div>
  );

  const getPrebuiltOptions = (): PrebuiltBet[] => [
    {
      name: "Safe Bet",
      description: "AI-recommended conservative bet with high win probability",
      risk: "Low",
      potentialReturn: "1.2x - 1.5x",
      aiConfidence: 85,
      amount: 0.1,
      icon: <FaShieldAlt className="text-green-400 text-2xl" />
    },
    {
      name: "Balanced Bet",
      description: "Moderate risk with good return potential",
      risk: "Medium",
      potentialReturn: "1.5x - 2x",
      aiConfidence: 70,
      amount: 0.5,
      icon: <FaBalanceScale className="text-blue-400 text-2xl" />
    },
    {
      name: "Value Bet",
      description: "AI-detected market inefficiency with good value",
      risk: "Medium",
      potentialReturn: "2x - 2.5x",
      aiConfidence: 65,
      amount: 0.3,
      icon: <FaChartLine className="text-purple-400 text-2xl" />
    }
  ];

  const renderAssistedBettingOptions = () => (
    <div className="space-y-6">
      <div className="bg-green-500/10 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FaRobot className="text-green-400" />
          <h3 className="font-semibold">AI-Recommended Betting Options</h3>
        </div>
        <p className="text-sm text-gray-400">
          Pre-built options based on AI analysis and risk assessment
        </p>
      </div>

      <div className="space-y-4">
        {getPrebuiltOptions().map((option, index) => (
          <motion.div
            key={option.name}
            className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-all border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-700/50 rounded-lg">
                {option.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{option.name}</h4>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    option.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                    option.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {option.risk} Risk
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{option.description}</p>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Amount</div>
                    <div className="font-semibold">{option.amount} ETH</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Return</div>
                    <div className="font-semibold text-green-400">{option.potentialReturn}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">AI Confidence</div>
                    <div className="font-semibold text-blue-400">{option.aiConfidence}%</div>
                  </div>
                </div>

                <motion.button
                  onClick={() => {
                    setBetAmount(option.amount.toString());
                    setSelectedTeam(aiPrediction.team);
                  }}
                  className="w-full mt-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 
                    rounded-lg font-semibold hover:from-green-500 hover:to-teal-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Use This Strategy
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBettingInterface = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Side - Betting Form */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Place Your Bet</h2>
        
        {/* Team Selection */}
        <div className="space-y-4">
          <label className="text-gray-400">Select Team</label>
          <div className="grid grid-cols-2 gap-4">
            {[team1, team2].map((team) => (
              <motion.button
                key={team}
                onClick={() => setSelectedTeam(team)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedTeam === team
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-700 hover:border-purple-500/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {team}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bet Amount */}
        <div className="space-y-2">
          <label className="text-gray-400">Bet Amount (ETH)</label>
          <div className="relative">
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="w-full bg-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="0.0"
              min="0"
              step="0.01"
            />
            <FaEthereum className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[0.1, 0.5, 1, 2].map((amount) => (
            <motion.button
              key={amount}
              onClick={() => setBetAmount(amount.toString())}
              className="bg-gray-800 rounded-lg py-2 hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {amount} ETH
            </motion.button>
          ))}
        </div>

        {/* Place Bet Button */}
        <motion.button
          onClick={handlePlaceBet}
          disabled={!betAmount || !selectedTeam || isPending}
          className={`w-full py-4 rounded-xl font-bold text-lg ${
            !betAmount || !selectedTeam || isPending
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
          }`}
          whileHover={!isPending ? { scale: 1.02 } : {}}
          whileTap={!isPending ? { scale: 0.98 } : {}}
        >
          {isPending ? 'Placing Bet...' : 'Place Bet'}
        </motion.button>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error.message}</p>
        )}
      </div>

      {/* Right Side - AI Prediction */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaRobot className="text-purple-400" />
            AI Prediction
          </h2>
          <motion.button
            onClick={() => setShowAIChat(true)}
            className="text-purple-400 flex items-center gap-1 text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <FaInfoCircle /> Detailed Analysis
          </motion.button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Predicted Winner</span>
              <span className="text-xl font-bold text-purple-400">
                {aiPrediction.team}
              </span>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Confidence</span>
                <span>{aiPrediction.confidence}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${aiPrediction.confidence}%` }}
                  className="h-full bg-purple-500"
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Potential Return</span>
              <div className="flex items-center gap-2">
                <FaEthereum className="text-purple-400" />
                <span className="text-xl font-bold">
                  {betAmount ? (parseFloat(betAmount) * aiPrediction.odds).toFixed(2) : '0.00'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">Win Rate</div>
            <div className="text-xl font-bold">76%</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">Odds</div>
            <div className="text-xl font-bold">{aiPrediction.odds}x</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 text-white"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gray-900 rounded-2xl w-full max-w-4xl p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FaTimes className="text-xl" />
        </button>

        {bettingMode === 'selection' ? renderModeSelection() : (
          <>
            <button
              onClick={() => setBettingMode('selection')}
              className="mb-4 text-gray-400 hover:text-white flex items-center gap-2"
            >
              ← Back to Mode Selection
            </button>
            {renderBettingInterface()}
          </>
        )}
      </motion.div>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {showAIChat && (
          <AIPredictionChat
            matchId={matchId}
            onClose={() => setShowAIChat(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
} 