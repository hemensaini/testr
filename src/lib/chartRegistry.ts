import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import AreaChart from '../components/charts/AreaChart';
import DonutChart from '../components/charts/DonutChart';
import MultiLineChart from '../components/charts/MultiLineChart';
import RadialBarChart from '../components/charts/RadialBarChart';
import StackedBarChart from '../components/charts/StackedBarChart';
import { ChartRegistry } from './types';
import { choroplethMeta } from './choroplethMeta';
import choroplethRegistry from './choroplethRegistry';

export const chartRegistry: ChartRegistry = {
  bar: {
    name: 'Bar Chart',
    component: BarChart,
    info: {
      id: 'bar',
      name: 'Bar Chart',
      description: 'Compare values across categories',
      category: 'basic',
      examples: ['Sales comparison', 'Population distribution'],
      dataRequirements: {
        structure: 'Categories and values',
        variables: [
          { type: 'categorical', required: true, description: 'X-axis categories' },
          { type: 'numeric', required: true, description: 'Y-axis values' },
        ],
      },
    },
  },
  line: {
    name: 'Line Chart',
    component: LineChart,
    info: {
      id: 'line',
      name: 'Line Chart',
      description: 'Show trends over time',
      category: 'basic',
      examples: ['Time series', 'Trend analysis'],
      dataRequirements: {
        structure: 'Time points and values',
        variables: [
          { type: 'temporal', required: true, description: 'X-axis time points' },
          { type: 'numeric', required: true, description: 'Y-axis values' },
        ],
      },
    },
  },
  pie: {
    name: 'Pie Chart',
    component: PieChart,
    info: {
      id: 'pie',
      name: 'Pie Chart',
      description: 'Show parts of a whole',
      category: 'basic',
      examples: ['Market share', 'Budget allocation'],
      dataRequirements: {
        structure: 'Categories and values',
        variables: [
          { type: 'categorical', required: true, description: 'Segments' },
          { type: 'numeric', required: true, description: 'Values' },
        ],
      },
    },
  },
};

// Dynamically extend registry for choropleth maps
for (const country in choroplethMeta) {
  const meta = choroplethMeta[country];
  const ChartComponent = choroplethRegistry[country];

  if (ChartComponent) {
    (chartRegistry as any)[`${country}Choropleth`] = {
      name: meta.title,
      component: ChartComponent,
      info: {
        id: `${country}Choropleth`,
        name: meta.title,
        description: meta.description,
        category: 'geo',
        examples: meta.examples,
        dataRequirements: {
          structure: `${meta.geoLabel} and values`,
          variables: [
            { type: 'geographic', required: true, description: meta.geoLabel },
            { type: 'numeric', required: true, description: 'Values for color intensity' },
          ],
        },
      },
    };
  }
}
