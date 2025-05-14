import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Save, Download, ChevronRight, ArrowLeft } from 'lucide-react';
import Chart from '../../components/charts/Chart.tsx';
import DataTable from '../../components/charts/DataTable';
import ChartAppearancePanel from '../../components/ChartAppearancePanel';
import { sampleData } from '../../lib/sampleData';
import { chartOptions } from '../../lib/chartOptions';
import { chartTypeInfo } from '../../lib/chartTypeInfo';
import { colorThemes, fontFamilies, fontSizeMap } from '../../lib/chartThemes';
import choroplethRegistry from '../../lib/choroplethRegistry';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

const convertChoroplethChartData = (data: { labels: string[]; datasets: { data: number[] }[] }) => {
  const result: Record<string, number> = {};
  data.labels.forEach((label, i) => {
    result[label] = data.datasets[0].data[i] ?? 0;
  });
  return result;
};

const EditorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const chartType = searchParams.get('chart') || 'bar';
  const navigate = useNavigate();
  const fallbackType = chartType in sampleData ? chartType : 'bar';
  const [colorScaleIndex, setColorScaleIndex] = useState(1); // default index
  const [username, setUsername] = useState('');
const [usernamePosition, setUsernamePosition] = useState<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'hidden'>('hidden');

  

const getInitialChartData = (type: string) => {
  if (sampleData[type as keyof typeof sampleData]) {
    return sampleData[type as keyof typeof sampleData];
  }
  return {
    labels: [],
    datasets: [],
  };
};

const [chartData, setChartData] = useState<any>(getInitialChartData(fallbackType));
  
  const [options, setOptions] = useState(chartOptions[fallbackType as keyof typeof chartOptions]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [altText, setAltText] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [colorTheme, setColorTheme] = useState('Default Theme');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('System Default');
  const [fontSize, setFontSize] = useState('Medium');
  const [uploadMessage, setUploadMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [pendingData, setPendingData] = useState<any | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [columnHeaders, setColumnHeaders] = useState<{ label: string; value: string }>({ label: 'Label', value: 'Sample Data' });
  

 const mapData = useMemo(() => {
  if (
    ['indiaChoropleth', 'usaChoropleth', 'delhiChoropleth'].includes(chartType) &&
    chartData &&
    Array.isArray(chartData.labels) &&
    Array.isArray(chartData.datasets) &&
    Array.isArray(chartData.datasets[0]?.data)
  ) {
    // Normalize keys to lowercase for matching in Delhi Choropleth Map
    const raw = convertChoroplethChartData(chartData);
    const normalized = Object.fromEntries(
      Object.entries(raw).map(([key, val]) => [key.trim().toLowerCase(), val])
    );
    return normalized;
  }
  return null;
}, [chartType, chartData]);

  const updateFontSizeInOptions = (px: number) => {
    setOptions(prev => ({
      ...prev,
      plugins: {
        ...prev.plugins,
        title: {
          ...prev.plugins?.title,
          font: { ...(prev.plugins?.title?.font || {}), size: px }
        },
        legend: {
          ...prev.plugins?.legend,
          labels: {
            ...(prev.plugins?.legend?.labels || {}),
            font: { ...(prev.plugins?.legend?.labels?.font || {}), size: px }
          }
        }
      },
      scales: prev.scales
    }));
  };

  const updateFontFamilyInOptions = (family: string) => {
    setOptions(prev => ({
      ...prev,
      plugins: {
        ...prev.plugins,
        title: {
          ...prev.plugins?.title,
          font: { ...(prev.plugins?.title?.font || {}), family }
        },
        legend: {
          ...prev.plugins?.legend,
          labels: {
            ...(prev.plugins?.legend?.labels || {}),
            font: { ...(prev.plugins?.legend?.labels?.font || {}), family }
          }
        }
      },
      scales: prev.scales
    }));
  };

  useEffect(() => {
    const info = chartTypeInfo[fallbackType as keyof typeof chartTypeInfo];
    if (info) {
      setTitle((prevTitle) => prevTitle || info.name);
      setDescription(info.description);
      setAltText(`A ${info.name.toLowerCase()} showing ${info.description.toLowerCase()}.`);
    }
  }, [fallbackType]);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    const fallbackDark = '#1f2937';
    document.documentElement.style.setProperty('--chart-bg', isDark ? fallbackDark : backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    const themeColors = colorThemes[colorTheme] || colorThemes['Default Theme'];
    setChartData((prevData) => {
      if (!prevData || !prevData.datasets) {
        return prevData;
      }

      const isSingleDatasetWithMultipleValues =
        prevData.datasets.length === 1 &&
        Array.isArray(prevData.datasets[0].data) &&
        prevData.labels &&
        prevData.datasets[0].data.length === prevData.labels.length;

      if (isSingleDatasetWithMultipleValues) {
        return {
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              backgroundColor: themeColors.slice(0, prevData.labels.length),
              borderColor: themeColors.slice(0, prevData.labels.length),
            },
          ],
        };
      }


      return {
        ...prevData,
        datasets: prevData.datasets.map((ds: any, idx: number) => ({
          ...ds,
          backgroundColor: themeColors[idx % themeColors.length],
          borderColor: themeColors[idx % themeColors.length],
        })),
      };
    });
  }, [colorTheme]);

  const enhancedData = useMemo(() => {
  if (!chartData || !chartData.labels || !chartData.datasets) return chartData;

  const { labels, meta = [] } = chartData;

  return {
    ...chartData,
    datasets: chartData.datasets.map((ds: any) => ({
      ...ds,
      data: ds.data.map((value: any, i: number) => ({
        x: labels[i],
        y: value,
        meta: meta[i] || ''
      }))
    }))
  };
}, [chartData]);

  const handleSave = () => setShowSaveModal(true);
  const handleSaveConfirm = () => {
  const chartPayload = {
    title,
    description,
    chartData,
    chartType,
    options,
    colorTheme,
    fontFamily,
    fontSize,
    username: username || 'anonymous',
  usernamePosition
  };
  localStorage.setItem('savedChart', JSON.stringify(chartPayload));
  navigate(`/chart/${Math.floor(Math.random() * 1000)}`);
};

