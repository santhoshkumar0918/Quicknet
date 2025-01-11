'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaChartLine, FaEthereum, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import Header from '../components/Header';
import AiBettingSuggestions from '../components/AiBettingSuggestions';

interface BetFormData {
  amount: string;
  team: string;
  customOdds?: string;
}

export default function CreateYourOwnBet() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<BetFormData>({
    amount: '',
    team: '',
    customOdds: ''
  });
  const [showAiSuggestions, setShowAiSuggestions] = useState(true);

  // Get match details from URL params
  const matchName = searchParams?.get('match') || 'Match';
  const team1 = searchParams?.get('team1') || 'Team 1';
  const team2 = searchParams?.get('team2') || 'Team 2';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would typically make an API call to process the bet
      // For now, we'll just simulate it
      console.log('Processing bet:', formData);
      
      // Show loading state if needed
      
      // Redirect to a confirmation or my-bets page
      router.push('/my-bets');
    } catch (error) {
      console.error('Error placing bet:', error);
      // Handle error (show error message to user)
    }
  };

  const handleAiSuggestionSelect = (suggestion: any) => {
    setFormData({
      ...formData,
      amount: suggestion.amount.toString(),
      customOdds: suggestion.odds.toString()
    });
    setShowAiSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-2 mt-8 text-purple-400 mb-8 hover:text-purple-300 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          
        </motion.button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bet Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cyber-border bg-gray-900/90 backdrop-blur-md rounded-xl p-6"
          >
            <h1 className="text-2xl font-bold mb-6 neon-text">Place Your Bet</h1>
            <h2 className="text-xl text-purple-300 mb-8">{matchName}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Select Team</label>
                <div className="grid grid-cols-2 gap-4">
                  {[team1, team2].map((team) => (
                    <motion.button
                      key={team}
                      type="button"
                      onClick={() => setFormData({ ...formData, team })}
                      className={`p-4 rounded-lg border ${
                        formData.team === team
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-gray-700 hover:border-purple-500/50'
                      } transition-colors`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {team}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Bet Amount (ETH)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none"
                    step="0.01"
                    min="0"
                  />
                  <FaEthereum className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Custom Odds (Optional)</label>
                <input
                  type="number"
                  value={formData.customOdds}
                  onChange={(e) => setFormData({ ...formData, customOdds: e.target.value })}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none"
                  step="0.1"
                  min="1"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEthereum />
                Place Bet
              </motion.button>
            </form>
          </motion.div>

          {/* AI Suggestions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="sticky top-24">
              <AiBettingSuggestions
                matchId="1"
                team1={team1}
                team2={team2}
                onSelectBet={handleAiSuggestionSelect}
              />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
