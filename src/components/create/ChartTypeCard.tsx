import React from 'react';
import { Link } from 'react-router-dom';
import { ChartTypeInfo } from '../charts/types';
import { BarChart3, LineChart, PieChart, Map, Activity } from 'lucide-react';

interface ChartTypeCardProps {
  chart: ChartTypeInfo;
  recommended?: boolean;
}

const chartIcons = {
  bar: BarChart3,
  line: LineChart,
  pie: PieChart,
  delhiChoropleth: Map,
  indiaChoropleth: Map,
  usaChoropleth: Map
};

const ChartTypeCard: React.FC<ChartTypeCardProps> = ({ chart, recommended }) => {
  const IconComponent = chartIcons[chart.id as keyof typeof chartIcons] || Activity;
  
  return (
    <Link
      to={`/create/editor?chart=${chart.id}`}
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-sm 
        hover:shadow-md transition-all duration-300 
        transform hover:-translate-y-1 overflow-hidden
        ${recommended ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' : ''}
      `}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
            <IconComponent className="text-blue-500" size={32} />
          </div>
          {recommended && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Recommended
            </span>
          )}
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{chart.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {chart.description}
        </p>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              Best for
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {chart.examples.map((example, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                  {example}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              Data Requirements
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {chart.dataRequirements.structure}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 text-center">
        <span className="text-blue-500 font-medium">Use This Chart Type</span>
      </div>
    </Link>
  );
};

export default ChartTypeCard;