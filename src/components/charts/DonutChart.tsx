import React, { useState, useMemo } from 'react';

interface DonutChartProps {
  data: { label: string; value: number }[];
  size?: number;
  strokeWidth?: number;
  colors?: string[];
  title?: string;
  onSegmentClick?: (label: string, value: number) => void;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 200,
  strokeWidth = 30,
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  title,
  onSegmentClick,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const paths = useMemo(() => {
    let cumulative = 0;
    return data.map((slice, index) => {
      const valuePercent = slice.value / total;
      const strokeDasharray = `${valuePercent * circumference} ${circumference}`;
      const strokeDashoffset = circumference * (1 - cumulative);
      cumulative += valuePercent;
      return {
        strokeDasharray,
        strokeDashoffset,
        color: colors[index % colors.length],
        label: slice.label,
        value: slice.value,
      };
    });
  }, [data, total, circumference, colors]);

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        role="img"
        aria-label={`Donut chart showing ${title || 'data'}`}
      >
        {/* Grid lines (simple cross) */}
        <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="#e5e7eb" strokeWidth={1} />
        <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="#e5e7eb" strokeWidth={1} />

        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {paths.map((slice, index) => (
            <circle
              key={index}
              r={radius}
              cx={size / 2}
              cy={size / 2}
              fill="transparent"
              stroke={slice.color}
              strokeWidth={strokeWidth}
              strokeDasharray={slice.strokeDasharray}
              strokeDashoffset={slice.strokeDashoffset}
              onMouseOver={() => setHoverIndex(index)}
              onMouseOut={() => setHoverIndex(null)}
              onClick={() => onSegmentClick?.(slice.label, slice.value)}
              tabIndex={0}
              className="cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 hover:opacity-80"
            />
          ))}
        </g>

        {/* Center Label */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#111827"
        >
          {title || total}
        </text>

        {hoverIndex !== null && (
          <text
            x="50%"
            y="90%"
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
          >
            {`${data[hoverIndex].label}: ${data[hoverIndex].value}`}
          </text>
        )}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center mt-4 gap-4" aria-label="Chart legend">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm text-gray-700"
            tabIndex={0}
            aria-label={`${item.label}: ${item.value}`}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colors[i % colors.length] }}
            ></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;