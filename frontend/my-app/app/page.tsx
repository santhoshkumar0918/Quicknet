// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import Header from "./components/Header";

// interface Match {
//   id: string;
//   name: string;
//   matchType: string;
//   status: string;
//   venue: string;
//   date: string;
//   dateTimeGMT: string;
//   score: string;
//   teams: string[];
// }

// export default function HomePage() {
//   const [activeTab, setActiveTab] = useState("international");
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [votes, setVotes] = useState<
//     Record<string, { yes: number; no: number }>
//   >({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const apiUrl = "/api/cricket"; // Calling your internal API route
//         console.log("Fetching matches from:", apiUrl);

//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP Error: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Fetched match data:", data);
//         setMatches(data.matches); // Assuming the response contains a `matches` field
//       } catch (error: any) {
//         console.error("Error fetching matches:", {
//           message: error.message,
//           stack: error.stack,
//         });
//         setError("Failed to fetch matches. Please try again later.");
//       }
//     };

//     fetchMatches();
//   }, []);

//   const handleVote = (matchId: string, voteType: "yes" | "no") => {
//     setVotes((prevVotes) => {
//       const updatedVotes = { ...prevVotes };
//       updatedVotes[matchId] = updatedVotes[matchId] || { yes: 0, no: 0 };
//       updatedVotes[matchId][voteType]++;
//       return updatedVotes;
//     });
//   };

//   const calculatePercentage = (matchId: string) => {
//     const { yes, no } = votes[matchId] || { yes: 0, no: 0 };
//     const totalVotes = yes + no;
//     if (totalVotes === 0) return { yes: 0, no: 0 };
//     return {
//       yes: Math.round((yes / totalVotes) * 100),
//       no: Math.round((no / totalVotes) * 100),
//     };
//   };

//   const internationalMatches = matches.filter(
//     (match) => match.matchType === "odi" || match.matchType === "t20"
//   );
//   const premierLeagueMatches = matches.filter(
//     (match) => match.matchType === "ipl"
//   );

//   const handleButtonClick = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       // Redirect or do some action here after the loading
//     }, 2000); // Simulate loading for 2 seconds
//   };

//   return (
//     <>
//       <Header />
//       <main className="mt-[10vh] p-4 bg-gray-950 sm:p-6 lg:p-8">
//         {/* Display error if any */}
//         {error && <div className="text-red-500">{error}</div>}

//         {/* Hero Section with Background Image */}
//         <div className="flex flex-col items-center justify-center mb-8">
//           <div className="relative w-full h-[30vh] sm:h-[40vh] lg:h-[50vh]">
//             <Image
//               src="/images/cricket.webp"
//               alt="Cricket Betting Market"
//               layout="fill"
//               objectFit="cover"
//               className="rounded-lg h-[12vh] w-full shadow-lg"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-4 sm:px-6">
//               <h1 className="text-4xl sm:text-3xl font-bold text-white mb-4 text-center">
//                 Welcome to Cricket Betting Market
//               </h1>
//               <div className="flex space-x-4">
//                 <Link href="/create-your-own-bet">
//                   <motion.button
//                     onClick={handleButtonClick}
//                     className={`relative px-6 py-3 rounded-full border-2 border-white text-white font-semibold transition duration-300 ${
//                       isLoading ? "pointer-events-none" : ""
//                     }`}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <motion.div
//                         className="absolute inset-0 border-2 border-white rounded-full animate-spin"
//                         initial={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
//                         animate={{ borderColor: "rgba(255, 255, 255, 1)" }}
//                         transition={{
//                           duration: 1,
//                           repeat: Infinity,
//                           ease: "linear",
//                         }}
//                       />
//                     ) : (
//                       "Create Your Own Bet"
//                     )}
//                     <span className="relative z-10">
//                       {isLoading ? "Loading..." : ""}
//                     </span>
//                   </motion.button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <div className="flex justify-center mb-6">
//           <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-full p-2 flex space-x-4 border-2 border-white">
//             <button
//               onClick={() => setActiveTab("international")}
//               className={`px-6 py-2 rounded-full transition-transform transform hover:scale-105 border-2 ${
//                 activeTab === "international"
//                   ? "bg-gradient-to-r from-purple-700 to-indigo-600 text-white border-white shadow-lg"
//                   : "text-gray-300 hover:text-white border-transparent hover:border-purple-600"
//               }`}
//             >
//               International Matchups
//             </button>
//             <button
//               onClick={() => setActiveTab("premierLeague")}
//               className={`px-6 py-2 rounded-full transition-transform transform hover:scale-105 border-2 ${
//                 activeTab === "premierLeague"
//                   ? "bg-gradient-to-r from-purple-700 to-indigo-600 text-white border-white shadow-lg"
//                   : "text-gray-300 hover:text-white border-transparent hover:border-purple-600"
//               }`}
//             >
//               Premier League
//             </button>
//           </div>
//         </div>

