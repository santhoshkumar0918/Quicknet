'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false); // Placeholder for wallet connection state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (link: string) => setHoveredLink(link);
  const handleMouseLeave = () => setHoveredLink(null);

  const handleConnectWallet = () => {
    // Placeholder for wallet connection logic
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[11vh] bg-gray-950 bg-opacity-60 backdrop-blur-lg shadow-lg z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
          {/* Logo Positioned at the Left Corner */}
          <div className="flex items-center">
            <a href="/" className="hover:opacity-80 transition flex items-center">
              <Image
                src="/images/quicklogo.jpeg"
                alt="AI Market Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </a>
          </div>

          {/* Desktop Navigation Centered */}
          <nav className="hidden md:flex space-x-8 mx-auto">
            <div
              onMouseEnter={() => handleMouseEnter('home')}
              onMouseLeave={handleMouseLeave}
              className="relative flex items-center"
            >
              <Link href="/" className="text-gray-300 hover:text-white transition duration-300 text-lg">
                Home
              </Link>
              {hoveredLink === 'home' && (
                <motion.div
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                />
              )}
            </div>

            <div
              onMouseEnter={() => handleMouseEnter('my-bets')}
              onMouseLeave={handleMouseLeave}
              className="relative flex items-center"
            >
              <Link href="/my-bets" className="text-gray-300 hover:text-white transition duration-300 text-lg">
                My Bets
              </Link>
              {hoveredLink === 'my-bets' && (
                <motion.div
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-purple-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                />
              )}
            </div>
          </nav>

          {/* Right Corner Buttons */}
          <div className="flex space-x-4 items-center">
            <Link
              href="/signin"
              className="text-gray-300 hover:text-white transition duration-300 text-lg"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-lg"
            >
              Sign Up
            </Link>
            <button
              onClick={handleConnectWallet}
              className="text-gray-300 hover:text-white transition duration-300 text-lg border-2 border-gray-300 px-4 py-2 rounded-full"
            >
              {isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
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
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden absolute top-[11vh] left-0 w-full bg-gray-950 bg-opacity-80 backdrop-blur-lg shadow-lg ${!isOpen ? 'hidden' : ''}`}
        >
          <div className="space-y-2">
            <div
              onMouseEnter={() => handleMouseEnter('home')}
              onMouseLeave={handleMouseLeave}
              className="relative flex items-center"
            >
              <Link
                href="/"
                onClick={toggleMenu}
                className="block py-3 px-6 text-gray-300 hover:text-white transition hover:bg-black/40"
              >
                Home
              </Link>
              {hoveredLink === 'home' && (
                <motion.div
                  className="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                />
              )}
            </div>

            <div
              onMouseEnter={() => handleMouseEnter('my-bets')}
              onMouseLeave={handleMouseLeave}
              className="relative flex items-center"
            >
              <Link
                href="/my-bets"
                onClick={toggleMenu}
                className="block py-3 px-6 text-gray-300 hover:text-white transition hover:bg-black/40"
              >
                My Bets
              </Link>
              {hoveredLink === 'my-bets' && (
                <motion.div
                  className="absolute left-0 right-0 bottom-0 h-[1px] bg-purple-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                />
              )}
            </div>
          </div>
        </motion.nav>
      </header>

      {/* Spacer for header height */}
      <div className="w-full h-[2px] mt-[11vh] bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
    </>
  );
}
