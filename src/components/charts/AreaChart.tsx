import React, { useState } from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface AreaChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  title?: string;
  color?: string;
  showGrid?: boolean;
  ariaLabel?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  width = 600,
  height = 300,
  title,
  color = '#3b82f6',
  showGrid = true,
  ariaLabel = 'Area chart',
}) => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; value: number } | null>(null);

  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxValue = Math.max(...data.map(d => d.value));

  const scaleX = (index: number) => padding + (index / (data.length - 1)) * chartWidth;
  const scaleY = (value: number) => padding + chartHeight - (value / maxValue) * chartHeight;

  // Generate area path with Bézier curve (Q)
  const generatePath = () => {
    const points = data.map((d, i) => [scaleX(i), scaleY(d.value)]);
    let path = `M ${points[0][0]} ${points[0][1]}`;

    for (let i = 1; i < points.length - 1; i++) {
      const [x0, y0] = points[i];
      const [x1, y1] = points[i + 1];
      const midX = (x0 + x1) / 2;
      const midY = (y0 + y1) / 2;
      path += ` Q ${x0} ${y0}, ${midX} ${midY}`;
    }

    const last = points[points.length - 1];
    path += ` T ${last[0]} ${last[1]}`;

    // Close path to bottom
    path += ` L ${last[0]} ${height - padding} L ${points[0][0]} ${height - padding} Z`;
    return path;
  };

  return (
    <div className="flex flex-col items-center" aria-label={ariaLabel}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* Title */}
        {title && (
          <text x={width / 2} y={padding / 2} textAnchor="middle" fontWeight="bold" fontSize="16">
            {title}
          </text>
        )}

        {/* Gridlines */}
        {showGrid && (
          <g stroke="#e5e7eb" strokeWidth={1}>
            {[0.25, 0.5, 0.75].map((f, i) => (
              <line
                key={i}
                x1={padding}
                x2={width - padding}
                y1={padding + chartHeight * f}
                y2={padding + chartHeight * f}
              />
            ))}
          </g>
        )}

        {/* Area Path */}
        <path
          d={generatePath()}
          fill={color}
          fillOpacity={0.3}
          stroke={color}
          strokeWidth={2}
          className="drop-shadow-sm"
        />

        {/* Circles + tooltips */}
        {data.map((d, i) => {
          const cx = scaleX(i);
          const cy = scaleY(d.value);
          return (
            <g
              key={i}
              onMouseOver={() => setTooltip({ x: cx, y: cy, label: d.label, value: d.value })}
              onMouseOut={() => setTooltip(null)}
            >
              <circle cx={cx} cy={cy} r={4} fill={color} stroke="#fff" strokeWidth={1} />
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={scaleX(i)}
            y={height - padding + 15}
            fontSize="10"
            textAnchor="middle"
          >
            {d.label}
          </text>
        ))}

        {/* Tooltip */}
        {tooltip && (
          <foreignObject x={tooltip.x - 50} y={tooltip.y - 40} width="100" height="30">
            <div className="text-xs bg-white border rounded shadow p-1">
              <div><strong>{tooltip.label}</strong></div>
              <div>{tooltip.value}</div>
            </div>
          </foreignObject>
        )}

        {/* Legend */}
        <g transform={`translate(${width / 2 - 40}, ${height - 10})`}>
          <rect width={10} height={10} fill={color} />
          <text x={15} y={10} fontSize="10">Value</text>
        </g>
      </svg>
    </div>
  );
};

export default AreaChart;
