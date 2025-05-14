import React, { useState } from 'react';

interface LineChartProps {
  labels: string[];
  values: number[];
  width?: number;
  height?: number;
  title?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  labels,
  values,
  width = 400,
  height = 200,
  title = 'Line Chart',
}) => {
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const valueRange = maxValue - minValue || 1;

  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; value: number } | null>(null);

  const getX = (index: number) => (index / (values.length - 1)) * chartWidth + padding;
  const getY = (val: number) => padding + ((maxValue - val) / valueRange) * chartHeight;

  const points = values.map((val, i) => ({
    x: getX(i),
    y: getY(val),
    label: labels[i],
    value: val,
  }));

  const createBezierPath = () => {
    if (points.length < 2) return '';

    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const midX = (p0.x + p1.x) / 2;
      d += ` Q ${midX},${p0.y} ${p1.x},${p1.y}`;
    }
    return d;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto border rounded bg-white">
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((r, i) => {
          const y = padding + chartHeight * r;
          return (
            <line
              key={i}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              stroke="#ddd"
              strokeDasharray="4"
            />
          );
        })}

        {/* Curve path */}
        <path
          d={createBezierPath()}
          fill="none"
          stroke="blue"
          strokeWidth={2}
        />

        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="blue"
            onMouseOver={() => setTooltip(p)}
            onMouseOut={() => setTooltip(null)}
          />
        ))}

        {/* X-axis labels */}
        {labels.map((label, i) => (
          <text
            key={i}
            x={getX(i)}
            y={height - 10}
            fontSize="10"
            textAnchor="middle"
          >
            {label}
          </text>
        ))}

        {/* Tooltip */}
        {tooltip && (
          <g>
            <rect
              x={tooltip.x - 30}
              y={tooltip.y - 40}
              width="60"
              height="30"
              fill="black"
              rx={4}
              ry={4}
            />
            <text
              x={tooltip.x}
              y={tooltip.y - 22}
              textAnchor="middle"
              fill="white"
              fontSize="10"
            >
              {tooltip.label}
            </text>
            <text
              x={tooltip.x}
              y={tooltip.y - 10}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              {tooltip.value}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default LineChart;
