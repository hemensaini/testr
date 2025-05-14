import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Download, Share2, Copy, Edit, MessageSquare, 
  ThumbsUp, ThumbsDown, Eye, Clock, User, Flag 
} from 'lucide-react';
import Chart from '../components/charts/Chart';

// Mock chart data
const chartData = {
  id: '1',
  title: 'Global Temperature Trends',
  description: 'Visualization of global temperature changes over the last century, showing the accelerating rate of warming in recent decades.',
  type: 'line',
  created: '2025-04-10T12:30:00Z',
  updated: '2025-04-12T09:15:00Z',
  user: {
    id: '101',
    name: 'Climate Data Team',
    username: 'climatedata',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60'
  },
  data: {
    labels: ['1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020', '2025'],
    datasets: [
      {
        label: 'Temperature Anomaly (°C)',
        data: [0.18, 0.22, 0.33, 0.42, 0.54, 0.62, 0.71, 0.87, 0.99, 1.1],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Global Temperature Anomalies (1980-2025)'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature Anomaly (°C)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      }
    }
  },
  altText: 'Line chart showing global temperature anomalies from 1980 to 2025, with a clear upward trend accelerating in recent decades',
  views: 1458,
  likes: 83,
  forks: 12,
  comments: [
    {
      id: '1001',
      user: {
        id: '201',
        name: 'Alex Morgan',
        username: 'alexm',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60'
      },
      text: 'This visualization really helps in understanding the accelerating rate of temperature change in the last decade. Great work!',
      timestamp: '2025-04-12T14:30:00Z',
      likes: 24,
      replies: []
    },
    {
      id: '1002',
      user: {
        id: '202',
        name: 'Priya Sharma',
        username: 'priyaS',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60'
      },
      text: 'Would it be possible to add error bars to represent the uncertainty in these measurements? That would add an important dimension to the data.',
      timestamp: '2025-04-11T09:15:00Z',
      likes: 18,
      replies: [
        {
          id: '1003',
          user: {
            id: '101',
            name: 'Climate Data Team',
            username: 'climatedata',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60'
          },
          text: 'That\'s a great suggestion, Priya! We\'re working on a version that includes confidence intervals. Should be ready next week.',
          timestamp: '2025-04-11T10:22:00Z',
          likes: 5
        }
      ]
    }
  ],
  tags: ['climate', 'temperature', 'global', 'trends', 'environment']
};

const ChartPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [commentText, setCommentText] = useState('');
  const [activeTab, setActiveTab] = useState<'discussion' | 'about'>('discussion');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  
  // In a real app, you would fetch the chart data based on the id
  // For now, we'll just use the mock data
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Chart header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-3xl font-bold">{chartData.title}</h1>
          
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <button 
              className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
              onClick={() => setIsExportModalOpen(true)}
              title="Export chart"
            >
              <Download size={20} />
            </button>
            <button 
              className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
              onClick={() => setIsShareModalOpen(true)}
              title="Share chart"
            >
              <Share2 size={20} />
            </button>
            <button 
              className="p-2 text-gray-500 hover:text-purple-500 transition-colors"
              title="Fork chart"
            >
              <Copy size={20} />
            </button>
            <Link 
              to={`/create/editor?chartId=${chartData.id}`}
              className="p-2 text-gray-500 hover:text-green-500 transition-colors"
              title="Edit chart"
            >
              <Edit size={20} />
            </Link>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center mr-4">
            <Link to={`/user/${chartData.user.username}`} className="flex items-center hover:text-blue-500 transition-colors">
              <img 
                src={chartData.user.avatar} 
                alt={chartData.user.name} 
                className="w-6 h-6 rounded-full mr-2 object-cover"
              />
              <span>@{chartData.user.username}</span>
            </Link>
          </div>
          <div className="flex items-center mr-4">
            <Clock size={16} className="mr-1" />
            <span>
              {new Date(chartData.updated).toLocaleDateString()} 
              {new Date(chartData.created).toISOString() !== new Date(chartData.updated).toISOString() && 
                ' (updated)'}
            </span>
          </div>
          <div className="flex items-center mr-4">
            <Eye size={16} className="mr-1" />
            <span>{chartData.views}</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp size={16} className="mr-1" />
            <span>{chartData.likes}</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {chartData.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {chartData.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Chart display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8">
        <div className="h-[400px] md:h-[500px]">
          <Chart 
            type={chartData.type} 
            data={chartData.data} 
            options={chartData.options} 
            altText={chartData.altText} 
          />
        </div>
      </div>

      {/* Tabs for discussion and about */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'discussion' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('discussion')}
            >
              Discussion ({chartData.comments.length})
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'about' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Discussion Tab */}
          {activeTab === 'discussion' && (
            <div>
              {/* Add comment form */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Add a Comment</h3>
                <div className="flex space-x-4">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60"
                    alt="Your avatar" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-grow">
                    <textarea
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      rows={3}
                      placeholder="Add your thoughts about this chart..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        disabled={!commentText.trim()}
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Comments list */}
              <div className="space-y-6">
                {chartData.comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <div className="flex space-x-4">
                      <Link to={`/user/${comment.user.username}`}>
                        <img 
                          src={comment.user.avatar} 
                          alt={comment.user.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </Link>
                      
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link to={`/user/${comment.user.username}`} className="font-medium hover:text-blue-500 transition-colors">
                              {comment.user.name}
                            </Link>
                            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                              @{comment.user.username}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(comment.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                          {comment.text}
                        </p>
                        
                        <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <button className="flex items-center hover:text-blue-500 transition-colors mr-4">
                            <ThumbsUp size={16} className="mr-1" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="flex items-center hover:text-blue-500 transition-colors mr-4">
                            <ThumbsDown size={16} className="mr-1" />
                          </button>
                          <button className="hover:text-blue-500 transition-colors mr-4">
                            Reply
                          </button>
                          <button className="hover:text-red-500 transition-colors">
                            <Flag size={16} />
                          </button>
                        </div>
                        
                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex space-x-3">
                                <Link to={`/user/${reply.user.username}`}>
                                  <img 
                                    src={reply.user.avatar} 
                                    alt={reply.user.name} 
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                </Link>
                                
                                <div>
                                  <div className="flex items-center">
                                    <Link to={`/user/${reply.user.username}`} className="font-medium text-sm hover:text-blue-500 transition-colors">
                                      {reply.user.name}
                                    </Link>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">
                                      @{reply.user.username}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">
                                      {new Date(reply.timestamp).toLocaleDateString()}
                                    </span>
                                  </div>
                                  
                                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                    {reply.text}
                                  </p>
                                  
                                  <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <button className="flex items-center hover:text-blue-500 transition-colors mr-3">
                                      <ThumbsUp size={14} className="mr-1" />
                                      <span>{reply.likes}</span>
                                    </button>
                                    <button className="flex items-center hover:text-blue-500 transition-colors mr-3">
                                      <ThumbsDown size={14} className="mr-1" />
                                    </button>
                                    <button className="hover:text-red-500 transition-colors">
                                      <Flag size={14} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Chart Details</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500 dark:text-gray-400">Chart Type:</dt>
                      <dd className="text-gray-700 dark:text-gray-300 capitalize">{chartData.type}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500 dark:text-gray-400">Created:</dt>
                      <dd className="text-gray-700 dark:text-gray-300">{new Date(chartData.created).toLocaleDateString()}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500 dark:text-gray-400">Last Updated:</dt>
                      <dd className="text-gray-700 dark:text-gray-300">{new Date(chartData.updated).toLocaleDateString()}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500 dark:text-gray-400">Views:</dt>
                      <dd className="text-gray-700 dark:text-gray-300">{chartData.views}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500 dark:text-gray-400">Likes:</dt>
                      <dd className="text-gray-700 dark:text-gray-300">{chartData.likes}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500 dark:text-gray-400">Forks:</dt>
                      <dd className="text-gray-700 dark:text-gray-300">{chartData.forks}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Accessibility Information</h3>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Alt Text:</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {chartData.altText}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Creator</h3>
                  <div className="flex items-center">
                    <Link to={`/user/${chartData.user.username}`} className="flex items-center group">
                      <img 
                        src={chartData.user.avatar} 
                        alt={chartData.user.name} 
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <div className="font-medium group-hover:text-blue-500 transition-colors">
                          {chartData.user.name}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                          @{chartData.user.username}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Data Information</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    This chart was created using temperature anomaly data from global weather stations, 
                    processed and normalized to show deviations from the 1951-1980 baseline period.
                  </p>
                  
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Download Raw Data (CSV)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 animate-slideUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Share Chart</h3>
              <button 
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setIsShareModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Link
                </label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={`https://visdata.com/chart/${chartData.id}`} 
                    readOnly
                    className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700"
                  />
                  <button className="px-3 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors">
                    Copy
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Embed
                </label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={`<iframe src="https://visdata.com/embed/${chartData.id}" width="600" height="400" frameborder="0"></iframe>`} 
                    readOnly
                    className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700"
                  />
                  <button className="px-3 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors">
                    Copy
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Share on
                </label>
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    Facebook
                  </button>
                  <button className="flex-1 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    Twitter
                  </button>
                  <button className="flex-1 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 animate-slideUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Export Chart</h3>
              <button 
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setIsExportModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 px-4 border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-300 font-medium">
                    PNG Image
                  </button>
                  <button className="py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    SVG Vector
                  </button>
                  <button className="py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    PDF Document
                  </button>
                  <button className="py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    CSV Data
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Include title and description</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Include alt text</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">High contrast mode</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => setIsExportModalOpen(false)}
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartPage;