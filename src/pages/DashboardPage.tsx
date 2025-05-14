import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, LineChart, PieChart, ScatterChart, Filter, Search as SearchIcon, SlidersHorizontal, Grid, List, X, Map, Eye } from 'lucide-react';
import choroplethRegistry from '../lib/choroplethRegistry';

// Mock data for charts
const chartData = [
{
id: '1',
title: 'Global Temperature Trends',
type: 'line',
user: 'climatedata',
views: 1245,
created: '2025-04-10',
tags: ['climate', 'temperature', 'global'],
description: 'Visualization of global temperature changes over the last century.',
icon: <LineChart className="text-blue-500" size={24} />,
bgClass: 'bg-blue-50 dark:bg-blue-950/40',
previewColor: 'from-blue-400 to-blue-600'
},
{
id: '2',
title: 'Population by Region',
type: 'bar',
user: 'demographicsplus',
views: 982,
created: '2025-04-08',
tags: ['population', 'demographics', 'regions'],
description: 'Comparative view of population distribution across major world regions.',
icon: <BarChart3 className="text-purple-500" size={24} />,
bgClass: 'bg-blue-50 dark:bg-blue-950/40',
previewColor: 'from-purple-400 to-purple-600'
},
{
id: '3',
title: 'Market Share Q3 2025',
type: 'pie',
user: 'bizanalytics',
views: 756,
created: '2025-04-05',
tags: ['business', 'market', 'analysis'],
description: 'Breakdown of market share among top competitors in the tech industry.',
icon: <PieChart className="text-teal-500" size={24} />,
bgClass: 'bg-teal-50 dark:bg-teal-950/40',
previewColor: 'from-teal-400 to-teal-600'
},
{
id: '4',
title: 'Correlation Study Results',
type: 'scatter',
user: 'researchteam',
views: 631,
created: '2025-04-02',
tags: ['research', 'correlation', 'study'],
description: 'Visualization of correlation between two variables in our latest study.',
icon: <ScatterChart className="text-amber-500" size={24} />,
bgClass: 'bg-amber-50 dark:bg-amber-950/40',
previewColor: 'from-amber-400 to-amber-600'
},
{
id: '5',
title: 'Sales Performance 2025',
type: 'bar',
user: 'salesinsights',
views: 892,
created: '2025-03-28',
tags: ['sales', 'performance', 'quarterly'],
description: 'Quarterly breakdown of sales performance across product categories.',
icon: <BarChart3 className="text-indigo-500" size={24} />,
bgClass: 'bg-indigo-50 dark:bg-indigo-950/40',
previewColor: 'from-indigo-400 to-indigo-600'
},
{
id: '6',
title: 'Energy Consumption Patterns',
type: 'line',
user: 'energydata',
views: 576,
created: '2025-03-25',
tags: ['energy', 'consumption', 'sustainability'],
description: 'Tracking patterns of energy usage across different sectors.',
icon: <LineChart className="text-green-500" size={24} />,
bgClass: 'bg-green-50 dark:bg-green-950/40',
previewColor: 'from-green-400 to-green-600'
},
{
id: '7',
title: 'Expense Distribution',
type: 'pie',
user: 'budgettracker',
views: 743,
created: '2025-03-20',
tags: ['finance', 'budget', 'expenses'],
description: 'Breakdown of monthly expenses by category for budget analysis.',
icon: <PieChart className="text-rose-500" size={24} />,
bgClass: 'bg-rose-50 dark:bg-rose-950/40',
previewColor: 'from-rose-400 to-rose-600'
},
{
id: '8',
title: 'Product Feature Comparison',
type: 'bar',
user: 'productanalyst',
views: 624,
created: '2025-03-15',
tags: ['product', 'features', 'comparison'],
description: 'Side-by-side comparison of feature sets across our product line.',
icon: <BarChart3 className="text-blue-500" size={24} />,
bgClass: 'bg-blue-50 dark:bg-blue-950/40',
previewColor: 'from-blue-400 to-blue-600'
},
{
id: '9',
title: 'India State-wise Data Map',
type: 'indiaChoropleth',
user: 'mapdata',
views: 523,
created: '2025-04-15',
tags: ['india', 'states', 'choropleth'],
description: 'Choropleth map showing state-wise metrics in India.',
icon: <Map className="text-lime-500" size={24} />,
bgClass: 'bg-lime-50 dark:bg-lime-950/40',
previewColor: 'from-lime-400 to-lime-600'
},
{
  id: '10',
  title: 'Delhi Map',
  type: 'delhiChoropleth',
  user: 'mapdata',
  views: 432,
  created: '2025-04-16',
  tags: ['india', 'map', 'proportional'],
  description: 'Choropleth map showing district level meterics of Delhi.',
  icon: <Map className="text-cyan-500" size={24} />,
  bgClass: 'bg-cyan-50 dark:bg-cyan-950/40',
  previewColor: 'from-cyan-400 to-cyan-600'
},
];

