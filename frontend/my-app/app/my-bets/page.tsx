"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaEthereum, FaTrophy, FaChartLine, FaHistory, 
  FaMedal, FaUserFriends, FaRobot, FaUsers, FaLightbulb, 
  FaUserCircle, FaWallet 
} from 'react-icons/fa';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

interface PerformanceData {
  time: string;
  pnl: number;
  volume: number;
  winRate: number;
  activeBets: number;
}

interface PerformanceDataMap {
  '24h': PerformanceData[];
  '7d': PerformanceData[];
  '30d': PerformanceData[];
  'all': PerformanceData[];
}

interface VisibleMetrics {
  pnl: boolean;
  volume: boolean;
  winRate: boolean;
  activeBets: boolean;
}

// New interface for leaderboard
interface LeaderboardEntry {
  rank: number;
  username: string;
  profit: number;
  winRate: number;
  totalBets: number;
  avatar: string;
}

interface BetInsight {
  id: number;
  title: string;
  description: string;
  probability: number;
  icon: React.ReactNode;
  type: 'opportunity' | 'warning' | 'recommendation';
}

interface SocialBettingTrend {
  sport: string;
  mostBetOn: string;
  communityConfidence: number;
  potentialReturn: number;
}

function Page() {
  const { user } = useDynamicContext();
  const [userData, setUserData] = useState({
    username: user?.username || "QuickBetUser",
    email: user?.email || "user@quickbet.com", 
    walletAddress: user?.wallet || "0x1234...5678", // Removed .address since wallet is a string
    profilePicture: "https://i.pravatar.cc/150?u=quickbet", // Removed user?.profilePicture since it doesn't exist
    totalBets: 42,
    totalProfit: 1.8,
    winRate: 68
  });

  const [performanceData, setPerformanceData] = useState({
    '24h': [
      { time: '00:00', pnl: 0, volume: 1.2, winRate: 65, activeBets: 3 },
      { time: '06:00', pnl: 0.2, volume: 2.1, winRate: 70, activeBets: 4 },
      { time: '12:00', pnl: -0.1, volume: 1.8, winRate: 62, activeBets: 5 },
      { time: '18:00', pnl: 0.3, volume: 2.4, winRate: 75, activeBets: 3 },
      { time: '24:00', pnl: 0.5, volume: 2.8, winRate: 72, activeBets: 4 },
    ],
    '7d': [
      { time: 'Mon', pnl: 0.3, volume: 5.2, winRate: 68, activeBets: 8 },
      { time: 'Tue', pnl: 0.5, volume: 4.8, winRate: 71, activeBets: 7 },
      { time: 'Wed', pnl: 0.2, volume: 5.5, winRate: 65, activeBets: 9 },
      { time: 'Thu', pnl: 0.8, volume: 6.1, winRate: 73, activeBets: 6 },
      { time: 'Fri', pnl: 0.4, volume: 5.9, winRate: 69, activeBets: 8 },
      { time: 'Sat', pnl: 0.6, volume: 6.5, winRate: 72, activeBets: 7 },
      { time: 'Sun', pnl: 0.9, volume: 7.0, winRate: 75, activeBets: 9 },
    ],
    '30d': [],
    'all': []
  });

  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d' | 'all'>('7d');

  // User Profile Section
  const UserProfileSection = () => (
    <motion.div 
      className="user-profile bg-gray-900/30 p-8 rounded-2xl border mt-8 border-purple-500/20 backdrop-blur-lg shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className="flex items-center gap-4 mb-6"
        whileHover={{ x: 5 }}
      >
        <div className="relative">
          <motion.div 
            className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <img 
              src={userData.profilePicture} 
              alt="Profile" 
              className="w-full h-full rounded-full border-2 border-gray-900"
            />
          </motion.div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-900"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {userData.username}
            <FaUserCircle className="text-purple-400" />
          </h2>
          <p className="text-gray-400">{userData.email}</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex items-center space-x-4 mb-6 bg-gray-800/50 p-3 rounded-xl"
        whileHover={{ y: -2 }}
      >
        <div className="flex items-center gap-2">
          <FaWallet className="text-blue-400" />
          <span className="text-sm font-mono bg-gray-900 px-2 py-1 rounded">
            {userData.walletAddress.slice(0, 6)}...{userData.walletAddress.slice(-4)}
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Bets", value: userData.totalBets, icon: FaHistory },
          { label: "Total Profit", value: `+${userData.totalProfit} ETH`, icon: FaEthereum, isProfit: true },
          { label: "Win Rate", value: `${userData.winRate}%`, icon: FaChartLine }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stat-card bg-gray-800/50 p-4 rounded-xl border border-gray-700/50"
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <stat.icon className={`text-xl mb-2 ${stat.isProfit ? 'text-green-400' : 'text-blue-400'}`} />
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className={`font-bold text-lg ${stat.isProfit ? 'text-green-400' : 'text-white'}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const LeaderboardSection = () => (
    <motion.div 
      className="leaderboard bg-gray-900/30 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-lg mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <FaTrophy className="text-yellow-400" />
        Top Performers
      </h2>
      <div className="space-y-4">
        {[
          { rank: 1, user: "CryptoKing", profit: 1000, winRate: 75 },
          { rank: 2, user: "BetMaster", profit: 800, winRate: 70 },
          { rank: 3, user: "ProBetter", profit: 600, winRate: 65 }
        ].map((entry) => (
          <motion.div
            key={entry.rank}
            className="flex items-center justify-between bg-gray-800/50 p-4 rounded-xl"
            whileHover={{ x: 10, backgroundColor: "rgba(31, 41, 55, 0.7)" }}
          >
            <div className="flex items-center gap-4">
              <span className={`text-lg font-bold ${
                entry.rank === 1 ? 'text-yellow-400' :
                entry.rank === 2 ? 'text-gray-400' :
                'text-orange-400'
              }`}>#{entry.rank}</span>
              <span className="font-semibold">{entry.user}</span>
            </div>
            <div className="flex gap-6">
              <span className="text-green-400">+{entry.profit} ETH</span>
              <span className="text-blue-400">{entry.winRate}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const BetInsightsSection = () => (
    <motion.div 
      className="bet-insights bg-gray-900/30 p-6 rounded-2xl border border-green-500/20 backdrop-blur-lg mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <FaLightbulb className="text-yellow-400" />
        Smart Insights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { type: 'opportunity', title: 'High Win Potential', desc: 'Team A has 80% win rate in last 5 matches' },
          { type: 'warning', title: 'Risk Alert', desc: 'Team B has key players injured' },
          { type: 'tip', title: 'Betting Tip', desc: 'Consider hedging your position' },
          { type: 'trend', title: 'Market Trend', desc: 'Heavy betting volume on Team A' }
        ].map((insight) => (
          <motion.div
            key={insight.title}
            className={`p-4 rounded-xl ${
              insight.type === 'opportunity' ? 'bg-green-900/20 border-green-500/20' :
              insight.type === 'warning' ? 'bg-red-900/20 border-red-500/20' :
              'bg-blue-900/20 border-blue-500/20'
            } border`}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            <h3 className="font-semibold mb-2">{insight.title}</h3>
            <p className="text-sm text-gray-400">{insight.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const SocialBettingTrendsSection = () => (
    <motion.div 
      className="social-betting-trends bg-gray-900/30 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <FaUsers className="text-purple-400" />
        Community Trends
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-gray-800/50 p-4 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-sm text-gray-400 mb-2">Most Popular Bet</h3>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Team A to Win</span>
            <span className="text-green-400">80% Confidence</span>
          </div>
        </motion.div>
        <motion.div 
          className="bg-gray-800/50 p-4 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-sm text-gray-400 mb-2">Betting Volume</h3>
          <div className="flex items-center justify-between">
            <span className="font-semibold">2.5K ETH</span>
            <span className="text-blue-400">↑ 25%</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const ActiveBetsAndPredictionsSection = () => (
    <motion.div 
      className="bg-gray-900/30 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaRobot className="text-blue-400" />
          Active Bets & AI Predictions
        </h2>
        <motion.button
          className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-semibold flex items-center gap-2"
          whileHover={{ scale: 1.05, backgroundColor: "#7c3aed" }}
          whileTap={{ scale: 0.95 }}
        >
          <FaChartLine />
          New Bet
        </motion.button>
      </div>

      <div className="space-y-4">
        {/* Active Bets */}
        <div className="bg-gray-800/50 p-4 rounded-xl border border-purple-500/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaHistory className="text-purple-400" />
            Active Bets
          </h3>
          <div className="space-y-3">
            {[
              { match: "IND vs AUS", prediction: "IND to win", amount: "0.5 ETH", confidence: 85 },
              { match: "ENG vs NZ", prediction: "NZ to win", amount: "0.3 ETH", confidence: 75 }
            ].map((bet, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700/30"
                whileHover={{ x: 5, backgroundColor: "rgba(17, 24, 39, 0.7)" }}
              >
                <div>
                  <h4 className="font-medium text-purple-400">{bet.match}</h4>
                  <p className="text-sm text-gray-400">{bet.prediction}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-400">{bet.amount}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <div className="w-20 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${bet.confidence}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                    <span className="text-blue-400">{bet.confidence}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Predictions */}
        <div className="bg-gray-800/50 p-4 rounded-xl border border-blue-500/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaRobot className="text-blue-400" />
            AI Match Predictions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { teams: "PAK vs SA", prediction: "PAK", odds: "1.8x", time: "2h" },
              { teams: "WI vs SL", prediction: "WI", odds: "2.1x", time: "5h" },
              { teams: "BAN vs AFG", prediction: "BAN", odds: "1.5x", time: "8h" },
              { teams: "ZIM vs IRE", prediction: "IRE", odds: "1.9x", time: "12h" }
            ].map((match, index) => (
              <motion.div
                key={index}
                className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/30"
                whileHover={{ y: -2, backgroundColor: "rgba(17, 24, 39, 0.7)" }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium">{match.teams}</span>
                  <span className="text-xs text-gray-400">in {match.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400 font-semibold">{match.prediction}</span>
                  <span className="text-blue-400 text-sm">{match.odds}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(66,23,255,0.1),rgba(0,0,0,0))]"></div>
      <Header />
      <div className="container mx-auto px-4 pt-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <UserProfileSection />
          <ActiveBetsAndPredictionsSection />
        </div>

        <LeaderboardSection />
        <BetInsightsSection />
        <SocialBettingTrendsSection />
      </div>
    </div>
  );
}

export default Page;