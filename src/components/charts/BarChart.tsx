// BarChart.tsx
import React from 'react';

interface BarChartProps {
  labels: string[];
  values: number[];
  title?: string;
  maxBarHeight?: number;
}

const BarChart: React.FC<BarChartProps> = ({ labels, values, title = "Bar Chart", maxBarHeight = 200 }) => {
  const maxValue = Math.max(...values);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex items-end space-x-4 h-[220px]">
        {values.map((value, index) => {
          const barHeight = (value / maxValue) * maxBarHeight;
          return (
            <div key={index} className="flex flex-col items-center w-10">
              <div
                className="bg-blue-500 w-full rounded-t"
                style={{ height: `${barHeight}px` }}
                title={`Value: ${value}`}
              ></div>
              <span className="mt-2 text-sm">{labels[index]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
