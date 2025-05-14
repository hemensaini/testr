import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, LineChart, PieChart, ScatterChart, Eye } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock data for chart showcase
const sampleCharts = [
  {
    id: '1',
    title: 'Global Temperature Trends',
    type: 'line',
    user: 'climatedata',
    views: 1245,
    icon: <LineChart className="text-blue-500" size={24} />,
    bgClass: 'bg-blue-50 dark:bg-blue-950/40',
    data: {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
      datasets: [{
        data: [15, 17, 16, 19, 18, 20],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }]
    }
  },
  {
    id: '2',
    title: 'Population by Region',
    type: 'bar',
    user: 'demographicsplus',
    views: 982,
    icon: <BarChart3 className="text-purple-500" size={24} />,
    bgClass: 'bg-purple-50 dark:bg-purple-950/40',
    data: {
      labels: ['North', 'South', 'East', 'West', 'Central'],
      datasets: [{
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1
      }]
    }
  },
  {
    id: '3',
    title: 'Market Share Q3 2025',
    type: 'pie',
    user: 'bizanalytics',
    views: 756,
    icon: <PieChart className="text-teal-500" size={24} />,
    bgClass: 'bg-teal-50 dark:bg-teal-950/40',
    data: {
      labels: ['Product A', 'Product B', 'Product C'],
      datasets: [{
        data: [30, 40, 30],
        backgroundColor: [
          'rgba(45, 212, 191, 0.7)',
          'rgba(45, 212, 191, 0.5)',
          'rgba(45, 212, 191, 0.3)'
        ]
      }]
    }
  },
  {
    id: '4',
    title: 'Correlation Study Results',
    type: 'scatter',
    user: 'researchteam',
    views: 631,
    icon: <ScatterChart className="text-amber-500" size={24} />,
    bgClass: 'bg-amber-50 dark:bg-amber-950/40',
    data: {
      datasets: [{
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 25 },
          { x: 20, y: 30 },
          { x: 25, y: 35 },
          { x: 30, y: 40 }
        ],
        backgroundColor: 'rgba(245, 158, 11, 0.5)'
      }]
    }
  }
];

const ChartShowcase: React.FC = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {sampleCharts.map((chart) => (
        <div 
          key={chart.id}
          className={`${chart.bgClass} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              {chart.icon}
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Eye size={14} className="mr-1" /> {chart.views}
              </span>
            </div>
            <h3 className="font-semibold mb-1">{chart.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">by @{chart.user}</p>
          </div>

          <div className="relative h-36 w-full bg-white dark:bg-gray-800 overflow-hidden p-2">
            {chart.type === 'bar' && (
              <Bar data={chart.data} options={chartOptions} />
            )}
            
            {chart.type === 'line' && (
              <Line data={chart.data} options={chartOptions} />
            )}
            
            {chart.type === 'pie' && (
              <Pie data={chart.data} options={chartOptions} />
            )}
            
            {chart.type === 'scatter' && (
              <Line data={chart.data} options={chartOptions} />
            )}
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Link 
                to={`/chart/${chart.id}`}
                className="px-4 py-2 bg-white text-gray-800 rounded-lg font-medium transform scale-95 group-hover:scale-100 transition-transform"
              >
                View Chart
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartShowcase;