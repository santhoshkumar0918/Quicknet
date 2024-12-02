

// "use client";

// import React, { useState } from "react";
// import Header from "../components/Header";

// function Page() {
//   const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const prompts = [
//     "easy",
//     "ordinary",
//     "impossible",
//   ];

//   const handleSend = (prompt: string) => {
//     setMessages((prevMessages) => [...prevMessages, { sender: "user", text: prompt }]);

//     setIsLoading(true);

//     setTimeout(() => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "ai", text: "Loading..." }, 
//       ]);
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col">
//       {/* Header */}
//       <Header />

//       {/* Chat UI */}
//       <div className="flex-grow flex flex-col items-center justify-start px-4 py-8">
//         <div className="w-full max-w-2xl mt-16 flex flex-col space-y-4">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 msg.sender === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-xs md:max-w-md px-4 py-3 rounded-xl shadow-md ${
//                   msg.sender === "user"
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
//                     : "bg-gray-700 text-white"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}

//           {/* Loading State */}
//           {isLoading && (
//             <div className="flex justify-start">
//               <div className="max-w-xs md:max-w-md px-4 py-3 rounded-xl shadow-md bg-gray-700 text-white animate-pulse">
//                 AI is thinking...
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Prompt Options */}
//       <div className="w-full max-w-2xl fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 rounded-lg shadow-lg flex justify-center items-center space-x-4">
//       {prompts.map((prompt, index) => (
//           <button
//             key={index}
//             onClick={() => handleSend(prompt)}
//             className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300"
//           >
//             {prompt}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Page;
"use client";

import React, { useState } from "react";
import Header from "../components/Header";

function Page() {
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const prompts = ["Easy", "Ordinary", "Impossible"];

  const handleSend = (prompt: string) => {
    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: prompt }]);

    setIsLoading(true);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Loading..." }, // Placeholder for AI response
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col">
      {/* Header */}
      <Header />

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
                  } transition-all duration-500 hover:scale-105`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-[1px] rounded-xl bg-gradient-to-br from-black via-purple-700 to-purple-400">
                <div className="max-w-xs md:max-w-md px-4 py-3 rounded-lg shadow-lg bg-gray-800 text-white">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin cricket-ball w-6 h-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg"></div>
                    <span>AI is thinking...</span>
                  </div>
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
      </div>

      {/* Cricket Ball Loading Animation */}
      <style jsx>{`
        .cricket-ball {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Page;
