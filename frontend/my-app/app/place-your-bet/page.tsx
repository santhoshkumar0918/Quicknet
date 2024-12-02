
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PlaceYourBet() {
  const router = useRouter();
  const [betAmount, setBetAmount] = useState("");
  const [isPlacingBet, setIsPlacingBet] = useState(false);

  const handlePlaceBet = () => {
    if (!betAmount) {
      alert("Please enter a bet amount!");
      return;
    }
    setIsPlacingBet(true);
    setTimeout(() => {
      setIsPlacingBet(false);
      alert(`Bet placed successfully with amount: ${betAmount}`);
      router.push("/");
    }, 2000);
  };

  // Use effect to trigger fade-in animation on page load (If needed)
  useEffect(() => {
    const element = document.querySelector(".bet-container");
    if (element) {
      // Add a console log to debug if the element is being targeted
      console.log("Element found:", element);
      element.classList.add("opacity-100");
      element.classList.remove("opacity-0");
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex items-center justify-center p-6">
      <div className="bet-container bg-gradient-to-br from-black via-purple-700 to-purple-400 p-[1px] rounded-lg shadow-lg max-w-md w-full">
        <div className="bg-gray-950 rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-purple-400">Place Your Bet</h1>
          <div className="mb-4">
            <label htmlFor="betAmount" className="block text-gray-400 mb-2">
              Enter Bet Amount:
            </label>
            <input
              id="betAmount"
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Enter your amount"
            />
          </div>
          <button
            onClick={handlePlaceBet}
            disabled={isPlacingBet}
            className={`w-full py-3 mt-4 rounded-lg font-bold ${
              isPlacingBet
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
            } transition-all`}
          >
            {isPlacingBet ? "Placing Bet..." : "Place Bet"}
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 mt-4 rounded-lg bg-gray-600 hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}
