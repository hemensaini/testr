import React from 'react';

interface RangeBarChartProps {
  data: { label: string; min: number; max: number }[];
  width?: number;
  height?: number;
  title?: string;
  colors?: { bar?: string; background?: string; text?: string };
}

const RangeBarChart: React.FC<RangeBarChartProps> = ({
  data,
  width = 600,
  height = 300,
  title,
  colors = {
    bar: '#3b82f6',
    background: '#f3f4f6',
    text: '#111827',
  },
}) => {
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barHeight = 20;
  const spacing = 30;

  const allValues = data.flatMap(d => [d.min, d.max]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  const scaleX = (val: number) => padding + ((val - minValue) / (maxValue - minValue)) * chartWidth;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={title || 'Range Bar Chart'}
    >
      {title && (
        <text x={width / 2} y={padding / 2} textAnchor="middle" fontSize="16" fill={colors.text}>
          {title}
        </text>
      )}

      {/* Gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map(p => {
        const x = padding + chartWidth * p;
        return (
          <line
            key={p}
            x1={x}
            y1={padding}
            x2={x}
            y2={height - padding}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        );
      })}

      {/* Bars */}
      {data.map((d, i) => {
        const y = padding + i * spacing;
        const barX = scaleX(d.min);
        const barWidth = scaleX(d.max) - barX;

        return (
          <g key={i}>
            <rect
              x={barX}
              y={y - barHeight / 2}
              width={barWidth}
              height={barHeight}
              fill={colors.bar}
              rx={4}
            />
            <text
              x={padding - 5}
              y={y + 4}
              fontSize="12"
              textAnchor="end"
              fill={colors.text}
            >
              {d.label}
            </text>
            <title>
              {d.label}: {d.min} - {d.max}
            </title>
          </g>
        );
      })}
    </svg>
  );
};

export default RangeBarChart;
