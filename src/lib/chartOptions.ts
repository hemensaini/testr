
const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

const baseChoroplethPlugins = (titleText) => ({
  title: {
    display: true,
    text: titleText
  },
  legend: {
    display: false
  },
  tooltip: {
    enabled: true,
    callbacks: {
      label: function (context) {
        return `${context.label}: ${context.raw}`;
      }
    }
  }
});

const choroplethScales = {
  y: { display: false },
  x: { display: false }
};

const createChoroplethConfig = ({ title, domain, range, projection = 'geoMercator' }) => ({
  ...baseChartOptions,
  plugins: baseChoroplethPlugins(title),
  scales: choroplethScales,
  geo: {
    projection,
    colorScale: {
      type: 'quantize',
      domain,
      range
    }
  }
});

export const chartOptions = {
  bar: {
    ...baseChartOptions,
    plugins: {
      title: { display: true, text: 'Monthly Sales Comparison' },
      legend: { position: 'top' }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Value ($)' }
      },
      x: {
        title: { display: true, text: 'Month' }
      }
    }
  },

  donut: {
    ...baseChartOptions,
    plugins: {
      title: { display: true, text: 'Donut Chart Overview' },
      legend: { position: 'top' }
    },
    cutout: '70%'
  },

  pie: {
    ...baseChartOptions,
    plugins: {
      title: { display: true, text: 'Budget Allocation' },
      legend: { position: 'top' }
    }
  },

  line: {
    ...baseChartOptions,
    plugins: {
      title: { display: true, text: 'Website Traffic Trends' },
      legend: { position: 'top' }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Visitors' }
      },
      x: {
        title: { display: true, text: 'Month' }
      }
    }
  },

  multiLine: {
    ...baseChartOptions,
    plugins: {
      title: { display: true, text: 'Multi-Line Chart' },
      legend: { position: 'top' }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Value' }
      },
      x: {
        title: { display: true, text: 'Time' }
      }
    }
  },

  stackedBar: {
    ...baseChartOptions,
    plugins: {
      title: { display: true, text: 'Stacked Bar Chart' },
      legend: { position: 'top' }
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        beginAtZero: true,
        title: { display: true, text: 'Value' }
      }
    }
  },

  horizontalBar: {
    ...baseChartOptions,
    indexAxis: 'y',
    plugins: {
      title: { display: true, text: 'Monthly Sales Comparison' },
      legend: { position: 'top' }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: 'Value ($)' }
      },
      y: {
        title: { display: true, text: 'Month' }
      }
    }
  },

  areachart: {
    ...baseChartOptions,
    plugins: {
      title: { display: true, text: 'Area Chart Overview' },
      legend: { position: 'top' }
    },
    elements: {
      line: { fill: true }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Y-Axis' }
      },
      x: {
        title: { display: true, text: 'X-Axis' }
      }
    }
  },

  indiaChoropleth: createChoroplethConfig({
    title: 'Choropleth Map of India by State/UT',
    domain: [50, 150],
    range: ['#d1e8ff', '#93c5fd', '#3b82f6', '#1d4ed8']
  }),

  afghanistanChoropleth: createChoroplethConfig({
    title: 'Choropleth Map of Afghanistan by Province',
    domain: [50, 100],
    range: ['#d1e8ff', '#93c5fd', '#3b82f6', '#1d4ed8']
  }),

  indonesiaChoropleth: createChoroplethConfig({
    title: 'Choropleth Map of Indonesia by Province',
    domain: [50, 100],
    range: ['#d1fae5', '#6ee7b7', '#10b981', '#065f46']
  }),

  albaniaChoropleth: createChoroplethConfig({
    title: 'Choropleth Map of Albania by County',
    domain: [60, 90],
    range: ['#d1e8ff', '#93c5fd', '#3b82f6', '#1d4ed8']
  }),

  delhiChoropleth: createChoroplethConfig({
    title: 'Choropleth Map of Delhi by District',
    domain: [70, 100],
    range: ['#dbeafe', '#93c5fd', '#3b82f6', '#1e3a8a']
  }),

  usaChoropleth: createChoroplethConfig({
    title: 'Choropleth Map of the United States by State',
    domain: [50, 150],
    range: ['#d1e8ff', '#93c5fd', '#3b82f6', '#1d4ed8'],
    projection: 'geoAlbersUsa'
  })
};
