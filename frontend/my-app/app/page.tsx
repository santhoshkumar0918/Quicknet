// src/app/page.tsx
'use client';

import Header from "./components/Header"

export default function HomePage() {
  return (
    <>
      <Header /> 

      {/* Main Content */}
      <main className="mt-[10vh] p-4">
        <h1 className="text-4xl font-bold text-center">Welcome to AI Market</h1>
        <p className="text-center text-gray-500 mt-4">
          Discover the future of AI-powered solutions.
        </p>
      </main>
    </>
  );
}
