import React, { useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { ChartType } from './types';
import choroplethRegistry from '../../lib/choroplethRegistry';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  type: ChartType;
  data: any;
  options: any;
  altText?: string;
  colorThemeColors?: string[];
  colorScaleIndex?: number;
}

const Chart: React.FC<ChartProps> = ({
  type,
  data,
  options,
  altText,
  colorThemeColors,
  colorScaleIndex
}) => {
  const chartOptions = useMemo(() => {
    const isCircular = type === 'pie' || type === 'donut';

    return {
      ...options,
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 750 },
      plugins: {
        ...options.plugins,
        legend: {
          ...options.plugins?.legend,
          labels: {
            ...options.plugins?.legend?.labels,
            font: {
              family: options.font?.family || 'system-ui',
              size: options.font?.size || 12,
            },
            color: options.font?.color,
          },
        },
        title: {
          ...options.plugins?.title,
          font: {
            family: options.font?.family || 'system-ui',
            size: (options.font?.size || 12) * 1.5,
          },
          color: options.font?.color,
        },
        tooltip: {
          ...options.plugins?.tooltip,
          callbacks: {
            ...(options.plugins?.tooltip?.callbacks || {}),
            label: function (context: any) {
              const label = context.label ?? '';
              const value = context.parsed?.y ?? context.parsed;
              const meta = data.meta?.[context.dataIndex] ?? '';
              return `${label}: ${value}${meta ? ` (meta: ${meta})` : ''}`;
            },
          },
        },
      },
      scales: !isCircular
        ? {
            x: {
              ...options.scales?.x,
              ticks: {
                font: {
                  family: options.font?.family || 'system-ui',
                  size: options.font?.size || 12,
                },
                color: options.font?.color,
              },
              grid: {
                color: options.gridColor,
              },
            },
            y: {
              ...options.scales?.y,
              ticks: {
                font: {
                  family: options.font?.family || 'system-ui',
                  size: options.font?.size || 12,
                },
                color: options.font?.color,
              },
              grid: {
                color: options.gridColor,
              },
            },
          }
        : undefined,
    };
  }, [options, type, data.meta]);

  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data.datasets)) {
      console.warn("Invalid chart data:", data);
      return { labels: [], datasets: [] };
    }

    return {
      ...data,
      datasets: data.datasets.map((ds: any) => ({
        ...ds,
        data: Array.isArray(ds.data) ? [...ds.data] : []
      }))
    };
  }, [data]);

  useEffect(() => {
    ChartJS.defaults.color = options.font?.color;
    ChartJS.defaults.borderColor = options.gridColor;
  }, [options.font?.color, options.gridColor]);

  const renderChart = () => {
    const isChoropleth = type.endsWith('Choropleth');
    if (isChoropleth) {
      const key = type.replace('Choropleth', '').toLowerCase();
      const ChoroplethComponent = choroplethRegistry[key];
      if (ChoroplethComponent) {
        return (
          <ChoroplethComponent
            data={data}
            colorThemeColors={colorThemeColors}
            colorScaleIndex={colorScaleIndex}
          />
        );
      }
    }

    switch (type) {
      case 'bar':
      case 'groupedBar':
        return <Bar data={chartData} options={chartOptions} />;

      case 'stackedBar':
        return <Bar data={chartData} options={{
          ...chartOptions,
          scales: {
            x: { ...chartOptions.scales?.x, stacked: true },
            y: { ...chartOptions.scales?.y, stacked: true }
          }
        }} />;

      case 'horizontalBar':
        return <Bar data={chartData} options={{ ...chartOptions, indexAxis: 'y' }} />;

      case 'line':
      case 'multiLine':
        return <Line data={chartData} options={chartOptions} />;

      case 'area':
        return <Line data={{
          ...chartData,
          datasets: chartData.datasets.map((dataset: any) => ({
            ...dataset,
            fill: true
          }))
        }} options={chartOptions} />;

      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;

      case 'donut':
        return <Pie data={chartData} options={{ ...chartOptions, cutout: '70%' }} />;

      default:
        return <div>{type} is not supported yet.</div>;
    }
  };

  return (
    <div className="h-full w-full" role="img" aria-label={altText}>
      {renderChart()}
    </div>
  );
};

Chart.defaultProps = {
  data: {
    labels: [],
    datasets: []
  },
  options: {
    plugins: {},
    font: {
      family: 'system-ui',
      size: 12,
      color: '#000'
    },
    gridColor: '#ccc',
    scales: {}
  },
  altText: 'Chart visualization'
};

export default React.memo(Chart, (prevProps, nextProps) => {
  if (prevProps.type !== nextProps.type) return false;
  if (JSON.stringify(prevProps.data) !== JSON.stringify(nextProps.data)) return false;
  if (JSON.stringify(prevProps.options) !== JSON.stringify(nextProps.options)) return false;
  return true;
});
