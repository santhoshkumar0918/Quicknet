"use client"

import React, { useState } from 'react';
import Header from '../components/Header';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClockCircle } from 'react-icons/ai';

function MyBetsPage() {
  const [activeTab, setActiveTab] = useState<'current' | 'finished'>('current');

  const currentBets = [
    { game: 'Bet on Game A', wager: '0.5 ETH', status: 'Active', progress: 70 },
    { game: 'Bet on Game B', wager: '0.3 ETH', status: 'Pending', progress: 45 },
  ];

  const finishedBets = [
    { game: 'Bet on Game C', wager: '0.7 ETH', result: 'Won' },
    { game: 'Bet on Game D', wager: '0.4 ETH', result: 'Lost' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
     
      <Header />

      
      <div className="text-center py-16 mt-16 pl-12 "> 
        <h1 className="text-5xl font-extrabold text-purple-400">My Bets</h1>
        <p className="text-gray-300 mt-4">Track and manage your ongoing and finished bets easily.</p>
      </div>

     
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-6 py-2 text-lg font-medium rounded-l-lg ${
              activeTab === 'current' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Current Bets
          </button>
          <button
            onClick={() => setActiveTab('finished')}
            className={`px-6 py-2 text-lg font-medium rounded-r-lg ${
              activeTab === 'finished' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Finished Bets
          </button>
        </div>

        {/* Current Bets Section */}
        {activeTab === 'current' && (
          <section className="space-y-6">
            {currentBets.map((bet, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-gray-700 transition"
              >
                <div>
                  <h3 className="text-xl font-semibold text-purple-400">{bet.game}</h3>
                  <p className="text-gray-300">Wager: {bet.wager}</p>
                  <p className="text-gray-400 flex items-center gap-2">
                    <AiOutlineClockCircle className="w-5 h-5 text-yellow-500" /> Status: {bet.status}
                  </p>
                  <div className="bg-gray-700 rounded-full h-2 mt-3">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${bet.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Finished Bets Section */}
        {activeTab === 'finished' && (
          <section className="space-y-6">
            {finishedBets.map((bet, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-gray-700 transition"
              >
                <div>
                  <h3 className="text-xl font-semibold text-purple-400">{bet.game}</h3>
                  <p className="text-gray-300">Wager: {bet.wager}</p>
                  <p
                    className={`flex items-center gap-2 ${
                      bet.result === 'Won' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {bet.result === 'Won' ? (
                      <AiOutlineCheckCircle className="w-5 h-5" />
                    ) : (
                      <AiOutlineCloseCircle className="w-5 h-5" />
                    )}
                    Result: {bet.result}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default MyBetsPage;
