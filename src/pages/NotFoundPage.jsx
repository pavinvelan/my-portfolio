import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
      <h1 className="text-6xl font-bold text-pink-500 mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 rounded-full text-white font-medium hover:from-violet-600 hover:to-pink-500 transition-all duration-300"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFoundPage
