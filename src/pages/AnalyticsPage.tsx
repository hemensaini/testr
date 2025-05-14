import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { 
  BarChart3, LineChart, Eye, Download, Share2, 
  Edit3, Clock, ArrowUpRight, ArrowDownRight,
  Lock, X, CheckCircle
} from 'lucide-react';

// Mock analytics data
const analyticsData = {
  charts: [
    {
      id: '1',
      title: 'Global Temperature Trends',
      views: 1245,
      uniqueViewers: 892,
      downloads: 156,
      shares: 89,
      edits: 12,
      lastViewedAt: '2025-04-15T10:30:00Z',
      type: 'line',
      trend: 'up',
      trendPercentage: 15
    },
    {
      id: '2',
      title: 'Market Share Distribution',
      views: 982,
      uniqueViewers: 645,
      downloads: 123,
      shares: 67,
      edits: 8,
      lastViewedAt: '2025-04-14T15:45:00Z',
      type: 'pie',
      trend: 'down',
      trendPercentage: 5
    },
    {
      id: '3',
      title: 'Sales Performance by Region',
      views: 876,
      uniqueViewers: 534,
      downloads: 98,
      shares: 45,
      edits: 15,
      lastViewedAt: '2025-04-14T09:15:00Z',
      type: 'bar',
      trend: 'up',
      trendPercentage: 23
    }
  ],
  topViewedData: {
    labels: ['Temperature Trends', 'Market Share', 'Sales Performance', 'User Demographics', 'Budget Analysis'],
    datasets: [{
      label: 'Total Views',
      data: [1245, 982, 876, 654, 543],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }]
  },
  engagementData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Views',
        data: [500, 650, 750, 800, 950, 1200],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Downloads',
        data: [50, 75, 90, 85, 100, 120],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4
      }
    ]
  }
};

const timeRanges = [
  { value: '7d', label: 'Last 7 days', premium: false },
  { value: '30d', label: 'Last 30 days', premium: true },
  { value: '90d', label: 'Last 90 days', premium: true },
  { value: '1y', label: 'Last year', premium: true },
  { value: 'all', label: 'All time', premium: true }
];

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    }
  };

  const handleTimeRangeChange = (value: string) => {
    const selectedRange = timeRanges.find(range => range.value === value);
    if (selectedRange?.premium) {
      setShowUpgradeModal(true);
    } else {
      setTimeRange(value);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track engagement and performance metrics for your charts
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <select 
            value={timeRange}
            onChange={(e) => handleTimeRangeChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label} {range.premium && '🔒'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <Eye className="text-blue-500" size={24} />
            </div>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="text-green-500 mr-1" size={16} />
              <span className="text-green-500">12%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">3,103</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Views</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
              <Download className="text-purple-500" size={24} />
            </div>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="text-green-500 mr-1" size={16} />
              <span className="text-green-500">8%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">377</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Downloads</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
              <Share2 className="text-green-500" size={24} />
            </div>
            <div className="flex items-center text-sm">
              <ArrowDownRight className="text-red-500 mr-1" size={16} />
              <span className="text-red-500">3%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">201</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Shares</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg">
              <Edit3 className="text-amber-500" size={24} />
            </div>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="text-green-500 mr-1" size={16} />
              <span className="text-green-500">15%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">35</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Edits</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Most Viewed Charts</h3>
          <div className="h-80">
            <Bar data={analyticsData.topViewedData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Engagement Over Time</h3>
          <div className="h-80">
            <Line data={analyticsData.engagementData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Chart Performance</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Chart
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Unique Viewers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Shares
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Edits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Viewed
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {analyticsData.charts.map((chart) => (
                <tr key={chart.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg mr-3">
                        {chart.type === 'bar' && <BarChart3 size={20} className="text-blue-500" />}
                        {chart.type === 'line' && <LineChart size={20} className="text-purple-500" />}
                      </div>
                      <div>
                        <div className="font-medium">{chart.title}</div>
                        <div className="flex items-center mt-1">
                          <div className={`flex items-center text-sm ${
                            chart.trend === 'up' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {chart.trend === 'up' ? (
                              <ArrowUpRight size={14} className="mr-1" />
                            ) : (
                              <ArrowDownRight size={14} className="mr-1" />
                            )}
                            {chart.trendPercentage}%
                          </div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                            vs. previous period
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{chart.views.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{chart.uniqueViewers.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{chart.downloads.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{chart.shares.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{chart.edits.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="mr-1" />
                      {format(new Date(chart.lastViewedAt), 'MMM d, yyyy')}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 relative animate-fadeIn">
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-blue-500" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Unlock Extended Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get access to historical data and advanced analytics features by upgrading to our premium plan.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-3">Premium Features Include:</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Historical data up to 1 year
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Advanced trend analysis
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Export analytics reports
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Custom date ranges
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <button 
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setShowUpgradeModal(false)}
              >
                Upgrade Now
              </button>
              <button 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setShowUpgradeModal(false)}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blur overlay for premium content */}
      {timeRanges.find(range => range.value === timeRange)?.premium && (
        <div className="relative">
          <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center p-8">
              <Lock className="text-blue-500 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Premium Feature</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Upgrade to access historical analytics data
              </p>
              <button 
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setShowUpgradeModal(true)}
              >
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Original content (blurred) */}
          <div className="filter blur-sm">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* ... Rest of the component remains the same ... */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;