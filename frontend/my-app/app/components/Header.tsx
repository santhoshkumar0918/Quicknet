'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-[11vh] bg-gray-950 bg-opacity-60 backdrop-blur-lg shadow-lg z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        {/* Logo Positioned at the Left Corner */}
        <div className="flex items-center">
          <Link href="/" className="hover:opacity-80 transition flex items-center">
            <Image
              src="/images/quicklogo.jpeg"
              alt="AI Market Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-white text-2xl font-bold ml-2">AI Market</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavItem href="/" text="Home" />
          <NavItem href="/my-bets" text="My Bets" />
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
            className="md:hidden absolute top-[11vh] left-0 w-full bg-gray-950 bg-opacity-80 backdrop-blur-lg shadow-lg"
          >
            <div className="space-y-2">
              <NavItem href="/" text="Home" mobile />
              <NavItem href="/my-bets" text="My Bets" mobile />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

// Component for Navigation Items
function NavItem({ href, text, mobile = false }: { href: string; text: string; mobile?: boolean }) {
  return (
    <Link
      href={href}
      className={`relative text-gray-300 hover:text-white transition ${
        mobile ? 'block py-3 px-6 hover:bg-black/40' : 'inline-block'
      }`}
    >
      {text}
      <span
        className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-400 transition-all duration-300 ease-in-out hover:w-full"
      ></span>
    </Link>
  );
}
