import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-blue-500 text-white rounded-full p-4">
              <BarChart3 size={32} />
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6 text-gray-700 dark:text-gray-300">Page Not Found</h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to visualizing data!
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/" 
            className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          <Link 
            to="/create/chart-type" 
            className="px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Create a Chart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;