import React, { useState } from 'react';

interface PieChartProps {
  labels: string[];
  values: number[];
  colors?: string[];
  title?: string;
  size?: number;
}

const defaultColors = [
  '#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#0ea5e9', '#14b8a6', '#eab308', '#f43f5e'
];

const PieChart: React.FC<PieChartProps> = ({
  labels,
  values,
  colors = defaultColors,
  title = 'Pie Chart',
  size = 200,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const total = values.reduce((a, b) => a + b, 0);

  let cumulativeAngle = 0;
  const radius = size / 2;
  const center = size / 2;

  const slices = values.map((value, i) => {
    const angle = (value / total) * 360;
    const largeArc = angle > 180 ? 1 : 0;

    const x1 = center + radius * Math.cos((Math.PI / 180) * cumulativeAngle);
    const y1 = center + radius * Math.sin((Math.PI / 180) * cumulativeAngle);

    cumulativeAngle += angle;

    const x2 = center + radius * Math.cos((Math.PI / 180) * cumulativeAngle);
    const y2 = center + radius * Math.sin((Math.PI / 180) * cumulativeAngle);

    const path = `
      M ${center} ${center}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      Z
    `;

    return {
      path,
      color: colors[i % colors.length],
      label: labels[i],
      value,
      index: i,
    };
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
        {slices.map((slice, i) => (
          <path
            key={i}
            d={slice.path}
            fill={slice.color}
            stroke="#fff"
            strokeWidth={1}
            onMouseOver={() => setHoverIndex(i)}
            onMouseOut={() => setHoverIndex(null)}
          />
        ))}
        {hoverIndex !== null && (
          <g>
            <rect
              x={center - 40}
              y={center - 15}
              width="80"
              height="30"
              fill="black"
              rx={4}
              ry={4}
            />
            <text
              x={center}
              y={center}
              textAnchor="middle"
              fill="white"
              fontSize="12"
            >
              {`${slices[hoverIndex].label}: ${slices[hoverIndex].value}`}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default PieChart;
