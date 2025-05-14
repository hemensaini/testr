import { ChartTypeInfo } from '../components/charts/types';
import { choroplethMeta } from './choroplethMeta';

export const chartTypes: ChartTypeInfo[] = [
  {
    id: 'bar',
    name: 'Bar Chart',
    description: 'Compare values across categories or show distribution of data.',
    category: 'basic',
    examples: [
      'Sales comparison by region',
      'Population distribution by age group',
      'Survey response breakdown'
    ],
    dataRequirements: {
      structure: 'One categorical variable and one or more numeric variables',
      variables: [
        {
          type: 'categorical',
          required: true,
          description: 'Categories for x-axis (e.g., product names, regions)'
        },
        {
          type: 'numeric',
          required: true,
          description: 'Values for y-axis (e.g., sales amounts, quantities)'
        }
      ]
    }
  },
  {
    id: 'donut',
    name: 'Donut Chart',
    description: 'Show proportions with a central space for labeling.',
    category: 'basic',
    examples: [
      'Budget breakdown',
      'User distribution by type',
      'Revenue share by product'
    ],
    dataRequirements: {
      structure: 'One categorical and one numeric variable',
      variables: [
        {
          type: 'categorical',
          required: true,
          description: 'Segments or categories'
        },
        {
          type: 'numeric',
          required: true,
          description: 'Values representing proportions'
        }
      ]
    }
  },
  {
    id: 'multiLine',
    name: 'Multi-Line Chart',
    description: 'Track multiple series over time on the same axis.',
    category: 'basic',
    examples: [
      'Product sales over time',
      'Multiple stock trends',
      'Sensor data comparison'
    ],
    dataRequirements: {
      structure: 'One temporal variable and multiple numeric series',
      variables: [
        {
          type: 'temporal',
          required: true,
          description: 'Time values'
        },
        {
          type: 'numeric',
          required: true,
          description: 'Series values'
        }
      ]
    }
  },
  {
    id: 'stackedBar',
    name: 'Stacked Bar Chart',
    description: 'Break bars into segments showing sub-category parts.',
    category: 'basic',
    examples: [
      'Total revenue by region and source',
      'Survey responses split by gender',
      'Budget breakdowns'
    ],
    dataRequirements: {
      structure: 'Main categories with sub-category stacks',
      variables: [
        {
          type: 'categorical',
          required: true,
          description: 'Main categories'
        },
        {
          type: 'categorical',
          required: true,
          description: 'Sub-categories'
        },
        {
          type: 'numeric',
          required: true,
          description: 'Values'
        }
      ]
    }
  },
  {
    id: 'horizontalBar',
    name: 'Horizontal Bar Chart',
    description: 'Perfect for comparing values with long category labels or many categories.',
    category: 'basic',
    examples: [
      'Survey responses with long option text',
      'Rankings with detailed labels',
      'Performance metrics by department'
    ],
    dataRequirements: {
      structure: 'One categorical variable and one or more numeric variables',
      variables: [
        {
          type: 'categorical',
          required: true,
          description: 'Categories for y-axis (e.g., long text labels)'
        },
        {
          type: 'numeric',
          required: true,
          description: 'Values for x-axis (e.g., scores, amounts)'
        }
      ]
    }
  },
  {
    id: 'line',
    name: 'Line Chart',
    description: 'Show trends and patterns over time or a continuous sequence.',
    category: 'basic',
    examples: [
      'Stock price trends',
      'Temperature changes over time',
      'Monthly sales performance'
    ],
    dataRequirements: {
      structure: 'One temporal/sequential variable and one or more numeric variables',
      variables: [
        {
          type: 'temporal',
          required: true,
          description: 'Time series or sequence for x-axis'
        },
        {
          type: 'numeric',
          required: true,
          description: 'Values for y-axis (e.g., measurements, quantities)'
        }
      ]
    }
  },
  {
    id: 'area',
    name: 'Area Chart',
    description: 'Emphasize volume under a line chart and show part-to-whole relationships over time.',
    category: 'basic',
    examples: [
      'Market share trends',
      'Resource utilization over time',
      'Cumulative growth'
    ],
    dataRequirements: {
      structure: 'One temporal variable and one or more numeric variables that sum to a meaningful total',
      variables: [
        {
          type: 'temporal',
          required: true,
          description: 'Time series for x-axis'
        },
        {
          type: 'numeric',
          required: true,
          description: 'Values that stack or show volume'
        }
      ]
    }
  },
  {
    id: 'pie',
    name: 'Pie Chart',
    description: 'Show parts of a whole and proportional relationships.',
    category: 'basic',
    examples: [
      'Budget allocation',
      'Market share distribution',
      'Survey response breakdown'
    ],
    dataRequirements: {
      maxDataPoints: 8,
      structure: 'One categorical variable and one numeric variable that sums to 100%',
      variables: [
        {
          type: 'categorical',
          required: true,
          description: 'Categories for segments'
        },
        {
          type: 'numeric',
          required: true,
          description: 'Values that sum to a whole'
        }
      ]
    }
  },
  ...Object.entries(choroplethMeta).map(([key, meta]) => ({
    id: `${key}Choropleth`,
    name: meta.title,
    description: `Display regional data on a map of ${meta.title.replace(' Map', '')} using color intensity.`,
    category: 'geo',
    examples: meta.examples,
    dataRequirements: {
      structure: `${meta.geoLabel} and associated numeric values`,
      variables: [
        { type: 'geographic', required: true, description: meta.geoLabel },
        { type: 'numeric', required: true, description: 'Values for color intensity' }
      ]
    }
  }))
];