const handlePublish = () => {
  const publishedCharts = JSON.parse(localStorage.getItem('publishedCharts') || '[]');
  const newChart = {
    id: Date.now(),
    title,
    description,
    chartData,
    chartType,
    options,
    colorTheme,
    fontFamily,
    fontSize,
    username: username || 'anonymous',
  usernamePosition
  };
  publishedCharts.push(newChart);
  localStorage.setItem('publishedCharts', JSON.stringify(publishedCharts));
  alert('Chart published! You can view it on your profile page.');
};
const downloadPNG = () => {
  const chartContainer = document.querySelector('.chart-container'); // or use a ref
  if (!chartContainer) return;

  toPng(chartContainer)
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `${title || 'chart'}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.error('Failed to download PNG:', err);
    });
};
  const downloadPDF = () => {
  const chartContainer = document.querySelector('.chart-container');
  if (!chartContainer) return;

  toPng(chartContainer)
    .then((dataUrl) => {
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${title || 'chart'}.pdf`);
    })
    .catch((err) => {
      console.error('Failed to download PDF:', err);
    });
};
  const parseFile = async (data: ArrayBuffer | string, name = 'Uploaded Chart') => {
    const workbook = XLSX.read(data, { type: typeof data === 'string' ? 'binary' : 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json<any>(sheet);

    if (!json.length) {
      setUploadMessage('The uploaded file appears to be empty.');
      return;
    }

    const firstRow = json[0];
    const normalizedKeys = Object.fromEntries(
      Object.entries(firstRow).map(([key, _]) => [key.toLowerCase().trim(), key])
    );

    const labelKey = normalizedKeys['label'] || normalizedKeys['category'] || normalizedKeys['name'] || normalizedKeys['fruit'];
    const valueKey = normalizedKeys['value'] || normalizedKeys['units sold'] || normalizedKeys['sales'] || normalizedKeys['amount'];

    if (!labelKey || !valueKey) {
      setUploadMessage('The uploaded file must contain a label/category (e.g. "Fruit") and a value (e.g. "Units Sold").');
      return;
    }

    const labels = [];
    const dataPoints = [];

    for (const row of json) {
      if (!row[labelKey] || typeof row[valueKey] !== 'number') continue;
      labels.push(row[labelKey]);
      dataPoints.push(row[valueKey]);
    }

    const newData = {
      labels,
      datasets: [{
        label: name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        data: dataPoints,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }],
    };

    setColumnHeaders({ label: labelKey, value: valueKey });
    setPendingData(newData);
    setShowConfirmModal(true);
  };

  const confirmDataUpload = () => {
    if (!pendingData) return;
    setChartData(pendingData);
    setTitle((prev) => prev || pendingData.datasets[0].label);
    setUploadMessage('File uploaded and data parsed successfully!');
    setTimeout(() => setUploadMessage(''), 3000);
    setPendingData(null);
    setShowConfirmModal(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      parseFile(event.target?.result as ArrayBuffer, file.name);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUrlUpload = async () => {
    if (!fileUrl) return;
    try {
      const response = await fetch(fileUrl);
      const text = await response.text();
      await parseFile(text, fileUrl.split('/').pop() || 'Remote Chart');
    } catch (error) {
      setUploadMessage('Failed to fetch or parse the file.');
      setTimeout(() => setUploadMessage(''), 3000);
    }
  };

return (
  <>
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row p-6 space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Chart + Data Input */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl font-semibold mb-2 border rounded p-2 dark:bg-gray-700 dark:text-white"
              placeholder="Chart Title"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-sm mb-4 text-gray-600 dark:text-gray-300 border rounded p-2 dark:bg-gray-700"
              placeholder="Description"
            />
<div
  className="chart-container w-full border rounded-lg"
  style={{ backgroundColor: 'var(--chart-bg)', height: '600px' }}
>
  {chartType.endsWith('Choropleth') && choroplethRegistry[chartType.replace('Choropleth', '').toLowerCase()] ? (
    (() => {
      const ChoroplethMap = choroplethRegistry[chartType.replace('Choropleth', '').toLowerCase()];
      return (
        <ChoroplethMap
          data={mapData}
          width={800}
          height={550}
          colorThemeColors={colorThemes[colorTheme] || []}
          colorScaleIndex={colorScaleIndex}
        />
      );
    })()
  ) : (
    <Chart
      type={chartType as any}
      data={
        ['pie', 'donut', 'horizontalBar'].includes(chartType)
          ? chartData
          : enhancedData
      }
      options={options}
      altText={altText}
      colorThemeColors={colorThemes[colorTheme]}
      colorScaleIndex={colorScaleIndex}
      username={username}
      usernamePosition={usernamePosition}
    />
  )}
</div> 
</div>

          {/* Data Input */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Data Input</h3>
            <DataTable
              data={chartData}
              chartType={chartType as any}
              onDataChange={(newData) =>
                setChartData({
                  ...newData,
                  datasets: newData.datasets.map((ds: any) => ({ ...ds, data: [...ds.data] })),
                })
              }
              editable
              deletable
            />
            <div
              className="mt-6 border border-dashed border-gray-400 dark:border-gray-600 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                type="file"
                id="file-input"
                hidden
                accept=".csv,.xlsx,.xls,.tsv,.yml,.yaml"
                onChange={handleFileUpload}
              />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Drag and drop a CSV/XLSX/YAML file here or click to browse.
              </p>
            </div>
            <input
              type="text"
              placeholder="Paste a file URL (CSV, XLSX, etc.)"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full mt-3 p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleUrlUpload}
              className="bg-blue-500 text-white mt-2 px-4 py-2 rounded hover:bg-blue-600"
            >
              Upload from URL
            </button>
            {uploadMessage && (
              <p className="text-green-600 text-sm mt-2">{uploadMessage}</p>
            )}
          </div>
        </div>

        {/* Appearance Settings */}
<div className="w-full lg:w-80 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow h-fit">
  <h3 className="text-lg font-semibold mb-4">Appearance Settings</h3>
 {chartData && chartData.datasets && (
  <ChartAppearancePanel
    chartType={chartType}
    chartData={chartData}
    colorThemes={colorThemes}
    fontFamilies={fontFamilies}
    fontSizeMap={fontSizeMap}
    colorTheme={colorTheme}
    setColorTheme={setColorTheme}
    backgroundColor={backgroundColor}
    setBackgroundColor={setBackgroundColor}
    fontFamily={fontFamily}
    setFontFamily={setFontFamily}
    fontSize={fontSize}
    setFontSize={setFontSize}
    updateFontSizeInOptions={updateFontSizeInOptions}
    updateFontFamilyInOptions={updateFontFamilyInOptions}
    setChartData={setChartData}
    username={username}
  setUsername={setUsername}
  usernamePosition={usernamePosition}
  setUsernamePosition={setUsernamePosition}
  />
)}

  <div className="space-y-3 mt-6">
<button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSave}> Save </button>
<button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handlePublish}> Publish </button>
<button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={downloadPDF}> Download PDF </button>
    <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={downloadPNG}> Download PNG </button>
<button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => window.location.reload()}> Reset </button>
  </div>
</div>

      </div>
    </div>

    {/* Modals */}
    {showSaveModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
      <h3 className="text-xl font-bold mb-4">Save Your Chart</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Chart Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={3}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => setShowSaveModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
            onClick={handleSaveConfirm}
          >
            <ChevronRight size={18} className="mr-1" /> Save Chart
          </button>
        </div>
      </div>
    </div>
  </div>
)}


  {showConfirmModal && pendingData && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6">
      <h3 className="text-lg font-semibold mb-4">Confirm Uploaded Data</h3>
      <DataTable
        data={pendingData}
        chartType={chartType as any}
        onDataChange={(updatedData) => setPendingData(updatedData)}
        editable
        deletable
      />
      <div className="flex justify-end space-x-3 mt-4">
        <button className="px-4 py-2 border rounded" onClick={() => setShowConfirmModal(false)}>
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={confirmDataUpload}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

  </>
);
};

export default EditorPage;
