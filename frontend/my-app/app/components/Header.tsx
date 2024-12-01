
'use client';

import { useState, useEffect, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { BiChevronDown } from 'react-icons/bi';
import { FiCopy, FiLogOut } from 'react-icons/fi';
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

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
    setDropdownOpen(false);
    setError(null);
  };

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      alert('Address copied to clipboard!');
      setDropdownOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[11vh] bg-gray-950 bg-opacity-60 backdrop-blur-lg shadow-lg z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
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

          <nav className="hidden md:flex space-x-8 mx-auto">
            {/* Navigation Links */}
            <div
              onMouseEnter={() => handleMouseEnter('home')}
              onMouseLeave={handleMouseLeave}
              className="relative flex items-center"
            >
              <Link href="/" className="text-gray-300 hover:text-white transition duration-300 text-lg">
                Home
              </Link>
            </div>
          </nav>

          <div className="relative" ref={dropdownRef}>
            {error && <span className="text-red-500">{error}</span>}
            <button
              onClick={walletAddress ? () => setDropdownOpen(!dropdownOpen) : handleConnectWallet}
              disabled={isConnecting}
              className={`
                text-gray-300 hover:text-white transition duration-300 text-lg border-2 border-gray-300 px-4 py-2 rounded-full flex items-center
                ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isConnecting ? (
                'Connecting...'
              ) : walletAddress ? (
                <>
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  <BiChevronDown className="w-5 h-5 ml-2" />
                </>
              ) : (
                'Connect Wallet'
              )}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && walletAddress && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10"
              >
                <ul className="py-2">
                  <li
                    onClick={handleCopyAddress}
                    className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                  >
                    <FiCopy className="w-5 h-5 mr-2" />
                    Copy Address
                  </li>
                  <li
                    onClick={handleDisconnectWallet}
                    className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                  >
                    <FiLogOut className="w-5 h-5 mr-2" />
                    Disconnect
                  </li>
                </ul>
              </motion.div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none transition"
            >
              {isOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
