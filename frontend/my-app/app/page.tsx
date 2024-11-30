'use client';

import Header from "./components/Header";

export default function HomePage() {
  return (
    <>
      <Header /> 

      {/* Main Content */}
      <main className="mt-[10vh] p-4">
        {/* Centered Content */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to AI Market</h1>
          <p className="text-lg text-gray-500 mt-4">
            Discover the future of AI-powered solutions.
          </p>
        </div>

        {/* Three Grids with Betting Showcase Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 sm:px-6 lg:px-8">
          
          {/* Grid 1: Betting Showcase */}
          <div className="bg-gray-950 text-white rounded-lg p-6">
            <h2 className="text-3xl font-bold text-center text-purple-300">Team A vs Team B</h2>
            <div className="flex justify-between items-center mt-6">
              {/* Team A */}
              <div className="flex items-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
                  <span className="text-white text-xl font-semibold">A</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Team A</h3>
                  <p className="text-sm text-gray-400">Best odds: 1.80</p>
                </div>
              </div>

              <div className="text-xl text-gray-400 font-bold">VS</div>

              {/* Team B */}
              <div className="flex items-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
                  <span className="text-white text-xl font-semibold">B</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Team B</h3>
                  <p className="text-sm text-gray-400">Best odds: 2.05</p>
                </div>
              </div>
            </div>

            {/* Betting Button */}
            <div className="mt-8 text-center">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">
                Place Your Bet
              </button>
            </div>
          </div>

          {/* Grid 2: Betting Showcase */}
          <div className="bg-gray-950 text-white rounded-lg p-6">
            <h2 className="text-3xl font-bold text-center text-purple-300">Team X vs Team Y</h2>
            <div className="flex justify-between items-center mt-6">
              {/* Team X */}
              <div className="flex items-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
                  <span className="text-white text-xl font-semibold">X</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Team X</h3>
                  <p className="text-sm text-gray-400">Best odds: 1.90</p>
                </div>
              </div>

              {/* VS */}
              <div className="text-xl text-gray-400 font-bold">VS</div>

              {/* Team Y */}
              <div className="flex items-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
                  <span className="text-white text-xl font-semibold">Y</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Team Y</h3>
                  <p className="text-sm text-gray-400">Best odds: 2.10</p>
                </div>
              </div>
            </div>

            {/* Betting Button */}
            <div className="mt-8 text-center">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">
                Place Your Bet
              </button>
            </div>
          </div>

          {/* Grid 3: Betting Showcase */}
          <div className="bg-gray-950 text-white rounded-lg p-6">
            <h2 className="text-3xl font-bold text-center text-purple-300">Team M vs Team N</h2>
            <div className="flex justify-between items-center mt-6">
              {/* Team M */}
              <div className="flex items-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
                  <span className="text-white text-xl font-semibold">M</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Team M</h3>
                  <p className="text-sm text-gray-400">Best odds: 2.00</p>
                </div>
              </div>

              {/* VS */}
              <div className="text-xl text-gray-400 font-bold">VS</div>

              {/* Team N */}
              <div className="flex items-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
                  <span className="text-white text-xl font-semibold">N</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Team N</h3>
                  <p className="text-sm text-gray-400">Best odds: 1.75</p>
                </div>
              </div>
            </div>

            {/* Betting Button */}
            <div className="mt-8 text-center">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">
                Place Your Bet
              </button>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
