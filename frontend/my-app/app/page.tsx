'use client';

import Image from "next/image";
import Header from "./components/Header";

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Main Content */}
      <main className="mt-[10vh] p-4">
      <div className="flex flex-col items-center justify-center mb-10">
        <Image 
            src="/images/cricket.webp" 
            alt="Cricket Betting Market" 
            width={600} 
            height={400} 
            className="rounded-lg w-[1500px] h-[42vh] shadow-lg"
          />
          <h1 className="text-4xl font-bold text-gray-800 mt-6">Welcome to Cricket Betting Market</h1>
          <p className="text-lg text-gray-500 mt-4 text-center">
            Bet on your favorite cricket matches with Web3, powered by StarkNet.
          </p>
      </div>

  

        {/* Centered Smaller Cricket Betting Grids */}
        <section className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4 sm:px-6 lg:px-8">
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
                className="relative bg-gradient-to-tr from-black via-blue-500 to-purple-500 rounded-lg p-[1px]"
              >
                {/* Content */}
                <div className="bg-gray-950 text-white rounded-lg p-4">
                  <h2 className="text-2xl font-bold text-center text-purple-300">{match}</h2>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-purple-600 rounded-full flex justify-center items-center">
                        <span className="text-white text-lg font-semibold">DC</span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold">Delhi Capitals</h3>
                        <p className="text-sm text-gray-400">Best odds: 1.80</p>
                      </div>
                    </div>
                    <div className="text-lg text-gray-400 font-bold">VS</div>
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-purple-600 rounded-full flex justify-center items-center">
                        <span className="text-white text-lg font-semibold">RR</span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold">Rajasthan Royals</h3>
                        <p className="text-sm text-gray-400">Best odds: 2.05</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <button className="bg-purple-600 text-white px-5 py-2.5 rounded-full hover:bg-purple-700 transition">
                      Place Your Bet on StarkNet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

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
