
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Header from './components/Header';

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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('international');
  const [matches, setMatches] = useState<Match[]>([]);  

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;  

  const url = `${baseUrl}/matches?apikey=${apiKey}`;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setMatches(response.data.data);  
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchMatches();
  }, [url]);

  const internationalMatches = matches.filter((match) => match.matchType === 'odi');
  const premierLeagueMatches = matches.filter((match) => match.matchType === 'ipl');

  return (
    <>
      <Header />
      <main className="mt-[10vh] p-4">
        <div className="flex flex-col items-center justify-center mb-10">
          <Image
            src="/images/cricket.webp"
            alt="Cricket Betting Market"
            width={600}
            height={400}
            className="rounded-lg w-[1500px] h-[42vh] shadow-lg"
          />
          <h1 className="text-4xl font-bold text-gray-100 mt-6">Welcome to Cricket Betting Market</h1>
          <p className="text-lg text-gray-400 mt-4 text-center">
            Bet on your favorite cricket matches with Web3, powered by StarkNet.
          </p>
        </div>

        {/* Tabs Section */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-full p-2 flex space-x-4 border-2 border-white">
            <button
              onClick={() => setActiveTab('international')}
              className={`px-6 py-2 rounded-full transition-transform transform hover:scale-105 border-2 ${
                activeTab === 'international'
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white border-white shadow-lg'
                  : 'text-gray-300 hover:text-white border-transparent hover:border-purple-600'
              }`}
            >
              International Matchups
            </button>
            <button
              onClick={() => setActiveTab('premierLeague')}
              className={`px-6 py-2 rounded-full transition-transform transform hover:scale-105 border-2 ${
                activeTab === 'premierLeague'
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white border-white shadow-lg'
                  : 'text-gray-300 hover:text-white border-transparent hover:border-purple-600'
              }`}
            >
              Premier League
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <section className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-4 sm:px-6 lg:px-8">
            {(activeTab === 'international' ? internationalMatches : premierLeagueMatches).map(
              (match, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-tr from-black via-purple-800 to-indigo-700 rounded-lg p-[1px] hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-purple-600"
                >
                  <div className="bg-gray-900 text-white rounded-lg p-4">
                    <h2 className="text-xl font-bold text-center text-gradient">{match.name}</h2>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center transition-transform transform hover:scale-110">
                          <span className="text-white text-sm font-semibold">{match.teams[0]}</span>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-semibold">{match.teams[0]}</h3>
                          <p className="text-xs text-gray-400">Best odds: 1.80</p>
                        </div>
                      </div>
                      <div className="text-lg text-gray-400 font-bold">VS</div>
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center transition-transform transform hover:scale-110">
                          <span className="text-white text-sm font-semibold">{match.teams[1]}</span>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-semibold">{match.teams[1]}</h3>
                          <p className="text-xs text-gray-400">Best odds: 2.05</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-2.5 rounded-full hover:from-purple-700 hover:to-indigo-800 transition duration-300">
                        Place Your Bet on StarkNet
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gradient-to-t from-gray-950 to-gray-800 text-gray-400 py-8 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} AI Market. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Built with ❤️ by the AI Market Team. Powered by StarkNet for secure, decentralized transactions.
        </p>
      </footer>
    </>
  );
}
