import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { User, Settings, Edit, BarChart3, LineChart, PieChart, Clock, Download, Trash2, Copy, LogOut } from 'lucide-react';

// Mock data for user
const userData = {
  id: '1',
  name: 'Alex Morgan',
  username: 'alexm',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120',
  joined: '2025-01-15',
  charts: [
    {
      id: '101',
      title: 'Monthly Revenue 2025',
      type: 'bar',
      lastEdited: '2025-04-10',
      views: 320,
      comments: 12,
      preview: <BarChart3 className="text-blue-500" size={40} />
    },
    {
      id: '102',
      title: 'Customer Growth Trends',
      type: 'line',
      lastEdited: '2025-04-05',
      views: 187,
      comments: 5,
      preview: <LineChart className="text-purple-500" size={40} />
    },
    {
      id: '103',
      title: 'Market Share Analysis',
      type: 'pie',
      lastEdited: '2025-03-28',
      views: 216,
      comments: 8,
      preview: <PieChart className="text-teal-500" size={40} />
    }
  ],
  forkedCharts: [
    {
      id: '201',
      title: 'Global Temperature Analysis',
      type: 'line',
      originalUser: 'climatedata',
      originalId: '1',
      lastEdited: '2025-04-02',
      preview: <LineChart className="text-amber-500" size={40} />
    }
  ],
  comments: [
    {
      id: '301',
      chartId: '1',
      chartTitle: 'Global Temperature Trends',
      chartOwner: 'climatedata',
      text: 'This is a great visualization! Have you considered adding a trend line to make the pattern more clear?',
      date: '2025-04-08'
    },
    {
      id: '302',
      chartId: '2',
      chartTitle: 'Population by Region',
      chartOwner: 'demographicsplus',
      text: 'I\'d suggest normalizing the data by area to get a better perspective on density.',
      date: '2025-04-01'
    }
  ]
};

