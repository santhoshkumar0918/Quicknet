export default function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <pre className="text-red-400">{error.message}</pre>
      </div>
    </div>
  )
} 