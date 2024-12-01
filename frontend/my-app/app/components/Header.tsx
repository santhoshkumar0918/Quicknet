
// 'use client';

// import { useState, useEffect } from 'react';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
// import { RpcProvider } from 'starknet';
// import { ChevronDown, Copy, LogOut } from 'lucide-react';
// import { DynamicWidget } from '@dynamic-labs/sdk-react-core';



// interface ToastProps {
//   message: string;
//   type?: 'success' | 'error' | 'info';  
//   onClose: () => void;
// }

// const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 2000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgColor = type === 'success'
//     ? 'bg-green-500'
//     : type === 'error'
//     ? 'bg-red-500'
//     : 'bg-blue-500';

//   return (
//     <div
//       className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 animate-slide-in`}
//     >
//       {message}
//     </div>
//   );
// };

// interface HeaderState {
//   isOpen: boolean;
//   hoveredLink: string | null;
//   walletAddress: string | null;
//   isConnecting: boolean;
//   error: string | null;
//   dropdownOpen: boolean;
//   toast: { message: string; type?: string } | null;
// }

// export default function Header() {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [hoveredLink, setHoveredLink] = useState<string | null>(null);
//   const [walletAddress, setWalletAddress] = useState<string | null>(null);
//   const [isConnecting, setIsConnecting] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
//   const [toast, setToast] = useState<{ message: string; type?:'success' | 'error' | 'info' } | null>(null);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleMouseEnter = (link: string) => setHoveredLink(link);
//   const handleMouseLeave = () => setHoveredLink(null);

//   const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 2000);
//   };

//   const handleConnectWallet = async () => {
//     setIsConnecting(true);
//     setError(null);

//     try {
//       const starknet = (window as any).starknet;
//       if (!starknet) {
//         setError('No StarkNet wallet detected. Please install Argent X or a compatible wallet.');
//         setIsConnecting(false);
//         return;
//       }

//       const connection = await starknet.enable({
//         dappName: 'QuickNet',
//       });

//       if (!connection || connection.length === 0) {
//         setError('Connection failed. Please check your wallet and try again.');
//         setIsConnecting(false);
//         return;
//       }

//       const address = connection[0];
//       const provider = new RpcProvider({
//         nodeUrl: 'https://starknet-mainnet.public.blastapi.io',
//       });

//       try {
//         await provider.getBlock();
//         setWalletAddress(address);
//         showToast('Wallet connected successfully');
//       } catch {
//         setError('Could not validate wallet connection.');
//       }
//     } catch (connectError) {
//       console.error('Wallet Connection Error:', connectError);
//       setError('An unexpected error occurred while connecting.');
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const handleDisconnectWallet = () => {
//     setWalletAddress(null);
//     setError(null);
//     setDropdownOpen(false);
//     showToast('Wallet disconnected');
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const copyWalletAddress = () => {
//     if (walletAddress) {
//       navigator.clipboard.writeText(walletAddress);
//       showToast('Address copied');
//       setDropdownOpen(false);
//     }
//   };

//   return (
//     <>
//       <header className="fixed top-0 left-0 w-full h-[11vh] bg-gray-950 bg-opacity-60 backdrop-blur-lg shadow-lg z-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
//           {/* Logo Positioned at the Left Corner */}
//           <div className="flex items-center">
//             <Link href="/" className="hover:opacity-80 transition flex items-center">
//               <Image
//                 src="/images/quicklogo.jpeg"
//                 alt="QuickNet Logo"
//                 width={80}
//                 height={80}
//                 className="rounded-full"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation Centered */}
//           <nav className="hidden md:flex space-x-8 ml-16">            
//             <div
//               onMouseEnter={() => handleMouseEnter('home')}
//               onMouseLeave={handleMouseLeave}
//               className="relative flex items-center"
//             >
//               <Link href="/" className="text-gray-300 hover:text-white transition duration-300 text-lg">
//                 Home
//               </Link>
//             </div>
//             <div
//               onMouseEnter={() => handleMouseEnter('my-bets')}
//               onMouseLeave={handleMouseLeave}
//               className="relative flex items-center"
//             >
//               <Link href="/my-bets" className="text-gray-300 hover:text-white transition duration-300 text-lg">
//                 My Bets
//               </Link>
//             </div>
//           </nav>

//           {/* Right Corner with DynamicWidget and Connect Wallet Button */}
//           <div className="flex items-center space-x-4">
//             <DynamicWidget />
//            </div>

//           {/* Mobile Menu Toggle */}
//           <div className="md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="text-white hover:text-gray-300 focus:outline-none transition"
//             >
//               {isOpen ? (
//                 <XMarkIcon className="w-7 h-7" />
//               ) : (
//                 <Bars3Icon className="w-7 h-7" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Fixed Gradient Line */}
//         <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
//       </header>

//       {/* Toast Notification */}
//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//     </>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { RpcProvider } from 'starknet';
import { ChevronDown, Copy, LogOut } from 'lucide-react';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
      ? 'bg-red-500'
      : 'bg-blue-500';

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 animate-slide-in`}
    >
      {message}
    </div>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (link: string) => setHoveredLink(link);
  const handleMouseLeave = () => setHoveredLink(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
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
          <nav className="hidden md:flex space-x-8 ml-16">
            <div
              onMouseEnter={() => handleMouseEnter('home')}
              onMouseLeave={handleMouseLeave}
              className="relative flex items-center"
            >
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition duration-300 text-lg relative"
              >
                Home
              </Link>
              {hoveredLink === 'home' && (
                <motion.div
                  className="absolute bottom-[-4px] left-0 h-[2px] w-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.3 }}
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
                className="text-gray-300 hover:text-white transition duration-300 text-lg relative"
              >
                My Bets
              </Link>
              {hoveredLink === 'my-bets' && (
                <motion.div
                  className="absolute bottom-[-4px] left-0 h-[2px] w-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </nav>

          {/* Right Corner with DynamicWidget and Connect Wallet Button */}
          <div className="flex items-center space-x-4">
            <DynamicWidget />
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

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
