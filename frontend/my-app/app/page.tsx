// 'use client';

// import Header from "./components/Header";

// export default function HomePage() {
//   return (
//     <>
//       <Header />

//       {/* Main Content */}
//       <main className="mt-[10vh] p-4">
//         {/* Centered Content */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-gray-800">Welcome to AI Market</h1>
//           <p className="text-lg text-gray-500 mt-4">
//             Discover the future of AI-powered solutions.
//           </p>
//         </div>

//         {/* Overview Content Section */}
//         <section className="mb-12">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-800">Sports Betting Overview</h2>
//             <p className="text-gray-500 mt-2">
//               Explore the most popular and exciting sports betting options available.
//             </p>
//           </div>
//           <div className="bg-gradient-to-br from-black via-purple-700 to-purple-400 p-[2px] rounded-lg max-w-4xl mx-auto">
//             <div className="bg-gray-950 text-white rounded-lg p-8">
//               <h3 className="text-4xl font-bold text-center text-purple-300 mb-6">
//                 Major League Showdown: Team Alpha vs Team Omega
//               </h3>
//               <div className="flex justify-around items-center mt-6">
//                 {/* Team Alpha */}
//                 <div className="flex items-center">
//                   <div className="w-20 h-20 bg-purple-600 rounded-full flex justify-center items-center">
//                     <span className="text-white text-2xl font-bold">A</span>
//                   </div>
//                   <div className="ml-6">
//                     <h4 className="text-2xl font-semibold">Team Alpha</h4>
//                     <p className="text-gray-400">Best odds: 1.70</p>
//                   </div>
//                 </div>

//                 {/* VS Divider */}
//                 <div className="text-2xl text-gray-400 font-bold">VS</div>

//                 {/* Team Omega */}
//                 <div className="flex items-center">
//                   <div className="w-20 h-20 bg-purple-600 rounded-full flex justify-center items-center">
//                     <span className="text-white text-2xl font-bold">O</span>
//                   </div>
//                   <div className="ml-6">
//                     <h4 className="text-2xl font-semibold">Team Omega</h4>
//                     <p className="text-gray-400">Best odds: 2.10</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Betting Button */}
//               <div className="mt-10 text-center">
//                 <button className="bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition">
//                   Place Your Bet Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Smaller Betting Grids */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 sm:px-6 lg:px-8">
//           {[
//             "Team A vs Team B",
//             "Team X vs Team Y",
//             "Team M vs Team N",
//             "Team P vs Team Q",
//             "Team R vs Team S",
//             "Team T vs Team U",
//           ].map((match, index) => (
//             <div
//               key={index}
//               className="relative bg-gradient-to-tr from-black via-blue-500 to-purple-500 rounded-lg p-[2px]"
//             >
//               {/* Content */}
//               <div className="bg-gray-950 text-white rounded-lg p-6">
//                 <h2 className="text-3xl font-bold text-center text-purple-300">{match}</h2>
//                 <div className="flex justify-between items-center mt-6">
//                   <div className="flex items-center">
//                     <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
//                       <span className="text-white text-xl font-semibold">A</span>
//                     </div>
//                     <div className="ml-4">
//                       <h3 className="text-xl font-semibold">Team A</h3>
//                       <p className="text-sm text-gray-400">Best odds: 1.80</p>
//                     </div>
//                   </div>
//                   <div className="text-xl text-gray-400 font-bold">VS</div>
//                   <div className="flex items-center">
//                     <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
//                       <span className="text-white text-xl font-semibold">B</span>
//                     </div>
//                     <div className="ml-4">
//                       <h3 className="text-xl font-semibold">Team B</h3>
//                       <p className="text-sm text-gray-400">Best odds: 2.05</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-8 text-center">
//                   <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">
//                     Place Your Bet
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Footer Section */}
//       <footer className="bg-gray-950 text-gray-400 py-8 text-center">
//         <p className="text-sm">
//           © {new Date().getFullYear()} QuickNet. All rights reserved.
//         </p>
//         <p className="text-sm mt-2">
//           Built with ❤️ by the QuickNet Team.
//         </p>
//       </footer>
//     </>
//   );
// }
'use client';

import Header from "./components/Header";

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Main Content */}
      <main className="mt-[10vh] p-4">
        {/* Centered Content */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to AI Market</h1>
          <p className="text-lg text-gray-500 mt-4">
            Discover the future of AI-powered solutions.
          </p>
        </div>

        {/* Overview Content Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Sports Betting Overview</h2>
            <p className="text-gray-500 mt-2">
              Explore the most popular and exciting sports betting options available.
            </p>
          </div>
          <div className="bg-gradient-to-br from-black via-purple-700 to-purple-400 p-[2px] rounded-lg max-w-4xl mx-auto">
            <div className="bg-gray-950 text-white rounded-lg p-8">
              <h3 className="text-4xl font-bold text-center text-purple-300 mb-6">
                Major League Showdown: Team Alpha vs Team Omega
              </h3>
              <div className="flex justify-around items-center mt-6">
                {/* Team Alpha */}
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex justify-center items-center">
                    <span className="text-white text-2xl font-bold">A</span>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-2xl font-semibold">Team Alpha</h4>
                    <p className="text-gray-400">Best odds: 1.70</p>
                  </div>
                </div>

                {/* VS Divider */}
                <div className="text-2xl text-gray-400 font-bold">VS</div>

                {/* Team Omega */}
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex justify-center items-center">
                    <span className="text-white text-2xl font-bold">O</span>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-2xl font-semibold">Team Omega</h4>
                    <p className="text-gray-400">Best odds: 2.10</p>
                  </div>
                </div>
              </div>

              {/* Betting Button */}
              <div className="mt-10 text-center">
                <button className="bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition">
                  Place Your Bet Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Smaller Betting Grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 sm:px-6 lg:px-8">
          {[
            "Team A vs Team B",
            "Team X vs Team Y",
            "Team M vs Team N",
            "Team P vs Team Q",
            "Team R vs Team S",
            "Team T vs Team U",
          ].map((match, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-tr from-black via-blue-500 to-purple-500 rounded-lg p-[2px]"
            >
              {/* Content */}
              <div className="bg-gray-950 text-white rounded-lg p-6">
                <h2 className="text-3xl font-bold text-center text-purple-300">{match}</h2>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
                      <span className="text-white text-xl font-semibold">A</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">Team A</h3>
                      <p className="text-sm text-gray-400">Best odds: 1.80</p>
                    </div>
                  </div>
                  <div className="text-xl text-gray-400 font-bold">VS</div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex justify-center items-center">
                      <span className="text-white text-xl font-semibold">B</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">Team B</h3>
                      <p className="text-sm text-gray-400">Best odds: 2.05</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">
                    Place Your Bet
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Line Above Footer */}
      <div className="relative">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-t from-gray-950 to-gray-800 text-gray-400 py-8 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} AI Market. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Built with ❤️ by the AI Market Team.
        </p>
      </footer>
    </>
  );
}
