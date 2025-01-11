'use client'

import React from 'react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BettingInterface from '../components/BettingInterface';
import { motion } from 'framer-motion';
import { FaTrophy, FaChartLine, FaRobot } from 'react-icons/fa';
import Header from '../components/Header';
import type { ReactElement } from 'react';

export default function CreateBetPage(): ReactElement {
  const [showBettingInterface, setShowBettingInterface] = useState(false);
  const searchParams = useSearchParams();
  
  const matchId = searchParams.get('match') || '';
  const team1 = searchParams.get('team1') || '';
  const team2 = searchParams.get('team2') || '';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        {/* Match Overview */}
        <div className="bg-gray-800/50 rounded-xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <FaTrophy className="text-yellow-400" />
            {team1} vs {team2}
          </h1>
          <p className="text-gray-400">Match ID: {matchId}</p>
        </div>

        {/* Main Betting Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Overall Match Winner */}
          <motion.div
            className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaChartLine className="text-purple-400" />
              Match Winner Prediction
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Place your bet on the overall match winner. This is a direct prediction
                without AI assistance.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[team1, team2].map((team) => (
                  <motion.button
                    key={team}
                    onClick={() => setShowBettingInterface(true)}
                    className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl border border-purple-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-lg font-bold mb-2">{team}</div>
                    <div className="text-purple-400">2.5x</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Advanced Betting */}
          <motion.div
            className="bg-gradient-to-br from-green-900/50 to-teal-900/50 rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaRobot className="text-green-400" />
              Advanced Betting Options
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Access detailed betting options with AI assistance and analysis.
              </p>
              <motion.button
                onClick={() => setShowBettingInterface(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-xl
                  text-lg font-semibold shadow-xl mt-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Place Advanced Bet
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Live Stats or Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Match Stats', 'Team Form', 'Head to Head'].map((stat) => (
            <motion.div
              key={stat}
              className="bg-gray-800/30 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold mb-2">{stat}</h3>
              <p className="text-gray-400">Coming soon...</p>
            </motion.div>
          ))}
        </div>

        {showBettingInterface && (
          <BettingInterface
            matchId={matchId}
            team1={team1}
            team2={team2}
            onClose={() => setShowBettingInterface(false)}
          />
        )}
      </div>
    </div>
  );
}
