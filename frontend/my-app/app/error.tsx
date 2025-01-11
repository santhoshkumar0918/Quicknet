'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
      >
        Try again
      </button>
    </div>
  );
} 