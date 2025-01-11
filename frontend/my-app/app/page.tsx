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
          transition={{ duration: 1.5 }}
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

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
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
        </div>

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

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Bet With Us
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI vs Human",
                description:
                  "Challenge our advanced AI system in predicting match outcomes",
                icon: <FaGlobe className="text-purple-400 text-4xl" />,
              },
              {
                title: "Real-time Updates",
                description:
                  "Get live match updates and betting odds instantly",
                icon: <FaBolt className="text-yellow-400 text-4xl" />,
              },
              {
                title: "Secure Platform",
                description: "Your bets are secured by blockchain technology",
                icon: <FaEthereum className="text-blue-400 text-4xl" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl hover:shadow-purple-500/10"
              >
                <motion.div
                  className="mb-6 flex justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}