'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Match } from '../types';

export default function MatchList({ matches }: { matches: Match[] }) {
  if (!matches?.length) {
    return (
      <div className="text-center text-white py-8">
        No matches available at the moment
      </div>
    );
  }

  return (
    <>
      {matches.map((match) => (
        <Link href={`/create-your-own-bet?match=${match.name}&team1=${match.captains.team1.name}&team2=${match.captains.team2.name}`} key={match.id}>
          <motion.div
            className="bg-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-700 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={match.captains.team1.image}
                    alt={match.captains.team1.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{match.name}</h3>
                  <p className="text-gray-400">{match.venue}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white">{match.status}</p>
                <p className="text-gray-400">{match.dateTimeGMT}</p>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </>
  );
}