
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";


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

// const fetchMatches = async (url: string) => {
//   const response = await axios.get(url, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return response.data.data; 
// };

// // The custom hook
// const useMatches = (url: string) => {
//     const url = `${baseUrl}/matches?apikey=${apiKey}`;

//   return useQuery<Match[], Error>(["matches", url], () => fetchMatches(url), {
//     enabled: !!url, 
// };

// export default useMatches;
