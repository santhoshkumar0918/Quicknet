"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PlaceYourBetPage() {
  const router = useRouter();
  const [matchName, setMatchName] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<string | null>(null);

  useEffect(() => {
    if (router.query) {
      setMatchName(router.query.matchName as string);
      setBetAmount(router.query.betAmount as string);
    }
  }, [router.query]);

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Bet Placed Successfully!</h1>
        <p className="mb-2">
          <strong>Match:</strong> {matchName || "Unknown"}
        </p>
        <p className="mb-4">
          <strong>Bet Amount:</strong> {betAmount || "Unknown"} tokens
        </p>
        <button
          onClick={handleBackToHome}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-2.5 rounded-full hover:from-purple-700 hover:to-indigo-800 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