type TabType = 'myCharts' | 'forkedCharts' | 'comments' | 'settings';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('myCharts');
  const { username } = useParams<{ username?: string }>();
  
  // If username is provided and it's not the current user, show the public profile
  const isPublicProfile = username && username !== userData.username;
  
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Profile header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative mr-6">
              <img 
                src={userData.avatar} 
                alt={userData.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-sm"
              />
              {!isPublicProfile && (
                <button 
                  className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-1.5 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  title="Change profile picture"
                >
                  <Edit size={14} />
                </button>
              )}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                {userData.name}
                {!isPublicProfile && (
                  <button className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    <Edit size={16} />
                  </button>
                )}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">@{userData.username}</p>
              {!isPublicProfile && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{userData.email}</p>
              )}
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                Member since {new Date(userData.joined).toLocaleDateString()}
              </p>
            </div>
          </div>
          
         
        </div>
      </div>

      {/* Profile tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto">
            <button
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'myCharts' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => handleTabChange('myCharts')}
            >
              My Charts
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'forkedCharts' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => handleTabChange('forkedCharts')}
            >
              Forked Charts
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'comments' 
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => handleTabChange('comments')}
            >
              My Comments
            </button>
            {!isPublicProfile && (
              <button
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'settings' 
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => handleTabChange('settings')}
              >
                Settings
              </button>
            )}
          </nav>
        </div>

        <div className="p-6">
          {/* My Charts Tab */}
          {activeTab === 'myCharts' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">My Charts</h2>
                {!isPublicProfile && (
                  <Link 
                    to="/create/chart-type"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Create New Chart
                  </Link>
                )}
              </div>
              
              {userData.charts.length > 0 ? (
                <div className="space-y-4">
                  {userData.charts.map(chart => (
                    <div 
                      key={chart.id}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mr-4">
                          {chart.preview}
                        </div>
                        
                        <div className="flex-grow">
                          <Link to={`/chart/${chart.id}`} className="text-lg font-medium hover:text-blue-500 transition-colors">
                            {chart.title}
                          </Link>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span className="flex items-center mr-4">
                              <Clock size={14} className="mr-1" />
                              Last edited {new Date(chart.lastEdited).toLocaleDateString()}
                            </span>
                            <span className="mr-4">{chart.views} views</span>
                            <span>{chart.comments} comments</span>
                          </div>
                        </div>
                        
                        {!isPublicProfile && (
                          <div className="flex space-x-2">
                            <Link 
                              to={`/create/editor?chartId=${chart.id}`}
                              className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                              title="Edit chart"
                            >
                              <Edit size={18} />
                            </Link>
                            <button 
                              className="p-2 text-gray-500 hover:text-green-500 transition-colors"
                              title="Export chart"
                            >
                              <Download size={18} />
                            </button>
                            <button 
                              className="p-2 text-gray-500 hover:text-indigo-500 transition-colors"
                              title="Duplicate chart"
                            >
                              <Copy size={18} />
                            </button>
                            <button 
                              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                              title="Delete chart"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BarChart3 size={28} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No charts yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {isPublicProfile 
                      ? 'This user hasn\'t created any charts yet.'
                      : 'Create your first chart to visualize your data.'}
                  </p>
                  {!isPublicProfile && (
                    <Link 
                      to="/create/chart-type"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Create Your First Chart
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Forked Charts Tab */}
          {activeTab === 'forkedCharts' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Forked Charts</h2>
              
              {userData.forkedCharts.length > 0 ? (
                <div className="space-y-4">
                  {userData.forkedCharts.map(chart => (
                    <div 
                      key={chart.id}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mr-4">
                          {chart.preview}
                        </div>
                        
                        <div className="flex-grow">
                          <Link to={`/chart/${chart.id}`} className="text-lg font-medium hover:text-blue-500 transition-colors">
                            {chart.title}
                          </Link>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <div className="flex items-center">
                              <span>Forked from </span>
                              <Link to={`/user/${chart.originalUser}`} className="text-blue-500 mx-1">
                                @{chart.originalUser}
                              </Link>
                              <span>'s </span>
                              <Link to={`/chart/${chart.originalId}`} className="text-blue-500 ml-1">
                                original chart
                              </Link>
                            </div>
                            <div className="mt-1">
                              <Clock size={14} className="inline mr-1" />
                              Last edited {new Date(chart.lastEdited).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        {!isPublicProfile && (
                          <div className="flex space-x-2">
                            <Link 
                              to={`/create/editor?chartId=${chart.id}`}
                              className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                              title="Edit chart"
                            >
                              <Edit size={18} />
                            </Link>
                            <button 
                              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                              title="Delete chart"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Copy size={28} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No forked charts</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {isPublicProfile 
                      ? 'This user hasn\'t forked any charts yet.'
                      : 'Fork charts from other users to build upon their work.'}
                  </p>
                  {!isPublicProfile && (
                    <Link 
                      to="/dashboard"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Explore Charts to Fork
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'comments' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">My Comments</h2>
              
              {userData.comments.length > 0 ? (
                <div className="space-y-4">
                  {userData.comments.map(comment => (
                    <div 
                      key={comment.id}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="mb-2">
                        <span>Comment on </span>
                        <Link to={`/chart/${comment.chartId}`} className="font-medium text-blue-500">
                          {comment.chartTitle}
                        </Link>
                        <span className="mx-1">by</span>
                        <Link to={`/user/${comment.chartOwner}`} className="text-blue-500">
                          @{comment.chartOwner}
                        </Link>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-2 border-l-4 border-gray-200 dark:border-gray-600 pl-3 py-1">
                        {comment.text}
                      </p>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {new Date(comment.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={28} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No comments yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {isPublicProfile 
                      ? 'This user hasn\'t made any comments yet.'
                      : 'Join the conversation by commenting on charts.'}
                  </p>
                  {!isPublicProfile && (
                    <Link 
                      to="/dashboard"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Explore Charts to Comment
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && !isPublicProfile && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Settings</h2>
              
              <div className="space-y-8">
                {/* Appearance */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Appearance</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Theme
                      </label>
                      <div className="flex space-x-4">
                        <div className="relative">
                          <input 
                            type="radio" 
                            id="theme-light" 
                            name="theme" 
                            className="sr-only peer" 
                            defaultChecked 
                          />
                          <label 
                            htmlFor="theme-light" 
                            className="flex items-center justify-center w-24 p-3 bg-white border border-gray-300 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-500 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex flex-col items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="5" fill="#F59E0B" />
                                <path d="M12 3V5M12 19V21M5 12H3M21 12H19M18.364 5.636L16.95 7.05M7.05 16.95L5.636 18.364M7.05 7.05L5.636 5.636M18.364 18.364L16.95 16.95" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                              <span className="mt-1 text-sm">Light</span>
                            </div>
                          </label>
                        </div>
                        
                        <div className="relative">
                          <input 
                            type="radio" 
                            id="theme-dark" 
                            name="theme" 
                            className="sr-only peer" 
                          />
                          <label 
                            htmlFor="theme-dark" 
                            className="flex items-center justify-center w-24 p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-500 hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex flex-col items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#A3A3A3" />
                              </svg>
                              <span className="mt-1 text-sm text-white">Dark</span>
                            </div>
                          </label>
                        </div>
                        
                        <div className="relative">
                          <input 
                            type="radio" 
                            id="theme-system" 
                            name="theme" 
                            className="sr-only peer" 
                          />
                          <label 
                            htmlFor="theme-system" 
                            className="flex items-center justify-center w-24 p-3 bg-white border border-gray-300 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-500 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex flex-col items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" fill="#6B7280" />
                                <path d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span className="mt-1 text-sm">System</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Accessibility
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Reduced motion</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">High contrast mode</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Dyslexia-friendly font</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Export Preferences */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Export Preferences</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Default Export Format
                      </label>
                      <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        <option>PNG</option>
                        <option>SVG</option>
                        <option>PDF</option>
                        <option>CSV (data only)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Include chart title and description in exports
                        </span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Include alt text in image exports
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Account & Privacy */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Account & Privacy</h3>
                  
                  <div className="space-y-4">
                    <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                      Change Password
                    </button>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Notifications</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Comments on my charts</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">When someone forks my chart</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Product updates and newsletters</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                      <button className="text-sm text-red-500 hover:text-red-600 transition-colors">
                        Export My Data
                      </button>
                    </div>
                    
                    <div>
                      <button className="text-sm text-red-500 hover:text-red-600 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;