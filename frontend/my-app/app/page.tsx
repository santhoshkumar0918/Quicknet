// 'use client';

// import Header from "./components/Header";

// export default function HomePage() {
//   return (
//     <>
//       <Header />

//       {/* Main Content */}
//       <main className="mt-[10vh] p-4">
//         {/* Centered Content */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-gray-800">Welcome to Cricket Betting Market</h1>
//           <p className="text-lg text-gray-500 mt-4">
//             Bet on your favorite cricket matches with Web3, powered by StarkNet.
//           </p>
//         </div>

//         {/* Overview Content Section */}
//         <section className="mb-12">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-800">Cricket Betting Overview</h2>
//             <p className="text-gray-500 mt-2">
//               Explore the most exciting cricket match-ups and place your bets using secure, decentralized transactions.
//             </p>
//           </div>
//           <div className="bg-gradient-to-br from-black via-purple-700 to-purple-400 p-[2px] rounded-lg max-w-4xl mx-auto">
//             <div className="bg-gray-950 text-white rounded-lg p-8">
//               <h3 className="text-4xl font-bold text-center text-purple-300 mb-6">
//                 IPL 2024 Final: Mumbai Indians vs Kolkata Knight Riders
//               </h3>
//               <div className="flex justify-around items-center mt-6">
//                 {/* Team Mumbai Indians */}
//                 <div className="flex items-center">
//                   <div className="w-20 h-20 bg-purple-600 rounded-full flex justify-center items-center">
//                     <span className="text-white text-2xl font-bold">MI</span>
//                   </div>
//                   <div className="ml-6">
//                     <h4 className="text-2xl font-semibold">Mumbai Indians</h4>
//                     <p className="text-gray-400">Best odds: 1.65</p>
//                   </div>
//                 </div>

//                 {/* VS Divider */}
//                 <div className="text-2xl text-gray-400 font-bold">VS</div>

//                 {/* Team Kolkata Knight Riders */}
//                 <div className="flex items-center">
//                   <div className="w-20 h-20 bg-purple-600 rounded-full flex justify-center items-center">
//                     <span className="text-white text-2xl font-bold">KKR</span>
//                   </div>
//                   <div className="ml-6">
//                     <h4 className="text-2xl font-semibold">Kolkata Knight Riders</h4>
//                     <p className="text-gray-400">Best odds: 2.10</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Betting Button */}
//               <div className="mt-10 text-center">
//                 <button className="bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition">
//                   Place Your Bet Now on StarkNet
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Smaller Cricket Betting Grids */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 sm:px-6 lg:px-8">
//           {[
//             "Delhi Capitals vs Rajasthan Royals",
//             "Royal Challengers Bangalore vs Chennai Super Kings",
//             "Punjab Kings vs Sunrisers Hyderabad",
//             "Mumbai Indians vs Rajasthan Royals",
//             "Chennai Super Kings vs Kolkata Knight Riders",
//             "Delhi Capitals vs Kolkata Knight Riders",
//           ].map((match, index) => (
//             <div
//               key={index}
//               className="relative bg-gradient-to-tr from-black via-blue-500 to-purple-500 rounded-lg p-[2px]"
//             >
//               {/* Content */}
//               <div className="bg-gray-950 text-white rounded-lg p-6">
//                 <h2 className="text-3xl font-bold text-center text-purple-300">{match}</h2>
//                 <div className="flex justify-between items-center mt-6">
//                   <div className="flex items-center">
//                     <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
//                       <span className="text-white text-xl font-semibold">DC</span>
//                     </div>
//                     <div className="ml-4">
//                       <h3 className="text-xl font-semibold">Delhi Capitals</h3>
//                       <p className="text-sm text-gray-400">Best odds: 1.80</p>
//                     </div>
//                   </div>
//                   <div className="text-xl text-gray-400 font-bold">VS</div>
//                   <div className="flex items-center">
//                     <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
//                       <span className="text-white text-xl font-semibold">RR</span>
//                     </div>
//                     <div className="ml-4">
//                       <h3 className="text-xl font-semibold">Rajasthan Royals</h3>
//                       <p className="text-sm text-gray-400">Best odds: 2.05</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-8 text-center">
//                   <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">
//                     Place Your Bet on StarkNet
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Line Above Footer */}
//       <div className="relative">
//         <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//       </div>

//       {/* Footer Section */}
//       <footer className="bg-gradient-to-t from-gray-950 to-gray-800 text-gray-400 py-8 text-center">
//         <p className="text-sm">
//           © {new Date().getFullYear()} AI Market. All rights reserved.
//         </p>
//         <p className="text-sm mt-2">
//           Built with ❤️ by the AI Market Team. Powered by StarkNet for secure, decentralized transactions.
//         </p>
//       </footer>
//     </>
//   );
// }
"use client";

import React from "react";
import Header from "./components/Header";


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
        <p className="text-gray-300 mt-4">
          Track and manage your ongoing and finished bets easily.
        </p>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto p-[2px] bg-gradient-to-br from-black via-purple-700 to-purple-400 rounded-lg shadow-lg">
          <div className="bg-gray-950 rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Current Bets Section */}
              <div className="p-6 border-r border-gray-700">
                <h2 className="text-2xl font-bold text-purple-400 mb-4 text-center">
                  Current Bets
                </h2>
                <div className="space-y-4">
                  {currentBets.map((bet, index) => (
                    <div
                      key={index}
                      className="bg-gray-900 p-4 rounded-md hover:bg-gray-800 transition flex flex-col space-y-2"
                    >
                      <h3 className="text-lg font-semibold text-purple-300">
                        {bet.game}
                      </h3>
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
                <h2 className="text-2xl font-bold text-purple-400 mb-4 text-center">
                  Finished Bets
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profitable Bets Table */}
                  <div className="bg-gradient-to-br from-black via-purple-700 to-purple-400 p-[2px] rounded-lg">
                    <div className="bg-gray-950 rounded-lg p-6">
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
                            <tr
                              key={index}
                              className="border-b border-green-700 hover:bg-green-700/20"
                            >
                              <td className="py-2 px-3">{bet.game}</td>
                              <td className="py-2 px-3">{bet.wager}</td>
                              <td className="py-2 px-3 text-green-300">
                                {bet.profit}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Unprofitable Bets Table */}
                  <div className="bg-gradient-to-br from-black via-purple-700 to-purple-400 p-[2px] rounded-lg">
                    <div className="bg-gray-950 rounded-lg p-6">
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
                            <tr
                              key={index}
                              className="border-b border-red-700 hover:bg-red-700/20"
                            >
                              <td className="py-2 px-3">{bet.game}</td>
                              <td className="py-2 px-3">{bet.wager}</td>
                              <td className="py-2 px-3 text-red-300">
                                {bet.profit}
                              </td>
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

export default page;
