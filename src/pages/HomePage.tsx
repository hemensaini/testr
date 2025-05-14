import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, LineChart, PieChart, MessageCircle, Clock, Eye } from 'lucide-react';
import ChartShowcase from '../components/home/ChartShowcase';
import CommentList from '../components/home/CommentList';
import CreatePost from '../components/posts/CreatePost';
import PostList from '../components/posts/PostList';

const recentCharts = [
  {
    id: '1',
    title: 'Global Temperature Analysis 2025',
    type: 'line',
    user: {
      name: 'Climate Research Team',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60'
    },
    preview: <LineChart className="text-blue-500" size={32} />,
    created: '2025-04-15T10:30:00Z',
    views: 234
  },
  {
    id: '2',
    title: 'Market Share Distribution Q1',
    type: 'pie',
    user: {
      name: 'Business Analytics',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60'
    },
    preview: <PieChart className="text-purple-500" size={32} />,
    created: '2025-04-14T15:45:00Z',
    views: 187
  },
  {
    id: '3',
    title: 'Sales Performance by Region',
    type: 'bar',
    user: {
      name: 'Sales Insights',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60'
    },
    preview: <BarChart3 className="text-teal-500" size={32} />,
    created: '2025-04-14T09:15:00Z',
    views: 156
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 space-y-6 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Turn your data into stunning, accessible, and shareable visuals
              </h1>
              <p className="text-xl text-blue-100">
                Create beautiful charts and graphs that tell your data's story effectively.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link 
                  to="/create/chart-type" 
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors text-center"
                >
                  Create Chart
                </Link>
                <Link 
                  to="/dashboard" 
                  className="px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors text-center"
                >
                  Explore Charts
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-96 md:h-96 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-300">
                  <div className="h-full flex flex-col">
                    <div className="flex justify-between mb-4">
                      <div className="text-xl font-bold">Monthly Revenue</div>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                    </div>
                    <div className="flex-grow flex items-end space-x-4">
                      {[40, 65, 30, 70, 90, 50, 80].map((height, index) => (
                        <div key={index} className="flex-grow flex flex-col items-center">
                          <div 
                            className="w-full bg-gradient-to-t from-blue-300 to-blue-100 rounded-t-sm"
                            style={{ 
                              height: `${height}%`,
                              animation: `grow 0.7s ease-out ${index * 0.1}s forwards`,
                              opacity: 0,
                              transform: 'scaleY(0)',
                              transformOrigin: 'bottom'
                            }}
                          ></div>
                          <div className="text-xs mt-2 text-blue-100">{String.fromCharCode(65 + index)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-xl transform -rotate-6 hover:rotate-0 transition-all duration-300">
                  <div className="h-full flex flex-col justify-between">
                    <div className="text-sm font-bold">Traffic Sources</div>
                    <div className="flex-grow mt-2">
                      <div className="flex items-center h-4 mt-2">
                        <div className="w-3/5 h-full bg-purple-300 rounded-sm"></div>
                        <span className="ml-2 text-xs">Social</span>
                      </div>
                      <div className="flex items-center h-4 mt-2">
                        <div className="w-1/3 h-full bg-blue-300 rounded-sm"></div>
                        <span className="ml-2 text-xs">Direct</span>
                      </div>
                      <div className="flex items-center h-4 mt-2">
                        <div className="w-1/4 h-full bg-teal-300 rounded-sm"></div>
                        <span className="ml-2 text-xs">Organic</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Create Post Section (unchanged) */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <CreatePost />
          <div className="mt-8">
            <PostList />
          </div>
        </div>
      </section>

      {/* Chart Showcase */}
       <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trending Charts</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore popular visualizations created by our community of data enthusiasts.
            </p>
          </div>
          
          <ChartShowcase />
          
          <div className="text-center mt-12">
            <Link 
              to="/dashboard" 
              className="inline-flex items-center px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
            >
              View All Charts
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>


      {/* Recently Created Charts */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recently Created</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Check out the latest visualizations from our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentCharts.map(chart => (
              <Link
                key={chart.id}
                to={`/chart/${chart.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={chart.user.avatar}
                        alt={chart.user.name}
                        className="w-8 h-8 rounded-full object-cover mr-3"
                      />
                      <div className="text-sm">
                        <p className="font-medium">{chart.user.name}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          <Clock size={12} className="inline mr-1" />
                          {new Date(chart.created).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                      {chart.preview}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                    {chart.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Eye size={14} className="mr-1" />
                    {chart.views} views
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              to="/dashboard"
              className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors font-medium"
            >
              View More Recent Charts
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Pulse */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Pulse</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join the conversation and see what others are saying about data visualization.
            </p>
          </div>
          
          <CommentList />
          
          <div className="text-center mt-10">
            <Link 
              to="/dashboard" 
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              <MessageCircle size={20} className="mr-2" />
              Join the Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
