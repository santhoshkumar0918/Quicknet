
// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import Header from "./components/Header";

// interface Match {
//   id: string;
//   name: string;
//   matchType: string;
//   status: string;
//   venue: string;
//   date: string;
//   dateTimeGMT: string;
//   teams: string[];
//   series_id: string;
//   fantasyEnabled: boolean;
//   bbbEnabled: boolean;
//   hasSquad: boolean;
//   matchStarted: boolean;
//   matchEnded: boolean;
// }

// export default function HomePage() {
//   const [activeTab, setActiveTab] = useState("international");
//   const [matches, setMatches] = useState<Match[]>([]);

//   const apiKey = process.env.NEXT_PUBLIC_API_KEY;
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//   const url = `${baseUrl}/matches?apikey=${apiKey}`;

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await axios.get(url, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         setMatches(response.data.data);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchMatches();
//   }, [url]);

//   const internationalMatches = matches.filter(
//     (match) => match.matchType === "odi"
//   );
//   const premierLeagueMatches = matches.filter(
//     (match) => match.matchType === "ipl"
//   );

//   return (
//     <>
//       <Header />
//       <main className="mt-[10vh] p-4">
//         <div className="flex flex-col items-center justify-center mb-10">
//           <div className="relative w-full h-[42vh]">
//             <Image
//               src="/images/cricket.webp"
//               alt="Cricket Betting Market"
//               layout="fill"
//               objectFit="cover"
//               className="rounded-lg shadow-lg"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
//               <h1 className="text-4xl font-bold text-white mb-4">
//                 Welcome to Cricket Betting Market
//               </h1>
//               <div className="flex space-x-4">
//                 <Link href="/create-your-own-bet">
//                   <button
//                     className="relative px-5 py-2.5 rounded-full text-white font-bold bg-opacity-10 bg-black backdrop-blur-md overflow-hidden"
//                     style={{
//                       position: "relative",
//                       isolation: "isolate",
//                     }}
//                   >
//                     <div
//                       style={{
//                         position: "absolute",
//                         inset: 0,
//                         borderRadius: "9999px",
//                         background:
//                           "conic-gradient(from 0deg, purple, indigo, purple)",
//                         animation: "moveBorder 2s linear infinite",
//                         maskImage:
//                           "radial-gradient(circle, black 60%, transparent 80%)",
//                         WebkitMaskImage:
//                           "radial-gradient(circle, black 60%, transparent 80%)",
//                       }}
//                     />
//                     <div
//                       style={{
//                         position: "absolute",
//                         inset: 0,
//                         borderRadius: "9999px",
//                         background: "rgba(0, 0, 0, 0.5)",
//                         backdropFilter: "blur(12px)",
//                       }}
//                     />
//                     <span className="relative z-10">Create Your Own Bet</span>
//                   </button>
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
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-4 sm:px-6 lg:px-8">
//             {(activeTab === "international"
//               ? internationalMatches
//               : premierLeagueMatches
//             ).map((match, index) => (
//               <div
//                 key={index}
//                 className="relative bg-gradient-to-tr from-black via-purple-800 to-indigo-700 rounded-lg p-[1px] hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-purple-600"
//               >
//                 <div className="bg-gray-900 text-white rounded-lg p-4">
//                   <h2 className="text-xl font-bold text-center text-gradient">
//                     {match.name}
//                   </h2>
//                   <div className="flex justify-between items-center mt-4">
//                     <div className="flex items-center">
//                       <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center transition-transform transform hover:scale-110">
//                         <span className="text-white text-sm font-semibold">
//                           {match.teams[0]}
//                         </span>
//                       </div>
//                       <div className="ml-3">
//                         <h3 className="text-sm font-semibold">
//                           {match.teams[0]}
//                         </h3>
//                         <p className="text-xs text-gray-400">Best odds: 1.80</p>
//                       </div>
//                     </div>
//                     <div className="text-lg text-gray-400 font-bold">VS</div>
//                     <div className="flex items-center">
//                       <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center transition-transform transform hover:scale-110">
//                         <span className="text-white text-sm font-semibold">
//                           {match.teams[1]}
//                         </span>
//                       </div>
//                       <div className="ml-3">
//                         <h3 className="text-sm font-semibold">
//                           {match.teams[1]}
//                         </h3>
//                         <p className="text-xs text-gray-400">Best odds: 2.05</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-6 text-center">
//                     <button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-2.5 rounded-full hover:from-purple-700 hover:to-indigo-800 transition duration-300">
//                       Place Your Bet on StarkNet
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>

//       {/* Footer Section */}
//       <footer className="bg-gradient-to-t from-gray-950 to-gray-800 text-gray-400 py-8 text-center">
//         <p className="text-sm">
//           © {new Date().getFullYear()} AI Market. All rights reserved.
//         </p>
//         <p className="text-sm mt-2">
//           Built with ❤️ by the AI Market Team. Powered by StarkNet for secure,
//           decentralized transactions.
//         </p>
//       </footer>

//       {/* Inline Keyframes */}
//       <style jsx>{`
//         @keyframes moveBorder {
//           0% {
//             background-position: 0%;
//           }
//           100% {
//             background-position: 200%;
//           }
//         }
//       `}</style>
//     </>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";


interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  series_id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("international");
  const [matches, setMatches] = useState<Match[]>([]);
  const [votes, setVotes] = useState<{ [key: string]: { yes: number; no: number } }>({});

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const url = `${baseUrl}/matches?apikey=${apiKey}`;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMatches(response.data.data);
        const initialVotes = response.data.data.reduce((acc: any, match: Match) => {
          acc[match.id] = { yes: 0, no: 0 };
          return acc;
        }, {});
        setVotes(initialVotes);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMatches();
  }, [url]);

  const handleVote = (matchId: string, voteType: "yes" | "no") => {
    setVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };
      updatedVotes[matchId][voteType]++;
      return updatedVotes;
    });
  };

  const calculatePercentage = (matchId: string) => {
    const { yes, no } = votes[matchId];
    const totalVotes = yes + no;
    if (totalVotes === 0) return { yes: 0, no: 0 };
    return {
      yes: Math.round((yes / totalVotes) * 100),
      no: Math.round((no / totalVotes) * 100),
    };
  };

  const internationalMatches = matches.filter((match) => match.matchType === "odi");
  const premierLeagueMatches = matches.filter((match) => match.matchType === "ipl");

  return (
    <>
      <Header />
      <main className="mt-[10vh] p-4">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="relative w-full h-[42vh]">
            <Image
              src="/images/cricket.webp"
              alt="Cricket Betting Market"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome to Cricket Betting Market
              </h1>
              <div className="flex space-x-4">
                <Link href="/create-your-own-bet">
                  <button className="bg-gradient-to-r px-5 py-2.5 rounded-full mt-6 transition duration-300">
                    Create Your Own Bet
                  </button>
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
        <section className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-4 sm:px-6 lg:px-8">
            {(activeTab === "international" ? internationalMatches : premierLeagueMatches).map((match) => (
              <div
                key={match.id}
                className="relative bg-gradient-to-tr from-black via-purple-800 to-indigo-700 rounded-lg p-[1px] hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-purple-600"
              >
                <div className="bg-gray-900 text-white rounded-lg p-4">
                  <h2 className="text-xl font-bold text-center text-gradient">{match.name}</h2>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleVote(match.id, "yes")}
                      className={`w-1/2 text-center py-2 rounded-full text-white font-bold ${
                        votes[match.id]?.yes > 0 ? "bg-green-600" : "bg-gray-600"
                      }`}
                    >
                      Yes ({calculatePercentage(match.id).yes}%)
                    </button>
                    <button
                      onClick={() => handleVote(match.id, "no")}
                      className={`w-1/2 text-center py-2 rounded-full text-white font-bold ${
                        votes[match.id]?.no > 0 ? "bg-red-600" : "bg-gray-600"
                      }`}
                    >
                      No ({calculatePercentage(match.id).no}%)
                    </button>
                  </div>

                  <div className="mt-6 text-center">
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-2.5 rounded-full hover:from-purple-700 hover:to-indigo-800 transition duration-300">
                      Place Your Bet on StarkNet
                    </button>
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
