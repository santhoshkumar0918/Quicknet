"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Header from './components/Header';
import { motion } from 'framer-motion';
import { FaEthereum, FaTrophy, FaChartLine } from 'react-icons/fa';

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

const handleError = (error: Error, info: { componentStack: string }) => {
  console.error('Error:', error);
  console.error('Component Stack:', info.componentStack);
};

const optimizedImageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number; }) => {
  if (quality) {
    return `${src}?w=${width}&q=${quality}`;
  }
  return `${src}?w=${width}`;
};

export default function HomePage() {
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

  const handleButtonClick = () => {
    console.log('Button clicked');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/cricket-stadium.jpg"
            alt="Cricket Stadium"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
            loader={optimizedImageLoader}
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Bet Against AI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Challenge our AI in predicting cricket match outcomes
          </p>
          <button 
            onClick={handleButtonClick}
            className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all"
          >
            Start Betting
          </button>
        </div>
      </section>

      {/* Live Matches Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <FaTrophy className="text-yellow-500 mr-2" />
            Live & Upcoming Matches
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{match.name}</h3>
                    <p className="text-gray-400">{match.venue}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    match.status === 'Live' 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {match.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={match.captains.team1.image}
                      alt={match.captains.team1.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                      loader={optimizedImageLoader}
                    />
                    <span>vs</span>
                    <Image
                      src={match.captains.team2.image}
                      alt={match.captains.team2.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                      loader={optimizedImageLoader}
                    />
                  </div>
                  {match.score && (
                    <span className="text-green-400 font-medium">{match.score}</span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <button className="bg-purple-600 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-purple-700 transition-all">
                    <FaEthereum />
                    Place Bet
                  </button>
                  <div className="flex items-center gap-2">
                    <FaChartLine className="text-blue-400" />
                    <span className="text-sm font-medium">AI Confidence: 75%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Bet With Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI vs Human",
                description: "Challenge our advanced AI system in predicting match outcomes",
                icon: "🤖"
              },
              {
                title: "Real-time Updates",
                description: "Get live match updates and betting odds",
                icon: "⚡"
              },
              {
                title: "Secure Platform",
                description: "Your bets are secured by blockchain technology",
                icon: "🔒"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-800 rounded-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}