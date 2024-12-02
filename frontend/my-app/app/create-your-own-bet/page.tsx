// "use client";

// import React, { useState } from "react";
// import Header from "../components/Header";

// function Page() {
//   // State to store user input
//   const [prompt, setPrompt] = useState("");
//   const [messages, setMessages] = useState<string[]>([]);

//   // Handle input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPrompt(e.target.value);
//   };

//   // Handle send button click
//   const handleSend = () => {
//     if (prompt.trim() !== "") {
//       // Add the prompt to messages array
//       setMessages([...messages, prompt]);
//       // Clear the input after sending
//       setPrompt("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <div className="flex-grow flex flex-col items-center justify-center px-4">
//         {/* Prompt Box */}
//         <div className="w-full max-w-4xl flex items-center h-[16vh] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-4 rounded-lg shadow-lg mb-4">
//           <input
//             type="text"
//             value={prompt}
//             onChange={handleInputChange}
//             placeholder="Type your prompt here..."
//             className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
//           />
//           <button
//             onClick={handleSend}
//             className="ml-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300"
//           >
//             Send
//           </button>
//         </div>

//         {/* Display Sent Prompts */}
//         <div className="w-full max-w-4xl bg-gray-800 p-4 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">Sent Prompts:</h2>
//           <div className="space-y-2">
//             {messages.length === 0 ? (
//               <p className="text-gray-400">No prompts sent yet.</p>
//             ) : (
//               messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className="p-2 bg-gray-700 rounded-lg shadow-sm"
//                 >
//                   <p>{msg}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
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

  const prompts = [
    "easy",
    "ordinary",
    "impossible",
  ];

  const handleSend = (prompt: string) => {
    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: prompt }]);

    setIsLoading(true);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Loading..." }, 
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Chat UI */}
      <div className="flex-grow flex flex-col items-center justify-start px-4 py-8">
        <div className="w-full max-w-2xl mt-16 flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-3 rounded-xl shadow-md ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs md:max-w-md px-4 py-3 rounded-xl shadow-md bg-gray-700 text-white animate-pulse">
                AI is thinking...
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
            className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Page;
