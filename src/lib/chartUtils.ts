type Dataset = {
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  [key: string]: any;
};

export function applyColorsToChartData(
  chartData: { labels: string[]; datasets: Dataset[] } | undefined,
  colors: string[]
): { labels: string[]; datasets: Dataset[] } | undefined {
  if (
    !chartData ||
    !Array.isArray(chartData.datasets) ||
    chartData.datasets.length === 0
  ) {
    return chartData;
  }

  const isSingleDatasetWithMultiplePoints =
    chartData.datasets.length === 1 &&
    Array.isArray(chartData.datasets[0].data);

  if (isSingleDatasetWithMultiplePoints) {
    const dataset = chartData.datasets[0];
    return {
      ...chartData,
      datasets: [
        {
          ...dataset,
          backgroundColor: colors.slice(0, dataset.data.length),
          borderColor: colors.slice(0, dataset.data.length),
        },
      ],
    };
  }

  return {
    ...chartData,
    datasets: chartData.datasets.map((ds, idx) => ({
      ...ds,
      backgroundColor: colors[idx % colors.length],
      borderColor: colors[idx % colors.length],
    })),
  };
}
