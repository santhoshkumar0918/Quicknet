'use client';

import React from 'react';

function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10">
      {/* Centered Content */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to the Home Page</h1>
        <p className="text-lg text-gray-600 mt-4">This is a sample page with two grids below.</p>
      </div>

      {/* Two Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
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
    </div>
  );
}

export default Page;
