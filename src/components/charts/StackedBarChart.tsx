import React from 'react';

interface StackedBarChartProps {
  data: { label: string; values: number[] }[];
  width?: number;
  height?: number;
  title?: string;
  colors?: string[];
  showGrid?: boolean;
  fontSize?: number;
}

const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  width = 600,
  height = 300,
  title,
  colors = defaultColors,
  showGrid = true,
  fontSize = 12,
}) => {
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxStack = Math.max(...data.map(d => d.values.reduce((a, b) => a + b, 0)));
  const barWidth = chartWidth / data.length - 10;

  const scaleY = (val: number) => (val / maxStack) * chartHeight;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={title || 'Stacked Bar Chart'}
    >
      {/* Title */}
      {title && (
        <text x={width / 2} y={20} textAnchor="middle" fontSize={fontSize + 4} fontWeight="bold">
          {title}
        </text>
      )}

      {/* Grid lines */}
      {showGrid && [0.25, 0.5, 0.75].map((p, i) => {
        const y = padding + chartHeight * p;
        return (
          <line
            key={i}
            x1={padding}
            x2={width - padding}
            y1={y}
            y2={y}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        );
      })}

      {/* Bars */}
      {data.map((d, i) => {
        const x = padding + i * (barWidth + 10);
        let y = padding + chartHeight;
        return d.values.map((v, j) => {
          const h = scaleY(v);
          y -= h;
          return (
            <g key={`${i}-${j}`}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={h}
                fill={colors[j % colors.length]}
                stroke="#fff"
                strokeWidth={1}
              />
              <title>{`${d.label} - ${v}`}</title>
            </g>
          );
        });
      })}

      {/* X Labels */}
      {data.map((d, i) => {
        const x = padding + i * (barWidth + 10) + barWidth / 2;
        return (
          <text
            key={i}
            x={x}
            y={height - 5}
            textAnchor="middle"
            fontSize={fontSize}
          >
            {d.label}
          </text>
        );
      })}

      {/* Legend */}
      {colors.map((c, i) => (
        <g key={`legend-${i}`}>
          <rect x={padding + i * 100} y={height - padding + 10} width={10} height={10} fill={c} />
          <text x={padding + i * 100 + 15} y={height - padding + 20} fontSize={fontSize}>
            Series {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default StackedBarChart;
