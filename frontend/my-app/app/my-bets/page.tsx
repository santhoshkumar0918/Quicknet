// "use client";

// import React from "react";
// import Header from "../components/Header";
// import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClockCircle } from "react-icons/ai";

// function page() {
//   const currentBets = [
//     { game: "Bet on Game A", wager: "0.5 ETH", status: "Active", progress: 70 },
//     { game: "Bet on Game B", wager: "0.3 ETH", status: "Pending", progress: 45 },
//   ];

//   const finishedBets = [
//     { game: "Bet on Game C", wager: "0.7 ETH", result: "Won" },
//     { game: "Bet on Game D", wager: "0.4 ETH", result: "Lost" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
//       <Header />

//       <div className="text-center py-12 mt-24">
//         <h1 className="text-5xl font-extrabold text-purple-400">My Bets</h1>
//         <p className="text-gray-300 mt-4">Track and manage your ongoing and finished bets easily.</p>
//       </div>

//       <main className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto bg-gray-900 rounded-lg shadow-xl overflow-hidden relative">
//           {/* Decorative Background */}
//           <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-gray-900 to-blue-900 opacity-25"></div>
//           <div className="absolute inset-0 bg-pattern opacity-10"></div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10 divide-x divide-gray-800">
//             {/* Current Bets Section */}
//             <div className="flex flex-col items-center justify-center p-10 relative">
//               <h2 className="text-3xl font-bold text-purple-400 mb-6">Current Bets</h2>
//               <div className="space-y-6 w-full">
//                 {currentBets.map((bet, index) => (
//                   <div
//                     key={index}
//                     className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg border border-gray-700"
//                   >
//                     <h3 className="text-xl font-semibold text-purple-300">{bet.game}</h3>
//                     <p className="text-gray-400 mt-2">Wager: {bet.wager}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <AiOutlineClockCircle className="w-6 h-6 text-yellow-500" />
//                       <p className="text-gray-500">Status: {bet.status}</p>
//                     </div>
//                     <div className="relative mt-4">
//                       <div className="bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
//                         <div
//                           className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500"
//                           style={{ width: `${bet.progress}%` }}
//                         ></div>
//                       </div>
//                       <span className="absolute right-0 top-0 text-sm text-purple-300">{`${bet.progress}%`}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Finished Bets Section */}
//             <div className="flex flex-col items-center justify-center p-10">
//               <h2 className="text-3xl font-bold text-purple-400 mb-6">Finished Bets</h2>
//               <div className="space-y-6 w-full">
//                 {finishedBets.map((bet, index) => (
//                   <div
//                     key={index}
//                     className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg border border-gray-700"
//                   >
//                     <h3 className="text-xl font-semibold text-purple-300">{bet.game}</h3>
//                     <p className="text-gray-400 mt-2">Wager: {bet.wager}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                       {bet.result === "Won" ? (
//                         <AiOutlineCheckCircle className="w-6 h-6 text-green-500" />
//                       ) : (
//                         <AiOutlineCloseCircle className="w-6 h-6 text-red-500" />
//                       )}
//                       <p
//                         className={`text-lg font-semibold ${
//                           bet.result === "Won" ? "text-green-400" : "text-red-400"
//                         }`}
//                       >
//                         Result: {bet.result}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default page;
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg">
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
                    <div className="flex items-center gap-2">
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
              <h2 className="text-2xl font-bold text-purple-400 mb-4 text-center">Finished Bets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profitable Bets Table */}
                <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow">
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
                <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow">
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
