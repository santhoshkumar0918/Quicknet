
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Header from "../components/Header";

// export default function PlaceYourBet() {
//   const router = useRouter();
//   const [betAmount, setBetAmount] = useState("");
//   const [isPlacingBet, setIsPlacingBet] = useState(false);

//   const handlePlaceBet = () => {
//     if (!betAmount) {
//       alert("Please enter a bet amount!");
//       return;
//     }
//     setIsPlacingBet(true);
//     setTimeout(() => {
//       setIsPlacingBet(false);
//       alert(`Bet placed successfully with amount: ${betAmount}`);
//       router.push("/");
//     }, 2000);
//   };

//   useEffect(() => {
//     const element = document.querySelector(".bet-container");
//     if (element) {
//       console.log("Element found:", element);
//       element.classList.add("opacity-100");
//       element.classList.remove("opacity-0");
//     }
//   }, []);

//   return (
//     <>
//     <Header/>
//     <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex items-center justify-center p-6">
//       <div className="bet-container bg-gradient-to-br from-black via-purple-700 to-purple-400 p-[1px] rounded-lg shadow-lg max-w-md w-full">
//         <div className="bg-gray-950 rounded-lg p-8">
//           <h1 className="text-2xl font-bold mb-6 text-center text-purple-400">Place Your Bet</h1>
//           <div className="mb-4">
//             <label htmlFor="betAmount" className="block text-gray-400 mb-2">
//               Enter Bet Amount:
//             </label>
//             <input
//               id="betAmount"
//               type="number"
//               value={betAmount}
//               onChange={(e) => setBetAmount(e.target.value)}
//               className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
//               placeholder="Enter your amount"
//             />
//           </div>
//           <button
//             onClick={handlePlaceBet}
//             disabled={isPlacingBet}
//             className={`w-full py-3 mt-4 rounded-lg font-bold ${
//               isPlacingBet
//                 ? "bg-gray-500 cursor-not-allowed"
//                 : "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
//             } transition-all`}
//           >
//             {isPlacingBet ? "Placing Bet..." : "Place Bet"}
//           </button>
//           <button
//             onClick={() => router.push("/")}
//             className="w-full py-3 mt-4 rounded-lg bg-gray-600 hover:bg-gray-700 transition-all"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </main>
//     </>
//   );
// }
"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import { useDynamicContext } from "@argentx/providers";
import { ethers } from "ethers";

function Page() {
  const { connect, account, disconnect } = useDynamicContext();
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const prompts = ["Easy", "Ordinary", "Impossible"];

  const handleSend = (prompt: string) => {
    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: prompt }]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Loading..." },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePayment = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const recipientAddress = "0x123456789abcdef..."; 
      const amount = ethers.utils.parseEther("0.01");
      const transaction = {
        to: recipientAddress,
        value: amount.toHexString(),
      };

      const signer = account.getSigner(); 
      const tx = await signer.sendTransaction(transaction);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: "Payment Sent!" },
        { sender: "ai", text: `Transaction Hash: ${tx.hash}` },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Payment Failed! Please try again." },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col">
      <Header />

      <div className="flex justify-center p-4">
        {account ? (
          <button
            onClick={disconnect}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Disconnect Wallet
          </button>
        ) : (
          <button
            onClick={connect}
            className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {/* Chat UI */}
      <div className="flex-grow flex flex-col items-center justify-start px-4 py-8">
        <div className="w-full max-w-2xl mt-16 flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-[1px] rounded-xl ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-black via-gray-300 to-gray-100"
                    : "bg-gradient-to-br from-black via-purple-700 to-purple-400"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-3 rounded-lg shadow-lg ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-purple-800 to-indigo-800 text-white"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="p-[1px] rounded-xl bg-gradient-to-br from-black via-purple-700 to-purple-400">
                <div className="max-w-xs md:max-w-md px-4 py-3 rounded-lg shadow-lg bg-gray-800 text-white animate-pulse">
                  AI is thinking...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prompt Options */}
      <div className="w-full max-w-2xl fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 rounded-lg shadow-lg flex justify-center items-center space-x-4">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handleSend(prompt)}
            className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            {prompt}
          </button>
        ))}
        <button
          onClick={handlePayment}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Pay with Argent X
        </button>
      </div>
    </div>
  );
}

export default Page;
