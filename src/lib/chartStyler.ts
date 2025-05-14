type Dataset = {
  data: number[];
  label?: string;
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  [key: string]: any;
};

type ChartData = {
  labels?: string[];
  datasets?: Dataset[];
  [key: string]: any;
};

export function generateStyledChartData(
  chartData: ChartData,
  colors: string[],
  chartType: string
): ChartData {
  if (
    !chartData ||
    !Array.isArray(chartData.datasets) ||
    chartData.datasets.length === 0
  ) {
    return { ...chartData, datasets: [] };
  }

  const clonedData: ChartData =
    typeof structuredClone === 'function'
      ? structuredClone(chartData)
      : JSON.parse(JSON.stringify(chartData)); // fallback for environments without structuredClone

  const chartTypeLower = chartType?.toLowerCase() || '';
  const isRowBased = ['pie', 'doughnut', 'donut'].includes(chartTypeLower);

  const styledDatasets = clonedData.datasets.map((ds, idx) => {
    if (isRowBased) {
      const rowColorCount = clonedData.labels?.length || ds.data.length || 1;
      const colorArray = colors.slice(0, rowColorCount);
      return {
        ...ds,
        backgroundColor: colorArray,
        borderColor: colorArray,
      };
    } else {
      const singleColor = colors[idx % colors.length];
      return {
        ...ds,
        backgroundColor: singleColor,
        borderColor: singleColor,
      };
    }
  });

  return {
    ...clonedData,
    datasets: styledDatasets,
    labels: clonedData.labels ?? [],
  };
}
