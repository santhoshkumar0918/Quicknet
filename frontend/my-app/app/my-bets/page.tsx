"use client";

import React from "react";
import Header from "../components/Header";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

function Page() {
  const { user } = useDynamicContext();
  console.log(user);

  
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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-950 text-white">
      <Header />

      {/* Main Heading and Description */}
      <div className="text-center py-8 mt-16">
        
        <h1 className="text-gray-300 text-2xl  mt-2">Track and manage your bets effortlessly.</h1>
      </div>

      {/* User Profile Section */}
       { user &&( <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-black via-purple-700 to-purple-400 p-[1px] rounded-lg shadow-lg">
            <div className="bg-gray-950 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-purple-400 mb-4 text-center">User Profile</h2>
              {user ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Username:</strong> {user.username || "N/A"}</p>
                    <p><strong>Wallet address :</strong></p>  
                  </div>
                  <div>
                    <p><strong>Todays Pnl: +</strong></p>
                    <p><strong>User ID:</strong> {user.userId || "N/A"}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center">Loading user details...</p>
              )}
            </div>
          </div>
        </div>)}

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-black via-purple-700 to-purple-400 p-[1px] rounded-lg shadow-lg">
          <div className="bg-gray-950 rounded-lg p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Current Bets Section */}
              <div className="border-r border-gray-700 lg:pr-4">
                <h2 className="text-xl font-bold text-purple-400 mb-3 text-center">Current Bets</h2>
                <div className="space-y-2">
                  {currentBets.map((bet, index) => (
                    <div key={index} className="p-[1px] bg-gradient-to-br from-black via-gray-300 to-gray-100 rounded-md">
                      <div className="p-3 bg-gray-950 rounded-md hover:bg-gray-800 transition flex flex-col space-y-1">
                        <h3 className="text-lg font-semibold text-purple-300">{bet.game}</h3>
                        <p className="text-gray-400">Wager: {bet.wager}</p>
                        <p className="text-gray-500">Status: {bet.status}</p>
                        <div className="bg-gray-700 rounded-full h-1">
                          <div
                            className="bg-purple-500 h-1 rounded-full"
                            style={{ width: `${bet.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Finished Bets  */}
              <div>
                <h2 className="text-xl font-bold text-purple-400 mb-3 text-center">Finished Bets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Profitable Bets */}
                  <div className="bg-gradient-to-br from-black via-gray-300 to-purple-100 p-[1px] rounded-lg">
                    <div className="bg-gray-950 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-green-400 mb-2 text-center">Profitable Bets</h3>
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-green-700">
                            <th className="py-1 px-2">Game</th>
                            <th className="py-1 px-2">Wager</th>
                            <th className="py-1 px-2">Profit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {profitableBets.map((bet, index) => (
                            <tr key={index} className="border-b border-green-700 hover:bg-green-700/20">
                              <td className="py-1 px-2">{bet.game}</td>
                              <td className="py-1 px-2">{bet.wager}</td>
                              <td className="py-1 px-2 text-green-300">{bet.profit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Unprofitable Bets Table */}
                  <div className="bg-gradient-to-br from-black via-gray-300 to-purple-100 p-[1px] rounded-lg">
                    <div className="bg-gray-950 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-red-400 mb-2 text-center">Unprofitable Bets</h3>
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-red-700">
                            <th className="py-1 px-2">Game</th>
                            <th className="py-1 px-2">Wager</th>
                            <th className="py-1 px-2">Loss</th>
                          </tr>
                        </thead>
                        <tbody>
                          {unprofitableBets.map((bet, index) => (
                            <tr key={index} className="border-b border-red-700 hover:bg-red-700/20">
                              <td className="py-1 px-2">{bet.game}</td>
                              <td className="py-1 px-2">{bet.wager}</td>
                              <td className="py-1 px-2 text-red-300">{bet.profit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;

