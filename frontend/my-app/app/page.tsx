'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed h-[10vh] top-0 left-0 w-full bg-black bg-opacity-70 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-white text-2xl font-semibold">
          <a href="/">AI Market</a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-200 hover:text-white transition">
            Home
          </a>
          <a href="/about" className="text-gray-200 hover:text-white transition">
            About
          </a>
          <a href="/market" className="text-gray-200 hover:text-white transition">
            Market
          </a>
          <a href="/contact" className="text-gray-200 hover:text-white transition">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-black bg-opacity-90 backdrop-blur-md">
          <a
            href="/"
            className="block py-2 px-4 text-gray-200 hover:text-white transition"
          >
            Home
          </a>
          <a
            href="/about"
            className="block py-2 px-4 text-gray-200 hover:text-white transition"
          >
            About
          </a>
          <a
            href="/market"
            className="block py-2 px-4 text-gray-200 hover:text-white transition"
          >
            Market
          </a>
          <a
            href="/contact"
            className="block py-2 px-4 text-gray-200 hover:text-white transition"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}