//         {/* Tab Content */}
//         <section className="flex justify-center">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-4 sm:px-6 lg:px-8">
//             {(activeTab === "international"
//               ? internationalMatches
//               : premierLeagueMatches
//             ).map((match) => (
//               <div
//                 key={match.id}
//                 className="relative bg-gradient-to-tr from-black via-purple-800 to-indigo-700 rounded-lg p-[1px] hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-purple-600"
//               >
//                 <div className="bg-gray-900 text-white rounded-lg p-4">
//                   <h2 className="text-xl sm:text-2xl font-bold text-center text-gradient">
//                     {match.name}
//                   </h2>

//                   <div className="flex justify-between items-center mt-4">
//                     <div>
//                       <span className="text-sm text-gray-300">
//                         {match.date} | {match.dateTimeGMT}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-sm text-gray-300">
//                         {match.score === "N/A"
//                           ? "Match not started"
//                           : match.score}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center mt-4">
//                     <button
//                       onClick={() => handleVote(match.id, "yes")}
//                       className={`w-[130px] sm:w-[150px] text-center py-2 rounded-full text-white font-bold ${
//                         votes[match.id]?.yes > 0
//                           ? "bg-green-400"
//                           : "bg-gray-600"
//                       }`}
//                     >
//                       Yes ({calculatePercentage(match.id).yes}%)
//                     </button>
//                     <button
//                       onClick={() => handleVote(match.id, "no")}
//                       className={`w-[130px] sm:w-[150px] text-center py-2 rounded-full text-white font-bold ${
//                         votes[match.id]?.no > 0 ? "bg-red-400" : "bg-gray-600"
//                       }`}
//                     >
//                       No ({calculatePercentage(match.id).no}%)
//                     </button>
//                   </div>

//                   <div className="mt-6 text-center">
//                     <Link href="/place-your-bet">
//                       <motion.button
//                         className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-2.5 rounded-full hover:from-purple-700 hover:to-indigo-800 transition duration-300"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         Place Bet
//                       </motion.button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import { motion } from "framer-motion";

interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  score: string;
  teams: string[];
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("international");
  const [votes, setVotes] = useState<Record<string, { yes: number; no: number }>>({});
  const [isLoading, setIsLoading] = useState(false);

  

  const mockMatches: Match[] = [
    { id: "1", name: "India vs Australia", matchType: "odi", status: "Upcoming", venue: "Delhi", date: "2024-12-15", dateTimeGMT: "15:30 GMT", score: "N/A", teams: [] },
    { id: "2", name: "England vs Pakistan", matchType: "t20", status: "Live", venue: "London", date: "2024-12-16", dateTimeGMT: "18:00 GMT", score: "140/3", teams: [] },
    { id: "3", name: "Mumbai Indians vs CSK", matchType: "ipl", status: "Upcoming", venue: "Mumbai", date: "2024-12-17", dateTimeGMT: "19:00 GMT", score: "N/A", teams: [] },
    { id: "4", name: "South Africa vs New Zealand", matchType: "odi", status: "Live", venue: "Cape Town", date: "2024-12-18", dateTimeGMT: "13:30 GMT", score: "220/6", teams: [] },
    { id: "5", name: "RCB vs KKR", matchType: "ipl", status: "Upcoming", venue: "Bangalore", date: "2024-12-19", dateTimeGMT: "20:00 GMT", score: "N/A", teams: [] },
    { id: "6", name: "Sri Lanka vs Bangladesh", matchType: "t20", status: "Live", venue: "Colombo", date: "2024-12-20", dateTimeGMT: "16:00 GMT", score: "180/4", teams: [] },
    { id: "7", name: "Delhi Capitals vs Punjab Kings", matchType: "ipl", status: "Upcoming", venue: "Delhi", date: "2024-12-21", dateTimeGMT: "19:00 GMT", score: "N/A", teams: [] },
    { id: "8", name: "Australia vs South Africa", matchType: "odi", status: "Live", venue: "Sydney", date: "2024-12-22", dateTimeGMT: "10:00 GMT", score: "250/7", teams: [] },
    { id: "9", name: "MI vs RCB", matchType: "ipl", status: "Upcoming", venue: "Mumbai", date: "2024-12-23", dateTimeGMT: "20:00 GMT", score: "N/A", teams: [] },
    { id: "10", name: "West Indies vs New Zealand", matchType: "t20", status: "Upcoming", venue: "Bridgetown", date: "2024-12-24", dateTimeGMT: "14:00 GMT", score: "N/A", teams: [] },
    { id: "11", name: "Australia vs Sri Lanka", matchType: "odi", status: "Upcoming", venue: "Melbourne", date: "2024-12-25", dateTimeGMT: "13:00 GMT", score: "N/A", teams: [] },
    { id: "12", name: "Bangladesh vs Pakistan", matchType: "ipl", status: "Upcoming", venue: "Dhaka", date: "2024-12-26", dateTimeGMT: "19:30 GMT", score: "N/A", teams: [] },
    { id: "13", name: "India vs South Africa", matchType: "t20", status: "Live", venue: "Chennai", date: "2024-12-27", dateTimeGMT: "15:00 GMT", score: "150/4", teams: [] },
    { id: "14", name: "Pakistan vs England", matchType: "ipl", status: "Upcoming", venue: "Karachi", date: "2024-12-28", dateTimeGMT: "18:30 GMT", score: "N/A", teams: [] },
    { id: "15", name: "CSK vs KKR", matchType: "ipl", status: "Upcoming", venue: "Chennai", date: "2024-12-29", dateTimeGMT: "20:00 GMT", score: "N/A", teams: [] },
  ];

  useEffect(() => {
    const initialVotes = mockMatches.reduce<Record<string, { yes: number; no: number }>>((acc, match) => {
      acc[match.id] = { yes: 0, no: 0 };
      return acc;
    }, {});
    setVotes(initialVotes);
  }, []); 
  

  const handleVote = (matchId: string, voteType: "yes" | "no") => {
    setVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };
      updatedVotes[matchId][voteType]++;
      return updatedVotes;
    });
  };

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const calculatePercentage = (matchId: string) => {
    const { yes, no } = votes[matchId] || { yes: 0, no: 0 };
    const totalVotes = yes + no;
    if (totalVotes === 0) return { yes: 0, no: 0 };
    return {
      yes: Math.round((yes / totalVotes) * 100),
      no: Math.round((no / totalVotes) * 100),
    };
  };
  

  const internationalMatches = mockMatches.filter((match) => match.matchType === "odi" || match.matchType === "t20");
  const premierLeagueMatches = mockMatches.filter((match) => match.matchType === "ipl");

  return (
    <>
       <Header />
       <main className="mt-[10vh] p-4 bg-gray-950 sm:p-6 lg:p-8">
         <div className="flex flex-col items-center justify-center mb-8">
           <div className="relative  w-full h-[30vh] sm:h-[40vh] lg:h-[50vh]">
             <Image
               src="/images/cricket.webp"
               alt="Cricket Betting Market"
               layout="fill"
               objectFit="cover"
               className="rounded-lg h-[12vh] w-full shadow-lg"
             />
             <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-4 sm:px-6">
               <h1 className="text-4xl sm:text-3xl font-bold text-white mb-4 text-center">
                 Welcome to Cricket Betting Market
               </h1>
               <div className="flex space-x-4">
                 <Link href="/create-your-own-bet">
                   <motion.button
                     onClick={handleButtonClick}
                     className={`relative px-6 py-3 rounded-full border-2 border-white text-white font-semibold transition duration-300 ${
                       isLoading ? "pointer-events-none" : ""
                     }`}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     disabled={isLoading}
                   >
                     {isLoading ? (
                       <motion.div
                         className="absolute inset-0 border-2 border-white rounded-full animate-spin"
                         initial={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
                         animate={{ borderColor: "rgba(255, 255, 255, 1)" }}
                         transition={{
                           duration: 1,
                           repeat: Infinity,
                           ease: "linear",
                         }}
                       />
                     ) : (
                       "Create Your Own Bet"
                     )}
                     <span className="relative z-10">
                       {isLoading ? "Loading..." : ""}
                     </span>
                   </motion.button>
                 </Link>
               </div>
             </div>
           </div>
       </div>

        {/* Tabs Section */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-full p-2 flex space-x-4 border-2 border-white">
            <button
              onClick={() => setActiveTab("international")}
              className={`px-6 py-2 rounded-full transition-transform transform hover:scale-105 border-2 ${
                activeTab === "international"
                  ? "bg-gradient-to-r from-purple-700 to-indigo-600 text-white border-white shadow-lg"
                  : "text-gray-300 hover:text-white border-transparent hover:border-purple-600"
              }`}
            >
              International Matchups
            </button>
            <button
              onClick={() => setActiveTab("premierLeague")}
              className={`px-6 py-2 rounded-full transition-transform transform hover:scale-105 border-2 ${
                activeTab === "premierLeague"
                  ? "bg-gradient-to-r from-purple-700 to-indigo-600 text-white border-white shadow-lg"
                  : "text-gray-300 hover:text-white border-transparent hover:border-purple-600"
              }`}
            >
              Premier League
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <section className="flex  justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-4 sm:px-6 lg:px-8">
            {(activeTab === "international" ? internationalMatches : premierLeagueMatches).map((match) => (
              <div
                key={match.id}
                className="relative bg-gradient-to-tr from-black via-purple-800 to-indigo-700 rounded-lg p-[1px] hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-purple-600"
              >
                <div className="bg-gray-900 text-white rounded-lg p-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-center text-gradient">{match.name}</h2>

                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <span className="text-sm text-gray-300">{match.date} | {match.dateTimeGMT}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-300">{match.score === "N/A" ? "Match not started" : match.score}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleVote(match.id, "yes")}
                      className={`w-[130px] sm:w-[150px] text-center py-2 rounded-full text-white font-bold ${
                        votes[match.id]?.yes > 0 ? "bg-green-400" : "bg-gray-600"
                      }`}
                    >
                      Yes ({calculatePercentage(match.id).yes}%)
                    </button>
                    <button
                      onClick={() => handleVote(match.id, "no")}
                      className={`w-[130px] sm:w-[150px] text-center py-2 rounded-full text-white font-bold ${
                        votes[match.id]?.no > 0 ? "bg-red-400" : "bg-gray-600"
                      }`}
                    >
                      No ({calculatePercentage(match.id).no}%)
                    </button>
                  </div>

                  <div className="mt-6 text-center">
                    <Link href="/place-your-bet">
                      <motion.button
                        className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-2.5 rounded-full hover:from-purple-700 hover:to-indigo-800 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Place Your Bet
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}