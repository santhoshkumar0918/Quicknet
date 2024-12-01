"use client";

import React from "react";
import Header from "../components/Header";

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4">
        {/* Prompt Box */}
        <div className="w-full max-w-4xl flex items-center h-[16vh] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-4 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Type your prompt here..."
            className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          <button className="ml-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
