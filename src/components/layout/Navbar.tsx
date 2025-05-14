import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, Menu, X, Sun, Moon, User, Bell, 
  ChevronDown, Settings, BarChart2, LogOut 
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import NotificationCenter from './NotificationCenter';
import { useNotifications } from '../../contexts/NotificationContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme, setTheme, isDark } = useTheme();
  const location = useLocation();
  const { unreadCount } = useNotifications();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsNotificationOpen(false);
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-500 dark:text-blue-400' : '';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-bold transition-transform hover:scale-105"
        >
          <BarChart3 className="text-blue-500" size={28} />
          <span>VisData</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className={`transition-colors hover:text-blue-500 ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/dashboard" className={`transition-colors hover:text-blue-500 ${isActive('/dashboard')}`}>
              Explore
            </Link>
            <Link 
              to="/create/chart-type" 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Chart
            </Link>
          </div>
          
          <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-gray-700">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="View notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              {isNotificationOpen && <NotificationCenter onClose={() => setIsNotificationOpen(false)} />}
            </div>
            
            <div className="relative">
              <button 
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32" 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown size={16} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-fadeIn">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="font-medium">Alex Morgan</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">alex@example.com</div>
                  </div>
                  
                  <div className="py-1">
                    <Link 
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={16} className="mr-3" />
                      Profile
                    </Link>
                    <Link 
                      to="/analytics"
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <BarChart2 size={16} className="mr-3" />
                      Analytics
                    </Link>
                    <Link 
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings size={16} className="mr-3" />
                      Settings
                    </Link>
                  </div>

                  <div className="py-1 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LogOut size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white dark:bg-gray-800 shadow-md py-3 px-4 z-50 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`py-2 transition-colors hover:text-blue-500 ${isActive('/')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className={`py-2 transition-colors hover:text-blue-500 ${isActive('/dashboard')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/profile" 
              className={`py-2 transition-colors hover:text-blue-500 ${isActive('/profile')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <Link 
              to="/analytics" 
              className={`py-2 transition-colors hover:text-blue-500 ${isActive('/analytics')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link 
              to="/settings" 
              className={`py-2 transition-colors hover:text-blue-500 ${isActive('/settings')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Settings
            </Link>
            <Link 
              to="/create/chart-type" 
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-center transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Chart
            </Link>
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? (
                <>
                  <Sun size={20} className="mr-2" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={20} className="mr-2" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;