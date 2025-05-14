import React from 'react';

interface ChartComponentProps {
  data: any;
  options: any;
}

// This is a simplified implementation. In a real app, you would use a charting library
// like Chart.js, D3.js, or Recharts to render the actual charts.

export const BarChart: React.FC<ChartComponentProps> = ({ data, options }) => {
  const maxValue = Math.max(...data.datasets.flatMap((ds: any) => ds.data));
  
  return (
    <div className="h-full w-full flex flex-col">
      {options.plugins?.title?.display && (
        <h3 className="text-center font-semibold mb-4">{options.plugins.title.text}</h3>
      )}
      
      <div className="flex-grow flex items-end">
        <div className="w-12 flex flex-col justify-between h-full mr-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="text-xs text-gray-500 dark:text-gray-400">
              {Math.round(maxValue - (i * maxValue / 4))}
            </div>
          ))}
        </div>
        
        <div className="flex-grow h-full relative">
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="border-t border-gray-200 dark:border-gray-700 absolute w-full"
                style={{ top: `${i * 25}%` }}
              ></div>
            ))}
          </div>
          
          <div className="h-full flex items-end justify-around">
            {data.labels.map((label: string, index: number) => (
              <div key={label} className="flex flex-col items-center w-1/6">
                <div className="w-full flex justify-center space-x-1">
                  {data.datasets.map((dataset: any, dsIndex: number) => (
                    <div 
                      key={dsIndex}
                      className="w-8 transform transition-all duration-500"
                      style={{
                        height: `${(dataset.data[index] / maxValue) * 100}%`,
                        backgroundColor: dataset.backgroundColor,
                        borderColor: dataset.borderColor,
                        borderWidth: dataset.borderWidth ? `${dataset.borderWidth}px` : '0',
                      }}
                    ></div>
                  ))}
                </div>
                <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {data.datasets.length > 1 && (
        <div className="mt-4 flex justify-center">
          {data.datasets.map((dataset: any, index: number) => (
            <div key={index} className="flex items-center mx-2">
              <div 
                className="w-3 h-3 mr-1"
                style={{ backgroundColor: dataset.backgroundColor }}
              ></div>
              <span className="text-xs">{dataset.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const LineChart: React.FC<ChartComponentProps> = ({ data, options }) => {
  const maxValue = Math.max(...data.datasets.flatMap((ds: any) => ds.data));
  
  // Function to generate path for line
  const generatePath = (dataset: any) => {
    const points = dataset.data.map((value: number, index: number) => {
      const x = (index / (data.labels.length - 1)) * 100;
      const y = 100 - ((value / maxValue) * 100);
      return `${x},${y}`;
    });
    
    return `M${points.join(' L')}`;
  };
  
  return (
    <div className="h-full w-full flex flex-col">
      {options.plugins?.title?.display && (
        <h3 className="text-center font-semibold mb-4">{options.plugins.title.text}</h3>
      )}
      
      <div className="flex-grow flex items-end">
        <div className="w-12 flex flex-col justify-between h-full mr-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="text-xs text-gray-500 dark:text-gray-400">
              {Math.round(maxValue - (i * maxValue / 4))}
            </div>
          ))}
        </div>
        
        <div className="flex-grow h-full relative">
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="border-t border-gray-200 dark:border-gray-700 absolute w-full"
                style={{ top: `${i * 25}%` }}
              ></div>
            ))}
          </div>
          
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {data.datasets.map((dataset: any, index: number) => (
              <g key={index}>
                {dataset.fill && (
                  <path
                    d={`${generatePath(dataset)} L100,100 L0,100 Z`}
                    fill={dataset.backgroundColor}
                    opacity="0.2"
                  />
                )}
                <path
                  d={generatePath(dataset)}
                  fill="none"
                  stroke={dataset.borderColor}
                  strokeWidth="2"
                  className="transition-all duration-1000 ease-in-out"
                  strokeDasharray="500"
                  strokeDashoffset="500"
                  style={{ animation: 'dash 2s ease-in-out forwards' }}
                />
                {dataset.data.map((value: number, i: number) => (
                  <circle
                    key={i}
                    cx={(i / (data.labels.length - 1)) * 100}
                    cy={100 - ((value / maxValue) * 100)}
                    r="1.5"
                    fill={dataset.borderColor}
                  />
                ))}
              </g>
            ))}
          </svg>
          
          <div className="absolute bottom-0 w-full flex justify-between px-2">
            {data.labels.map((label: string) => (
              <div key={label} className="text-xs text-gray-500 dark:text-gray-400">
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {data.datasets.length > 1 && (
        <div className="mt-4 flex justify-center">
          {data.datasets.map((dataset: any, index: number) => (
            <div key={index} className="flex items-center mx-2">
              <div 
                className="w-3 h-3 mr-1 rounded-full"
                style={{ backgroundColor: dataset.borderColor }}
              ></div>
              <span className="text-xs">{dataset.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const PieChart: React.FC<ChartComponentProps> = ({ data, options }) => {
  // Calculate total value for percentages
  const total = data.datasets[0].data.reduce((acc: number, value: number) => acc + value, 0);
  
  // Generate pie segments
  const segments = data.datasets[0].data.map((value: number, index: number) => {
    const percentage = (value / total) * 100;
    return { value, percentage, color: data.datasets[0].backgroundColor[index] };
  });
  
  let cumulativePercentage = 0;
  
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {options.plugins?.title?.display && (
        <h3 className="text-center font-semibold mb-4">{options.plugins.title.text}</h3>
      )}
      
      <div className="relative w-4/5 h-4/5 max-w-xs max-h-xs">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {segments.map((segment: any, index: number) => {
            const startAngle = cumulativePercentage * 3.6; // 3.6 degrees per percentage point
            cumulativePercentage += segment.percentage;
            const endAngle = cumulativePercentage * 3.6;
            
            // Convert angles to radians
            const startRad = (startAngle - 90) * Math.PI / 180;
            const endRad = (endAngle - 90) * Math.PI / 180;
            
            const x1 = 50 + 40 * Math.cos(startRad);
            const y1 = 50 + 40 * Math.sin(startRad);
            const x2 = 50 + 40 * Math.cos(endRad);
            const y2 = 50 + 40 * Math.sin(endRad);
            
            const largeArcFlag = segment.percentage > 50 ? 1 : 0;
            
            // SVG path for pie segment
            const path = `
              M 50 50
              L ${x1} ${y1}
              A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
              Z
            `;
            
            return (
              <path
                key={index}
                d={path}
                fill={segment.color}
                stroke="white"
                strokeWidth="1"
                className="transition-all duration-500 hover:opacity-80"
              />
            );
          })}
        </svg>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
        {data.labels.map((label: string, index: number) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 mr-2"
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
            ></div>
            <span className="text-xs">{label} ({segments[index].percentage.toFixed(1)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ScatterChart: React.FC<ChartComponentProps> = ({ data, options }) => {
  // Find min and max values for x and y
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  
  data.datasets.forEach((dataset: any) => {
    dataset.data.forEach((point: any) => {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    });
  });
  
  // Add some padding
  const rangeX = maxX - minX;
  const rangeY = maxY - minY;
  minX = minX - rangeX * 0.1;
  maxX = maxX + rangeX * 0.1;
  minY = minY - rangeY * 0.1;
  maxY = maxY + rangeY * 0.1;
  
  return (
    <div className="h-full w-full flex flex-col">
      {options.plugins?.title?.display && (
        <h3 className="text-center font-semibold mb-4">{options.plugins.title.text}</h3>
      )}
      
      <div className="flex-grow flex">
        <div className="w-12 flex flex-col justify-between h-full mr-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="text-xs text-gray-500 dark:text-gray-400">
              {Math.round(maxY - (i * rangeY / 4))}
            </div>
          ))}
        </div>
        
        <div className="flex-grow h-full relative">
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="border-t border-gray-200 dark:border-gray-700 absolute w-full"
                style={{ top: `${i * 25}%` }}
              ></div>
            ))}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="border-l border-gray-200 dark:border-gray-700 absolute h-full"
                style={{ left: `${i * 25}%` }}
              ></div>
            ))}
          </div>
          
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {data.datasets.map((dataset: any, dsIndex: number) => (
              <g key={dsIndex}>
                {dataset.data.map((point: any, index: number) => {
                  // Convert data coordinates to SVG coordinates
                  const x = ((point.x - minX) / (maxX - minX)) * 100;
                  const y = 100 - ((point.y - minY) / (maxY - minY)) * 100;
                  
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r={dataset.pointRadius || 3}
                      fill={dataset.backgroundColor}
                      className="transition-all duration-300 hover:r-6"
                    />
                  );
                })}
              </g>
            ))}
          </svg>
          
          <div className="absolute bottom-0 w-full flex justify-between px-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(minX + (i * rangeX / 4))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {data.datasets.length > 1 && (
        <div className="mt-4 flex justify-center">
          {data.datasets.map((dataset: any, index: number) => (
            <div key={index} className="flex items-center mx-2">
              <div 
                className="w-3 h-3 mr-1 rounded-full"
                style={{ backgroundColor: dataset.backgroundColor }}
              ></div>
              <span className="text-xs">{dataset.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};