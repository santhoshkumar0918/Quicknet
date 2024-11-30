'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-[10vh] bg-black bg-opacity-60 backdrop-blur-lg shadow-lg z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        {/* Logo */}
        <div className="text-white text-2xl font-bold tracking-wide">
          <a href="/" className="hover:text-gray-300 transition">
            AI Market
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          
          <a href="/" className="text-gray-300 hover:text-white transition">
            Market
          </a>
          <a href="/my-bets" className="text-gray-300 hover:text-white transition">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-300 focus:outline-none transition"
          >
            {isOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-[10vh] left-0 w-full bg-black bg-opacity-80 backdrop-blur-lg shadow-lg"
          >
            <div className="space-y-2">
              <a
                href="/"
                className="block py-3 px-6 text-gray-300 hover:text-white transition hover:bg-black/40"
              >
                Home
              </a>
              <a
                href="/about"
                className="block py-3 px-6 text-gray-300 hover:text-white transition hover:bg-black/40"
              >
                About
              </a>
              <a
                href="/market"
                className="block py-3 px-6 text-gray-300 hover:text-white transition hover:bg-black/40"
              >
                Market
              </a>
              <a
                href="/contact"
                className="block py-3 px-6 text-gray-300 hover:text-white transition hover:bg-black/40"
              >
                Contact
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
