"use client";

import React from "react";
import Header from "../components/Header";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClockCircle } from "react-icons/ai";

function page() {
  const currentBets = [
    { game: "Bet on Game A", wager: "0.5 ETH", status: "Active", progress: 70 },
    { game: "Bet on Game B", wager: "0.3 ETH", status: "Pending", progress: 45 },
  ];

  const finishedBets = [
    { game: "Bet on Game C", wager: "0.7 ETH", result: "Won" },
    { game: "Bet on Game D", wager: "0.4 ETH", result: "Lost" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <Header />

      <div className="text-center py-12 mt-24">
        <h1 className="text-5xl font-extrabold text-purple-400">My Bets</h1>
        <p className="text-gray-300 mt-4">Track and manage your ongoing and finished bets easily.</p>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-lg shadow-xl overflow-hidden relative">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-gray-900 to-blue-900 opacity-25"></div>
          <div className="absolute inset-0 bg-pattern opacity-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10 divide-x divide-gray-800">
            {/* Current Bets Section */}
            <div className="flex flex-col items-center justify-center p-10 relative">
              <h2 className="text-3xl font-bold text-purple-400 mb-6">Current Bets</h2>
              <div className="space-y-6 w-full">
                {currentBets.map((bet, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg border border-gray-700"
                  >
                    <h3 className="text-xl font-semibold text-purple-300">{bet.game}</h3>
                    <p className="text-gray-400 mt-2">Wager: {bet.wager}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <AiOutlineClockCircle className="w-6 h-6 text-yellow-500" />
                      <p className="text-gray-500">Status: {bet.status}</p>
                    </div>
                    <div className="relative mt-4">
                      <div className="bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${bet.progress}%` }}
                        ></div>
                      </div>
                      <span className="absolute right-0 top-0 text-sm text-purple-300">{`${bet.progress}%`}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Finished Bets Section */}
            <div className="flex flex-col items-center justify-center p-10">
              <h2 className="text-3xl font-bold text-purple-400 mb-6">Finished Bets</h2>
              <div className="space-y-6 w-full">
                {finishedBets.map((bet, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg border border-gray-700"
                  >
                    <h3 className="text-xl font-semibold text-purple-300">{bet.game}</h3>
                    <p className="text-gray-400 mt-2">Wager: {bet.wager}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {bet.result === "Won" ? (
                        <AiOutlineCheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <AiOutlineCloseCircle className="w-6 h-6 text-red-500" />
                      )}
                      <p
                        className={`text-lg font-semibold ${
                          bet.result === "Won" ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        Result: {bet.result}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
