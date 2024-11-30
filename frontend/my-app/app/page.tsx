'use client';

import Header from "./components/Header"

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

        {/* Two Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-200 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Grid 1</h2>
            <p className="text-gray-600 mt-4">
              This is the first grid. You can add any content here such as text, images, or even cards.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Grid 2</h2>
            <p className="text-gray-600 mt-4">
              This is the second grid. It can contain similar or different content from the first grid.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
