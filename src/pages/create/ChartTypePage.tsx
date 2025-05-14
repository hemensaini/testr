import React, { useState } from 'react';
import { Search, Upload } from 'lucide-react';
import { chartTypes, chartCategories, recommendCharts } from '../../lib/chartTypes';
import { ChartTypeInfo } from '../../components/charts/types';
import ChartTypeCard from '../../components/create/ChartTypeCard';
import DatasetUploader from '../../components/create/DatasetUploader';

const ChartTypePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showUploader, setShowUploader] = useState(false);
  const [recommendations, setRecommendations] = useState<ChartTypeInfo[]>([]);
  
  const handleDatasetAnalyzed = (data: any) => {
    const recommendedCharts = recommendCharts(data);
    setRecommendations(recommendedCharts);
    setShowUploader(false);
  };
  
  const filteredCharts = chartTypes.filter(chart => {
    const matchesSearch = 
      chart.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chart.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chart.examples.some(example => 
        example.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesCategory = activeCategory === 'all' || chart.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Choose a Chart Type</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Select the visualization that best fits your data and goals, or let us recommend the best chart types for your dataset.
        </p>
      </div>

      {/* Search and filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              placeholder="Search chart types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setActiveCategory('all')}
            >
              All Types
            </button>
            {chartCategories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations section */}
      {recommendations.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recommended Charts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map(chart => (
              <ChartTypeCard key={chart.id} chart={chart} recommended />
            ))}
          </div>
        </div>
      )}

      {/* Chart type grid */}
      {!showUploader && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharts.map(chart => (
            <ChartTypeCard key={chart.id} chart={chart} />
          ))}
          
          {/* Get Recommendations Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border-2 border-dashed border-blue-200 dark:border-blue-800">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="text-blue-500" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Not sure which to choose?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Upload your dataset and we'll recommend the best chart types based on your data.
              </p>
              <button
                onClick={() => setShowUploader(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center"
              >
                <Upload size={20} className="mr-2" />
                Get Recommendations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dataset Uploader */}
      {showUploader && (
        <div className="mt-8">
          <DatasetUploader onDatasetAnalyzed={handleDatasetAnalyzed} />
        </div>
      )}
    </div>
  );
};

export default ChartTypePage;