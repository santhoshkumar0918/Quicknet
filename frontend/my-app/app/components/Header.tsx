
'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { RpcProvider } from 'starknet';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (link: string) => setHoveredLink(link);
  const handleMouseLeave = () => setHoveredLink(null);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const starknet = (window as any).starknet;
      if (!starknet) {
        setError('No StarkNet wallet detected. Please install Argent X or a compatible wallet.');
        setIsConnecting(false);
        return;
      }

      const connection = await starknet.enable({
        dappName: 'QuickNet',
      });

      if (!connection || connection.length === 0) {
        setError('Connection failed. Please check your wallet and try again.');
        setIsConnecting(false);
        return;
      }

      const address = connection[0];
      const provider = new RpcProvider({
        nodeUrl: 'https://starknet-mainnet.public.blastapi.io',
      });

      try {
        await provider.getBlock();
        setWalletAddress(address);
      } catch {
        setError('Could not validate wallet connection.');
      }
    } catch (connectError) {
      console.error('Wallet Connection Error:', connectError);
      setError('An unexpected error occurred while connecting.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectWallet = () => {
    setWalletAddress(null);
    setError(null);
    setDropdownOpen(false); 
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[11vh] bg-gray-950 bg-opacity-60 backdrop-blur-lg shadow-lg z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
          {/* Logo Positioned at the Left Corner */}
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition flex items-center">
              <Image
                src="/images/quicklogo.jpeg"
                alt="QuickNet Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </Link>
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
          <div className="flex items-center space-x-4">
            {error && <span className="text-red-500">{error}</span>}
            <button
              onClick={walletAddress ? toggleDropdown : handleConnectWallet}
              disabled={isConnecting}
              className={`text-gray-300 hover:text-white transition duration-300 text-lg border-2 border-gray-300 px-4 py-2 rounded-full ${
                isConnecting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isConnecting
                ? 'Connecting...'
                : walletAddress
                ? `${walletAddress.slice(0, 6)}...`
                : 'Connect Wallet'}
            </button>
            {/* Wallet Dropdown Menu */}
            {walletAddress && dropdownOpen && (
              <div className="absolute top-[11vh] right-4 mt-2 bg-gray-950 bg-opacity-80 text-white rounded-lg shadow-lg p-4 space-y-2">
                <div className="text-sm">
                  <strong>Wallet Address:</strong> {walletAddress}
                </div>
                <button
                  onClick={handleDisconnectWallet}
                  className="w-full text-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                >
                  Disconnect
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(walletAddress!)}
                  className="w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Copy Address
                </button>
              </div>
            )}
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

        {/* Fixed Gradient Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
      </header>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden absolute top-[11vh] left-0 w-full bg-gray-950 bg-opacity-80 backdrop-blur-lg shadow-lg ${!isOpen ? 'hidden' : ''}`}
      >
        <div className="space-y-2">
          <Link
            href="/"
            onClick={toggleMenu}
            className="block py-3 px-6 text-gray-300 hover:text-white transition hover:bg-black/40"
          >
            Home
          </Link>
        </div>
      </motion.nav>
    </>
  );
}
