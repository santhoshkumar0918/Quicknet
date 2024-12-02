"use client";

import React, { useState } from "react";
import Header from "../components/Header";

function Page() {
  // State to store user input
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  // Handle send button click
  const handleSend = () => {
    if (prompt.trim() !== "") {
      // Add the prompt to messages array
      setMessages([...messages, prompt]);
      // Clear the input after sending
      setPrompt("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        {/* Prompt Box */}
        <div className="w-full max-w-4xl flex items-center h-[16vh] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-4 rounded-lg shadow-lg mb-4">
          <input
            type="text"
            value={prompt}
            onChange={handleInputChange}
            placeholder="Type your prompt here..."
            className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="ml-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300"
          >
            Send
          </button>
        </div>

        {/* Display Sent Prompts */}
        <div className="w-full max-w-4xl bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Sent Prompts:</h2>
          <div className="space-y-2">
            {messages.length === 0 ? (
              <p className="text-gray-400">No prompts sent yet.</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-700 rounded-lg shadow-sm"
                >
                  <p>{msg}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
