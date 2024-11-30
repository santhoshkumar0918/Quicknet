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

      <div className="text-center py-12 mt-24 left-36">
        <h1 className="text-5xl font-extrabold text-purple-400">My Bets</h1>
        <p className="text-gray-300 mt-4">Track and manage your ongoing and finished bets easily.</p>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Current Bets Section */}
            <div className="p-6 border-r border-gray-700">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Current Bets</h2>
              <div className="space-y-4">
                {currentBets.map((bet, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 p-4 rounded-md hover:bg-gray-800 transition flex flex-col space-y-2"
                  >
                    <h3 className="text-lg font-semibold text-purple-300">{bet.game}</h3>
                    <p className="text-gray-400">Wager: {bet.wager}</p>
                    <div className="flex items-center gap-2">
                      <AiOutlineClockCircle className="w-5 h-5 text-yellow-500" />
                      <p className="text-gray-500">Status: {bet.status}</p>
                    </div>
                    <div className="bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${bet.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Finished Bets Section */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Finished Bets</h2>
              <div className="space-y-4">
                {finishedBets.map((bet, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 p-4 rounded-md hover:bg-gray-800 transition flex flex-col space-y-2"
                  >
                    <h3 className="text-lg font-semibold text-purple-300">{bet.game}</h3>
                    <p className="text-gray-400">Wager: {bet.wager}</p>
                    <div className="flex items-center gap-2">
                      {bet.result === "Won" ? (
                        <AiOutlineCheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AiOutlineCloseCircle className="w-5 h-5 text-red-400" />
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