export const chartCategories = [
  {
    id: 'basic',
    name: 'Basic Charts',
    description: 'Common chart types for most data visualization needs'
  },
  {
    id: 'statistical',
    name: 'Statistical',
    description: 'Advanced charts for statistical analysis and data science'
  },
  {
    id: 'geo',
    name: 'Geographic',
    description: 'Maps and spatial data visualizations'
  },
  {
    id: 'interactive',
    name: 'Interactive',
    description: 'Charts with enhanced user interaction features'
  }
];

export function recommendCharts(data: any): ChartTypeInfo[] {
  const recommendations: ChartTypeInfo[] = [];

  const hasTimeData = data.columns?.some((col: any) => col.type === 'temporal');
  const hasCategoricalData = data.columns?.some((col: any) => col.type === 'categorical');
  const hasNumericData = data.columns?.some((col: any) => col.type === 'numeric');
  const hasGeoData = data.columns?.some((col: any) => col.type === 'geographic');
  const hasMultipleNumeric = data.columns?.filter((col: any) => col.type === 'numeric')?.length > 1;
  const hasGroupableData = hasCategoricalData && hasMultipleNumeric;

  if (hasCategoricalData && hasNumericData) {
    recommendations.push(
      chartTypes.find(c => c.id === 'bar')!,
      chartTypes.find(c => c.id === 'horizontalBar')!,
      chartTypes.find(c => c.id === 'pie')!,
      chartTypes.find(c => c.id === 'donut')!
    );
  }

  if (hasTimeData && hasNumericData) {
    recommendations.push(
      chartTypes.find(c => c.id === 'line')!,
      chartTypes.find(c => c.id === 'area')!,
      chartTypes.find(c => c.id === 'stackedBar')!,
      chartTypes.find(c => c.id === 'multiLine')!
    );
  }

  if (hasNumericData && hasGroupableData) {
    recommendations.push(
      chartTypes.find(c => c.id === 'groupedBar')!
    );
  }

  if (hasGeoData && hasNumericData) {
    const choropleths = Object.keys(choroplethMeta)
      .map(key => chartTypes.find(c => c.id === `${key}Choropleth`))
      .filter(Boolean) as ChartTypeInfo[];

    recommendations.push(...choropleths);
  }

  return recommendations;
}
