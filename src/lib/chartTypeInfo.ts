import { choroplethMeta } from './choroplethMeta';

export const chartTypeInfo = {
  bar: {
    name: 'Bar Chart',
    description: 'Bar charts are useful for comparing values across categories.',
    icon: 'BarChart3'
  },
  horizontalBar: {
    name: 'Horizontal Bar Chart',
    description: 'Horizontal bar charts are ideal for comparing values across categories with long labels.',
    icon: 'BarChartHorizontal'
  },
  line: {
    name: 'Line Chart',
    description: 'Line charts show trends over a continuous interval or time period.',
    icon: 'LineChart'
  },
  pie: {
    name: 'Pie Chart',
    description: 'Pie charts show proportional parts of a whole.',
    icon: 'PieChart'
  },
  scatter: {
    name: 'Scatter Plot',
    description: 'Scatter plots show the relationship between two variables.',
    icon: 'ScatterChart'
  },
  donut: {
    name: 'Donut Chart',
    description: 'Donut charts visualize parts of a whole with a central cutout.',
    icon: 'DonutChart'
  },
  gantt: {
    name: 'Gantt Chart',
    description: 'Gantt charts show project timelines and task durations.',
    icon: 'GanttChart'
  },
  gridHeatmap: {
    name: 'Grid Heatmap',
    description: 'Grid heatmaps visualize data intensity over a matrix.',
    icon: 'Grid'
  },
  groupedBar: {
    name: 'Grouped Bar Chart',
    description: 'Grouped bar charts compare subcategories across categories.',
    icon: 'BarChartGroup'
  },
  histogram: {
    name: 'Histogram',
    description: 'Histograms show the distribution of numerical data.',
    icon: 'Histogram'
  },
  lollipop: {
    name: 'Lollipop Chart',
    description: 'Lollipop charts highlight values with a line and circular marker.',
    icon: 'LollipopChart'
  },
  multiline: {
    name: 'Multi-Line Chart',
    description: 'Multi-line charts show trends across multiple series.',
    icon: 'MultiLineChart'
  },
  populationPyramid: {
    name: 'Population Pyramid',
    description: 'Population pyramids compare population groups side-by-side.',
    icon: 'PopulationPyramid'
  },
  radialBar: {
    name: 'Radial Bar Chart',
    description: 'Radial bar charts display values as circular bars.',
    icon: 'RadialBarChart'
  },
  slope: {
    name: 'Slope Chart',
    description: 'Slope charts highlight change between two points across groups.',
    icon: 'SlopeChart'
  },
  sparkline: {
    name: 'Sparkline Chart',
    description: 'Sparklines are compact trend charts used inline.',
    icon: 'SparklineChart'
  },
  stackedBar: {
    name: 'Stacked Bar Chart',
    description: 'Stacked bar charts show part-to-whole comparisons by stacking values.',
    icon: 'BarChartStacked'
  },
  ...Object.fromEntries(
    Object.entries(choroplethMeta).map(([key, meta]) => [
      `${key}Choropleth`,
      {
        name: meta.title,
        description: `Displays regional data on a map of ${meta.title.replace(' Map', '')} using color intensity.`,
        icon: 'Map'
      }
    ])
  )
};
