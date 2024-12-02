
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import { motion } from "framer-motion";

interface Match {
  id: string;
    name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  series_id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
}
interface VoteState {
  [matchId: string]: { yes: number; no: number };
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("international");
  const [matches, setMatches] = useState<Match[]>([]);
  const [votes, setVotes] = useState<{ [key: string]: { yes: number; no: number } }>({});
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}/matches?apikey=${apiKey}`;

 
  
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get<{ data: Match[] }>(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const matches = response.data.data || [];
        const initialVotes = matches.reduce<VoteState>((acc, match) => {
          acc[match.id] = { yes: 0, no: 0 };
          return acc;
        }, {});
        
        setMatches(matches);
        setVotes(initialVotes);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setMatches([]);
        setVotes({});
      }
    };
  
    fetchMatches();
  }, [url]);

  const handleVote = (matchId: string, voteType: "yes" | "no") => {
    setVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };
      updatedVotes[matchId][voteType]++;
      return updatedVotes;
    });
  };

  const calculatePercentage = (matchId: string) => {
    const { yes, no } = votes[matchId];
    const totalVotes = yes + no;
    if (totalVotes === 0) return { yes: 0, no: 0 };
    return {
      yes: Math.round((yes / totalVotes) * 100),
      no: Math.round((no / totalVotes) * 100),
    };
  };

  const internationalMatches = matches.filter((match) => match.matchType === "odi" , "t20");
  const premierLeagueMatches = matches.filter((match) => match.matchType === "ipl");

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Header />
      <main className="mt-[10vh] p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="relative w-full h-[42vh] sm:h-[50vh] lg:h-[60vh]">
            <Image
              src="/images/cricket.webp"
              alt="Cricket Betting Market"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-4 sm:px-6">
              <h1 className="text-4xl sm:text-3xl font-bold text-white mb-4 text-center">
                Welcome to Cricket Betting Market
              </h1>
              <div className="flex space-x-4">
                <Link href="/create-your-own-bet">
                  <motion.button
                    onClick={handleButtonClick}
                    className={`relative px-6 py-3 rounded-full border-2 border-white text-white font-semibold transition duration-300 ${
                      isLoading ? "pointer-events-none" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        className="absolute inset-0 border-2 border-white rounded-full animate-spin"
                        initial={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
                        animate={{ borderColor: "rgba(255, 255, 255, 1)" }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ) : (
                      "Create Your Own Bet"
                    )}
                    <span className="relative z-10">
                      {isLoading ? "Loading..." : ""}
                    </span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-full p-2 flex space-x-4 border-2 border-white">
            <button
              onClick={() => setActiveTab("international")}
              className={`px-6 py-2 rounded-full transition-transform transform hover:scale-105 border-2 ${
                activeTab === "international"
                  ? "bg-gradient-to-r from-purple-700 to-indigo-600 text-white border-white shadow-lg"
                  : "text-gray-300 hover:text-white border-transparent hover:border-purple-600"
              }`}
            >
              International Matchups
            </button>
            <button
              onClick={() => setActiveTab("premierLeague")}
              className={`px-6 py-2 rounded-full transition-transform transform hover:scale-105 border-2 ${
                activeTab === "premierLeague"
                  ? "bg-gradient-to-r from-purple-700 to-indigo-600 text-white border-white shadow-lg"
                  : "text-gray-300 hover:text-white border-transparent hover:border-purple-600"
              }`}
            >
              Premier League
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <section className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-4 sm:px-6 lg:px-8">
            {(activeTab === "international" ? internationalMatches : premierLeagueMatches).map((match) => (
              <div
                key={match.id}
                className="relative bg-gradient-to-tr from-black via-purple-800 to-indigo-700 rounded-lg p-[1px] hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-purple-600"
              >
                <div className="bg-gray-900 text-white rounded-lg p-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-center text-gradient">{match.name}</h2>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleVote(match.id, "yes")}
                      className={`w-[130px] sm:w-[150px] text-center py-2 rounded-full text-white font-bold ${
                        votes[match.id]?.yes > 0 ? "bg-green-400" : "bg-gray-600"
                      }`}
                    >
                      Yes ({calculatePercentage(match.id).yes}%)
                    </button>
                    <button
                      onClick={() => handleVote(match.id, "no")}
                      className={`w-[130px] sm:w-[150px] text-center py-2 rounded-full text-white font-bold ${
                        votes[match.id]?.no > 0 ? "bg-red-400" : "bg-gray-600"
                      }`}
                    >
                      No ({calculatePercentage(match.id).no}%)
                    </button>
                  </div>

                  <div className="mt-6 text-center">
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-2.5 rounded-full hover:from-purple-700 hover:to-indigo-800 transition duration-300">
                      Place Your Bet on StarkNet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}