const DashboardPage: React.FC = () => {
const [searchTerm, setSearchTerm] = useState('');
const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
const [activeFilter, setActiveFilter] = useState<string>('all');
const [activeTag, setActiveTag] = useState<string | null>(null);

// Get unique tags from all charts
const allTags = Array.from(
new Set(chartData.flatMap(chart => chart.tags))
).sort();

// Filter charts based on search term, active filter, and selected tag
const filteredCharts = chartData.filter(chart => {
  const matchesSearch = chart.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chart.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chart.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

  const matchesType = activeFilter === 'all' || chart.type === activeFilter;
  const matchesTag = !activeTag || chart.tags.includes(activeTag);

  return matchesSearch && matchesType && matchesTag;
});

const handleTagClick = (tag: string) => {
setActiveTag(tag === activeTag ? null : tag);
setActiveFilter('all'); // Reset type filter when selecting a tag
};

return ( 
  <div className="container mx-auto max-w-6xl px-4 py-8">


  <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
        <div className="relative flex-grow md:mr-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            placeholder="Search charts by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="flex p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
            <button
              className={`p-1.5 rounded ${activeFilter === 'all' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              className={`p-1.5 rounded flex items-center ${activeFilter === 'bar' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
              onClick={() => setActiveFilter('bar')}
            >
              <BarChart3 size={16} className="mr-1" /> Bar
            </button>
            <button
              className={`p-1.5 rounded flex items-center ${activeFilter === 'line' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
              onClick={() => setActiveFilter('line')}
            >
              <LineChart size={16} className="mr-1" /> Line
            </button>
            <button
              className={`p-1.5 rounded flex items-center ${activeFilter === 'pie' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
              onClick={() => setActiveFilter('pie')}
            >
              <PieChart size={16} className="mr-1" /> Pie
            </button>
          </div>
          
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <button
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-50 dark:bg-gray-700'}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <Grid size={20} />
            </button>
            <button
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-50 dark:bg-gray-700'}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center ${
              activeTag === tag
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            #{tag}
            {activeTag === tag && (
              <X size={14} className="ml-1" />
            )}
          </button>
        ))}
      </div>
    </div>
  </div>

  <div className="mb-6 flex items-center justify-between">
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Showing {filteredCharts.length} {filteredCharts.length === 1 ? 'chart' : 'charts'}
      {activeFilter !== 'all' && ` of type ${activeFilter}`}
      {activeTag && ` tagged with #${activeTag}`}
      {searchTerm && ` matching "${searchTerm}"`}
    </p>
    
    <div className="flex items-center">
      <SlidersHorizontal size={16} className="mr-2 text-gray-500" />
      <span className="text-sm text-gray-600 dark:text-gray-400">Sort by: </span>
      <select className="ml-2 text-sm bg-transparent border-0 outline-none cursor-pointer">
        <option>Most Popular</option>
        <option>Newest</option>
        <option>Oldest</option>
      </select>
    </div>
  </div>

  {viewMode === 'grid' && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredCharts.map((chart) => (
        <div 
          key={chart.id}
          className={`${chart.bgClass} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              {chart.icon}
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(chart.created).toLocaleDateString()}
              </div>
            </div>
            <h3 className="font-semibold mb-1">{chart.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">by @{chart.user}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {chart.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative h-36 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
            {chart.type === 'bar' && (
              <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                {[0.65, 0.4, 0.8, 0.3, 0.55, 0.7].map((height, index) => (
                  <div 
                    key={index}
                    className={`w-[12.5%] bg-gradient-to-t ${chart.previewColor} rounded-t opacity-80`}
                    style={{ height: `${height * 100}%` }}
                  ></div>
                ))}
              </div>
            )}
            
            {chart.type === 'line' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 50" className="w-full h-full px-4 py-6">
                  <path
                    d="M0,25 Q25,10 50,30 T100,20"
                    fill="none"
                    stroke={`url(#${chart.id}-gradient)`}
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id={`${chart.id}-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
            
            {chart.type === 'pie' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="20" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke={`url(#${chart.id}-pie-gradient)`} strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="50" />
                  <defs>
                    <linearGradient id={`${chart.id}-pie-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2dd4bf" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
            
            {chart.type === 'scatter' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full p-4">
                  {[
                    [20, 30], [30, 50], [40, 35], [50, 60], [60, 45], [70, 70], [80, 30]
                  ].map(([cx, cy], index) => (
                    <circle
                      key={index}
                      cx={cx}
                      cy={cy}
                      r="3"
                      className="fill-amber-500 opacity-80"
                    />
                  ))}
                </svg>
              </div>
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
  )}

  {viewMode === 'list' && (
    <div className="space-y-4">
      {filteredCharts.map((chart) => (
        <div 
          key={chart.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
        >
          <div className="flex flex-col md:flex-row">
            <div className={`relative w-full md:w-48 h-36 ${chart.bgClass} flex items-center justify-center`}>
              {chart.type === 'bar' && (
                <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                  {[0.65, 0.4, 0.8, 0.3, 0.55].map((height, index) => (
                    <div 
                      key={index}
                      className={`w-1/6 bg-gradient-to-t ${chart.previewColor} rounded-t opacity-80`}
                      style={{ height: `${height * 100}%` }}
                    ></div>
                  ))}
                </div>
              )}
              
              {chart.type === 'line' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 50" className="w-full h-full px-4 py-6">
                    <path
                      d="M0,25 Q25,10 50,30 T100,20"
                      fill="none"
                      stroke={`url(#list-${chart.id}-gradient)`}
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id={`list-${chart.id}-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}
              
              {chart.type === 'pie' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="20" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke={`url(#list-${chart.id}-pie-gradient)`} strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="50" />
                    <defs>
                      <linearGradient id={`list-${chart.id}-pie-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}
              
              {chart.type === 'scatter' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-4">
                    {[
                      [20, 30], [30, 50], [40, 35], [50, 60], [60, 45], [70, 70], [80, 30]
                    ].map(([cx, cy], index) => (
                      <circle
                        key={index}
                        cx={cx}
                        cy={cy}
                        r="3"
                        className="fill-amber-500 opacity-80"
                      />
                    ))}
                  </svg>
                </div>
              )}
            </div>
            
            <div className="p-4 flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    {chart.icon}
                    <h3 className="font-semibold ml-2">{chart.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">by @{chart.user} • {new Date(chart.created).toLocaleDateString()}</p>
                </div>
                <Link 
                  to={`/chart/${chart.id}`}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  View
                </Link>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                {chart.description}
              </p>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {chart.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {chart.views}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}

  <div className="mt-10 flex justify-center">
    <nav className="inline-flex items-center rounded-md shadow-sm">
      <button className="px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        Previous
      </button>
      <button className="px-3 py-2 border-t border-b border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
        1
      </button>
      <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        2
      </button>
      <button className="px-3 py-2 border-t border-b border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        3
      </button>
      <button className="px-3 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        Next
      </button>
    </nav>
  </div>
</div>

  );
};

export default DashboardPage;
