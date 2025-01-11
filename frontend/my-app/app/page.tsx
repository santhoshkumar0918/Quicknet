"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEthereum,
  FaTrophy,
  FaChartLine,
  FaArrowRight,
  FaGlobe,
  FaBolt,
  FaUsers,
  FaNewspaper,
  FaRobot,
  FaChartBar,
  FaShieldAlt,
  FaRegLightbulb
} from "react-icons/fa";

interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  score: string;
  teams: string[];
  captains: {
    team1: {
      name: string;
      image: string;
    };
    team2: {
      name: string;
      image: string;
    };
  };
}

const optimizedImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return quality ? `${src}?w=${width}&q=${quality}` : `${src}?w=${width}`;
};

const MatchCard = ({ match }: { match: Match }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 p-6 rounded-xl shadow-xl hover:shadow-purple-500/10 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            {match.name}
          </h3>
          <p className="text-gray-400">{match.venue}</p>
        </div>
        <motion.span
          whileHover={{ scale: 1.1 }}
          className={`px-3 py-1 rounded-full text-sm ${
            match.status === "Live"
              ? "bg-green-500/20 text-green-400 border border-green-500/20"
              : "bg-blue-500/20 text-blue-400 border border-blue-500/20"
          }`}
        >
          {match.status}
        </motion.span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-6">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Image
              src={match.captains.team1.image}
              alt={match.captains.team1.name}
              width={50}
              height={50}
              className="rounded-full ring-2 ring-purple-500/30"
              loader={optimizedImageLoader}
            />
          </motion.div>
          <span className="text-purple-400 font-bold">VS</span>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Image
              src={match.captains.team2.image}
              alt={match.captains.team2.name}
              width={50}
              height={50}
              className="rounded-full ring-2 ring-purple-500/30"
              loader={optimizedImageLoader}
            />
          </motion.div>
        </div>
        {match.score && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 font-medium bg-green-500/10 px-3 py-1 rounded-lg"
          >
            {match.score}
          </motion.span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/create-your-own-bet")}
          className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-500/20"
        >
          <FaEthereum />
          Place Bet
          <FaArrowRight className="ml-1" />
        </motion.button>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-lg"
        >
          <FaChartLine className="text-blue-400" />
          <span className="text-sm font-medium">AI Confidence: 75%</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function HomePage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [matches] = useState<Match[]>([
    {
      id: "1",
      name: "India vs Australia",
      matchType: "T20",
      status: "Live",
      venue: "Melbourne Cricket Ground",
      date: "2024-01-28",
      dateTimeGMT: "2024-01-28T09:30:00.000Z",
      score: "IND: 185/4 (18.2 ov)",
      teams: ["India", "Australia"],
      captains: {
        team1: { name: "Rohit Sharma", image: "/captains/rohit.jpg" },
        team2: { name: "Pat Cummins", image: "/captains/cummins.jpg" }
      }
    },
    {
      id: "2",
      name: "England vs South Africa",
      matchType: "ODI",
      status: "Upcoming",
      venue: "Lord's Cricket Ground",
      date: "2024-01-29",
      dateTimeGMT: "2024-01-29T14:00:00.000Z",
      score: "",
      teams: ["England", "South Africa"],
      captains: {
        team1: { name: "Jos Buttler", image: "/captains/buttler.jpg" },
        team2: { name: "Temba Bavuma", image: "/captains/bavuma.jpg" }
      }
    }
  ]);  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Header />

      {/* Hero Section - Reduced height */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/images/cricket.webp"
            alt="Cricket Stadium"
            layout="fill"
            objectFit="cover"
            className="filter blur-sm hover:blur-none transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </motion.div>

        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.3,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Bet Against AI
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-purple-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Challenge our AI in predicting cricket match outcomes
            </motion.p>
            <motion.button
              onClick={() => router.push("/create-your-own-bet")}
              className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-xl hover:shadow-purple-500/30 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Betting Now
              <FaArrowRight />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />
      </section>

      {/* Live Matches Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FaTrophy className="text-yellow-500" />
            Live & Upcoming Matches
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Why Bet With Us Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
        {/* Background Effects */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '100% 100%' }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
            backgroundSize: '100% 100%'
          }}
        />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Why Bet With Us
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of sports betting with our AI-powered platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Predictions",
                description: "Our advanced AI analyzes millions of data points for accurate match predictions",
                icon: <FaRobot className="text-purple-400 text-4xl" />,
                stats: ["95% Accuracy", "Real-time Updates"],
                gradient: "from-purple-500/20 to-blue-500/20"
              },
              {
                title: "Secure & Transparent",
                description: "Built on StarkNet blockchain ensuring transparent and tamper-proof betting",
                icon: <FaShieldAlt className="text-green-400 text-4xl" />,
                stats: ["100% On-chain", "Instant Payouts"],
                gradient: "from-green-500/20 to-teal-500/20"
              },
              {
                title: "Community Driven",
                description: "Join thousands of players and compete in our global leaderboard",
                icon: <FaUsers className="text-blue-400 text-4xl" />,
                stats: ["10K+ Users", "Daily Rewards"],
                gradient: "from-blue-500/20 to-indigo-500/20"
              },
              {
                title: "Real-time Analytics",
                description: "Access detailed match statistics and betting trends instantly",
                icon: <FaChartBar className="text-yellow-400 text-4xl" />,
                stats: ["Live Updates", "Advanced Charts"],
                gradient: "from-yellow-500/20 to-orange-500/20"
              },
              {
                title: "Low Transaction Fees",
                description: "Benefit from StarkNet's Layer 2 scaling with minimal gas fees",
                icon: <FaEthereum className="text-pink-400 text-4xl" />,
                stats: ["0.1% Fee", "Fast Transactions"],
                gradient: "from-pink-500/20 to-rose-500/20"
              },
              {
                title: "24/7 Support",
                description: "Get help anytime with our dedicated support team and community",
                icon: <FaBolt className="text-cyan-400 text-4xl" />,
                stats: ["Quick Response", "Active Community"],
                gradient: "from-cyan-500/20 to-blue-500/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`relative p-8 rounded-2xl backdrop-blur-sm border border-gray-800 
                  bg-gradient-to-br ${feature.gradient}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px -15px rgba(124, 58, 237, 0.1)",
                  scale: 1.02
                }}
              >
                <motion.div
                  className="mb-6 flex justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>

                <p className="text-gray-400 mb-6">
                  {feature.description}
                </p>

                <div className="flex justify-center gap-4 mt-4">
                  {feature.stats.map((stat, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-gray-800/50 text-gray-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {stat}
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => router.push("/create-your-own-bet")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-xl
                text-lg font-semibold shadow-xl inline-flex items-center gap-2
                hover:shadow-purple-500/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Betting Now
              <FaArrowRight className="text-xl" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Live Statistics Section */}
      <section className="py-16 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Live Platform Statistics
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Total Bets Placed", value: "10,234", icon: FaChartBar },
              { label: "Active Users", value: "2,451", icon: FaUsers },
              { label: "AI Win Rate", value: "76%", icon: FaRobot },
              { label: "Total Volume", value: "1,234 ETH", icon: FaEthereum }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-gray-800/50 p-6 rounded-xl border border-purple-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(139, 92, 246, 0.3)" }}
              >
                <stat.icon className="text-3xl mb-4 text-purple-400" />
                <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Updates */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Latest Updates
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Model Update",
                description: "Our prediction model now includes player performance metrics",
                icon: FaRobot,
                date: "2 days ago"
              },
              {
                title: "New Security Features",
                description: "Enhanced wallet protection with multi-sig support",
                icon: FaShieldAlt,
                date: "5 days ago"
              },
              {
                title: "Community Milestone",
                description: "Reached 10,000 active users on the platform",
                icon: FaUsers,
                date: "1 week ago"
              }
            ].map((update, index) => (
              <motion.div
                key={update.title}
                className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <update.icon className="text-2xl text-blue-400" />
                  <h3 className="text-xl font-semibold">{update.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{update.description}</p>
                <span className="text-sm text-purple-400">{update.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <motion.div
              className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 -z-10 hidden md:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {[
              {
                step: 1,
                title: "Connect Wallet",
                description: "Link your crypto wallet to start betting",
                icon: FaShieldAlt
              },
              {
                step: 2,
                title: "Choose Match",
                description: "Select from live and upcoming cricket matches",
                icon: FaRegLightbulb
              },
              {
                step: 3,
                title: "Place Your Bet",
                description: "Bet against our AI's predictions",
                icon: FaRobot
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                className="relative bg-gray-800/50 p-8 rounded-xl border border-purple-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <div className="text-center pt-6">
                  <step.icon className="text-3xl mb-4 mx-auto text-purple-400" />
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Challenge the AI?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of players already betting on the platform
            </p>
            <motion.button
              onClick={() => router.push("/create-your-own-bet")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Betting Now
              <FaArrowRight className="inline-block ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}