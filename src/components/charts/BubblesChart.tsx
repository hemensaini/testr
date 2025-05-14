import React from 'react';

interface BubbleChartProps {
  data: { x: number; y: number; z: number; label?: string }[];
  width?: number;
  height?: number;
  colors?: string[];
  title?: string;
  showGridLines?: boolean;
  tooltipFormatter?: (d: any) => string;
  ariaLabel?: string;
}

const BubbleChart: React.FC<BubbleChartProps> = ({
  data,
  width = 600,
  height = 400,
  colors = ['#3b82f6'],
  title = 'Bubble Chart',
  showGridLines = true,
  tooltipFormatter,
  ariaLabel = 'Bubble chart showing data distribution with x and y coordinates and size representing magnitude.',
}) => {
  const padding = 40;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;
  const maxX = Math.max(...data.map((d) => d.x));
  const maxY = Math.max(...data.map((d) => d.y));
  const maxZ = Math.max(...data.map((d) => d.z));

  const scaleX = (x: number) => (x / maxX) * chartWidth + padding;
  const scaleY = (y: number) => height - padding - (y / maxY) * chartHeight;
  const scaleR = (z: number) => Math.sqrt((z / maxZ) * 1000) + 4;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={ariaLabel}
      >
        {/* Title */}
        {title && (
          <text
            x={width / 2}
            y={padding / 2}
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
          >
            {title}
          </text>
        )}

        {/* Grid Lines */}
        {showGridLines && (
          <g>
            {[0.25, 0.5, 0.75].map((f, i) => (
              <line
                key={i}
                x1={padding}
                x2={width - padding}
                y1={padding + f * chartHeight}
                y2={padding + f * chartHeight}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
            ))}
          </g>
        )}

        {/* Bubbles */}
        {data.map((d, i) => (
          <g key={i}>
            <circle
              cx={scaleX(d.x)}
              cy={scaleY(d.y)}
              r={scaleR(d.z)}
              fill={colors[i % colors.length]}
              opacity={0.6}
              stroke="#333"
              strokeWidth={0.5}
            >
              <title>{tooltipFormatter ? tooltipFormatter(d) : `${d.label ?? ''} (${d.x}, ${d.y}, size: ${d.z})`}</title>
            </circle>
            {d.label && (
              <text
                x={scaleX(d.x)}
                y={scaleY(d.y)}
                textAnchor="middle"
                fontSize="10"
                fill="#111"
              >
                {d.label}
              </text>
            )}
          </g>
        ))}

        {/* Axes */}
        <line x1={padding} x2={padding} y1={padding} y2={height - padding} stroke="#000" strokeWidth={1} />
        <line x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} stroke="#000" strokeWidth={1} />
      </svg>
    </div>
  );
};

export default BubbleChart;
