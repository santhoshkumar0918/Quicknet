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
          <h1 className="text-4xl font-bold text-gray-800">Welcome to Cricket Betting Market</h1>
          <p className="text-lg text-gray-500 mt-4">
            Bet on your favorite cricket matches with Web3, powered by StarkNet.
          </p>
        </div>

        {/* Overview Content Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Cricket Betting Overview</h2>
            <p className="text-gray-500 mt-2">
              Explore the most exciting cricket match-ups and place your bets using secure, decentralized transactions.
            </p>
          </div>
          <div className="bg-gradient-to-br from-black via-purple-700 to-purple-400 p-[2px] rounded-lg max-w-4xl mx-auto">
            <div className="bg-gray-950 text-white rounded-lg p-8">
              <h3 className="text-4xl font-bold text-center text-purple-300 mb-6">
                IPL 2024 Final: Mumbai Indians vs Kolkata Knight Riders
              </h3>
              <div className="flex justify-around items-center mt-6">
                {/* Team Mumbai Indians */}
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex justify-center items-center">
                    <span className="text-white text-2xl font-bold">MI</span>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-2xl font-semibold">Mumbai Indians</h4>
                    <p className="text-gray-400">Best odds: 1.65</p>
                  </div>
                </div>

                {/* VS Divider */}
                <div className="text-2xl text-gray-400 font-bold">VS</div>

                {/* Team Kolkata Knight Riders */}
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex justify-center items-center">
                    <span className="text-white text-2xl font-bold">KKR</span>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-2xl font-semibold">Kolkata Knight Riders</h4>
                    <p className="text-gray-400">Best odds: 2.10</p>
                  </div>
                </div>
              </div>

              {/* Betting Button */}
              <div className="mt-10 text-center">
                <button className="bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition">
                  Place Your Bet Now on StarkNet
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Smaller Cricket Betting Grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 sm:px-6 lg:px-8">
          {[
            "Delhi Capitals vs Rajasthan Royals",
            "Royal Challengers Bangalore vs Chennai Super Kings",
            "Punjab Kings vs Sunrisers Hyderabad",
            "Mumbai Indians vs Rajasthan Royals",
            "Chennai Super Kings vs Kolkata Knight Riders",
            "Delhi Capitals vs Kolkata Knight Riders",
          ].map((match, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-tr from-black via-blue-500 to-purple-500 rounded-lg p-[2px]"
            >
              {/* Content */}
              <div className="bg-gray-950 text-white rounded-lg p-6">
                <h2 className="text-3xl font-bold text-center text-purple-300">{match}</h2>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
                      <span className="text-white text-xl font-semibold">DC</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">Delhi Capitals</h3>
                      <p className="text-sm text-gray-400">Best odds: 1.80</p>
                    </div>
                  </div>
                  <div className="text-xl text-gray-400 font-bold">VS</div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
                      <span className="text-white text-xl font-semibold">RR</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">Rajasthan Royals</h3>
                      <p className="text-sm text-gray-400">Best odds: 2.05</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">
                    Place Your Bet on StarkNet
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Line Above Footer */}
      <div className="relative">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

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
