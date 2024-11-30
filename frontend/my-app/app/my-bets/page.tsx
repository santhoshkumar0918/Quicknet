"use client";

import React from "react";
import Header from "../components/Header";

function page() {
  const currentBets = [
    { game: "Bet on Game A", wager: "0.5 ETH", status: "Active", progress: 70 },
    { game: "Bet on Game B", wager: "0.3 ETH", status: "Pending", progress: 45 },
  ];

  const finishedBets = [
    { game: "Bet on Game C", wager: "0.7 ETH", result: "Won", profit: "0.2 ETH" },
    { game: "Bet on Game D", wager: "0.4 ETH", result: "Lost", profit: "-0.4 ETH" },
    { game: "Bet on Game E", wager: "1.0 ETH", result: "Won", profit: "0.5 ETH" },
    { game: "Bet on Game F", wager: "0.8 ETH", result: "Lost", profit: "-0.8 ETH" },
  ];

  const profitableBets = finishedBets.filter((bet) => bet.result === "Won");
  const unprofitableBets = finishedBets.filter((bet) => bet.result === "Lost");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <Header />

      <div className="text-center py-12 mt-24">
        <h1 className="text-5xl font-extrabold text-purple-400">My Bets</h1>
        <p className="text-gray-300 mt-4">Track and manage your ongoing and finished bets easily.</p>
      </div>

      <main className="container border border-white mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto p-[2px] bg-transparent rounded-lg shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Current Bets Section */}
            <div className="p-6 border-r border-gray-700">
              <h2 className="text-2xl font-bold text-purple-400 mb-4 text-center">Current Bets</h2>
              <div className="space-y-4">
                {currentBets.map((bet, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 p-4 rounded-md hover:bg-gray-800 transition flex flex-col space-y-2"
                  >
                    <h3 className="text-lg font-semibold text-purple-300">{bet.game}</h3>
                    <p className="text-gray-400">Wager: {bet.wager}</p>
                    <p className="text-gray-500">Status: {bet.status}</p>
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
              <h2 className="text-2xl font-bold text-purple-400 mb-4 text-center">Finished Bets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profitable Bets Table */}
                <div className="p-4 rounded-lg shadow-lg border-4 border-gradient-to-r from-purple-700 to-purple-400">
                  <h3 className="text-xl font-bold text-green-400 mb-4 text-center">
                    Profitable Bets
                  </h3>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-green-700">
                        <th className="py-2 px-3">Game</th>
                        <th className="py-2 px-3">Wager</th>
                        <th className="py-2 px-3">Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profitableBets.map((bet, index) => (
                        <tr key={index} className="border-b border-green-700 hover:bg-green-700/20">
                          <td className="py-2 px-3">{bet.game}</td>
                          <td className="py-2 px-3">{bet.wager}</td>
                          <td className="py-2 px-3 text-green-300">{bet.profit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Unprofitable Bets Table */}
                <div className="p-4 rounded-lg shadow-lg border-4 border-gradient-to-r from-purple-700 to-purple-400">
                  <h3 className="text-xl font-bold text-red-400 mb-4 text-center">
                    Unprofitable Bets
                  </h3>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-red-700">
                        <th className="py-2 px-3">Game</th>
                        <th className="py-2 px-3">Wager</th>
                        <th className="py-2 px-3">Loss</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unprofitableBets.map((bet, index) => (
                        <tr key={index} className="border-b border-red-700 hover:bg-red-700/20">
                          <td className="py-2 px-3">{bet.game}</td>
                          <td className="py-2 px-3">{bet.wager}</td>
                          <td className="py-2 px-3 text-red-300">{bet.profit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
