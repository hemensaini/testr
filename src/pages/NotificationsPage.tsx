import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  Bell, Check, Info, AlertTriangle, CheckCircle, 
  Trash2, Settings, Filter 
} from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

const NotificationsPage: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'warning':
        return <AlertTriangle className="text-amber-500" size={24} />;
      case 'alert':
        return <Bell className="text-red-500" size={24} />;
      default:
        return <Info className="text-blue-500" size={24} />;
    }
  };

  const filteredNotifications = activeFilter === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeFilter);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with your chart activity and announcements
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-blue-500 hover:text-blue-600 transition-colors flex items-center"
          >
            <Check size={18} className="mr-2" />
            Mark all as read
          </button>
          <button
            onClick={clearNotifications}
            className="px-4 py-2 text-red-500 hover:text-red-600 transition-colors flex items-center"
          >
            <Trash2 size={18} className="mr-2" />
            Clear all
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <span className="font-medium">Filter by type:</span>
            </div>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilter === 'info'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveFilter('info')}
              >
                Info
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilter === 'success'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveFilter('success')}
              >
                Success
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilter === 'warning'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveFilter('warning')}
              >
                Warning
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilter === 'alert'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveFilter('alert')}
              >
                Alert
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="text-gray-900 dark:text-gray-100">
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="ml-4 text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <Check size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bell className="text-gray-400 dark:text-gray-500" size={32} />
              </div>
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-gray-500 dark:text-gray-400">
                You're all caught up! Check back later for new updates.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Settings size={24} className="text-gray-500 mr-3" />
          <h2 className="text-xl font-semibold">Notification Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                defaultChecked 
              />
              <span className="ml-2">Chart engagement notifications</span>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-6 mt-1">
              Get notified when your charts receive views, downloads, or shares
            </p>
          </div>
          
          <div>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                defaultChecked 
              />
              <span className="ml-2">Feature updates and announcements</span>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-6 mt-1">
              Stay informed about new features and platform updates
            </p>
          </div>
          
          <div>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                defaultChecked 
              />
              <span className="ml-2">Collaboration invites</span>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-6 mt-1">
              Receive notifications when you're invited to collaborate on charts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;