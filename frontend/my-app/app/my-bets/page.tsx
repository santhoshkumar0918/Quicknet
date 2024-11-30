import React from 'react';
import Header from '../components/Header';

function MyBetsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-[11vh]">
        <h1 className="text-3xl font-bold text-center mb-10 pr-14 mt-3 text-purple-400">
          My Bets
        </h1>

        {/* Current Bets Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Current Bets</h2>
          <div className="space-y-4">
            {/* Example Current Bet */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
              <h3 className="text-lg font-semibold text-purple-400">Bet on Game A</h3>
              <p className="text-gray-300">Wager: 0.5 ETH</p>
              <p className="text-gray-400">Status: Active</p>
            </div>

            {/* Add more current bets here if needed */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
              <h3 className="text-lg font-semibold text-purple-400">Bet on Game B</h3>
              <p className="text-gray-300">Wager: 0.3 ETH</p>
              <p className="text-gray-400">Status: Pending</p>
            </div>
          </div>
        </section>

        {/* Finished Bets Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Finished Bets</h2>
          <div className="space-y-4">
            {/* Example Finished Bet */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
              <h3 className="text-lg font-semibold text-purple-400">Bet on Game C</h3>
              <p className="text-gray-300">Wager: 0.7 ETH</p>
              <p className="text-green-400">Result: Won</p>
            </div>

            {/* Add more finished bets here if needed */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
              <h3 className="text-lg font-semibold text-purple-400">Bet on Game D</h3>
              <p className="text-gray-300">Wager: 0.4 ETH</p>
              <p className="text-red-400">Result: Lost</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyBetsPage;
