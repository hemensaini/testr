import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, LineChart, ThumbsUp } from 'lucide-react';

// Mock data for comments
const sampleComments = [
  {
    id: '1',
    user: {
      name: 'Alex Morgan',
      
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60'
    },
    chartId: '1',
    chartTitle: 'Global Temperature Trends',
    chartType: 'line',
    comment: 'This visualization really helps in understanding the accelerating rate of temperature change in the last decade. Great work!',
    likes: 24,
    time: '2 hours ago'
  },
  {
    id: '2',
    user: {
      name: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60'
    },
    chartId: '2',
    chartTitle: 'Population by Region',
    chartType: 'bar',
    comment: 'I\'d suggest adding a percentage view option to make the proportional differences more clear. Otherwise, excellent visualization!',
    likes: 18,
    time: '5 hours ago'
  },
  {
    id: '3',
    user: {
      name: 'Marcus Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60'
    },
    chartId: '3',
    chartTitle: 'Market Share Q3 2025',
    chartType: 'pie',
    comment: 'The color scheme makes it so easy to distinguish between categories. I forked this and adapted it for my own market analysis.',
    likes: 32,
    time: '1 day ago'
  }
];

const CommentList: React.FC = () => {
  return (
    <div className="space-y-6">
      {sampleComments.map((comment) => (
        <div 
          key={comment.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-shadow hover:shadow-md"
        >
          <div className="flex items-start">
            <img 
              src={comment.user.avatar} 
              alt={comment.user.name}
              className="w-10 h-10 rounded-full mr-4 object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                    commented on
                  </span>
                  <Link 
                    to={`/chart/${comment.chartId}`}
                    className="text-blue-500 hover:text-blue-600 transition-colors text-sm ml-1 font-medium"
                  >
                    {comment.chartTitle}
                  </Link>
                </div>
                
                <div className="flex items-center">
                  {comment.chartType === 'line' ? (
                    <LineChart size={16} className="text-blue-500 mr-2" />
                  ) : (
                    <BarChart3 size={16} className="text-purple-500 mr-2" />
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {comment.time}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {comment.comment}
              </p>
              
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <button className="flex items-center hover:text-blue-500 transition-colors text-xs">
                  <ThumbsUp size={14} className="mr-1" />
                  <span>{comment.likes}</span>
                </button>
                <Link 
                  to={`/chart/${comment.chartId}`}
                  className="ml-4 text-xs hover:text-blue-500 transition-colors"
                >
                  View Discussion
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;