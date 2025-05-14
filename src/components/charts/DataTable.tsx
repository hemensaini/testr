import React, { useState, useEffect } from 'react';
import { Trash2, XCircle, CornerUpLeft, CornerUpRight, Plus, Info } from 'lucide-react';
import { CSVLink } from 'react-csv';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface DataTableProps {
  data: any;
  chartType: 'bar' | 'line' | 'pie' | 'scatter' | 'donut' | 'doughnut';
  onDataChange: (newData: any) => void;
  columnHeaders?: { label: string; value: string };
}

const DataTable: React.FC<DataTableProps> = ({ data, chartType, onDataChange, columnHeaders = { label: 'Label', value: 'Value' } }) => {
  const [history, setHistory] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const singleDatasetCharts = ['pie', 'donut', 'doughnut'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') undo();
      if (e.ctrlKey && e.key === 'y') redo();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, redoStack]);

  const pushToHistory = (newData: any) => {
    setHistory(prev => [...prev, JSON.parse(JSON.stringify(data))]);
    setRedoStack([]);
    onDataChange(newData);
  };

  const undo = () => {
    if (history.length === 0) return;
    const prev = [...history];
    const last = prev.pop();
    setHistory(prev);
    setRedoStack(r => [JSON.parse(JSON.stringify(data)), ...r]);
    onDataChange(last);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = [...redoStack];
    const first = next.shift();
    setRedoStack(next);
    setHistory(prev => [...prev, JSON.parse(JSON.stringify(data))]);
    onDataChange(first);
  };

 if (
  !data ||
  !Array.isArray(data.datasets) ||
  data.datasets.length === 0 ||
  !Array.isArray(data.labels)
) {
  return <div className="text-sm text-gray-500 dark:text-gray-400 p-4">No valid data available to display table.</div>;
}

  const handleValueChange = (datasetIndex: number, valueIndex: number, newValue: string) => {
    const value = isNaN(Number(newValue)) ? newValue : parseFloat(newValue);
    const isValid = typeof value === 'number' || typeof value === 'string';
    const cellKey = `${datasetIndex}-${valueIndex}`;

    setValidationErrors(prev => ({ ...prev, [cellKey]: !isValid }));
    if (!isValid) return;

    const newData = { ...data };
    newData.datasets[datasetIndex].data[valueIndex] = value;
    pushToHistory(newData);
  };

  const handleLabelChange = (index: number, newValue: string) => {
    const newData = { ...data };
    newData.labels[index] = newValue;
    pushToHistory(newData);
  };

  const handleMetadataChange = (index: number, newValue: string) => {
    const newData = { ...data };
    if (!newData.meta) newData.meta = [];
    newData.meta[index] = newValue;
    pushToHistory(newData);
  };

  const handleDatasetLabelChange = (index: number, newValue: string) => {
    const newData = { ...data };
    newData.datasets[index].label = newValue;
    pushToHistory(newData);
  };

  const deleteRow = (index: number) => {
    if (data.labels.length <= 1) {
      alert('At least one row must remain.');
      return;
    }
    const newData = { ...data };
    newData.labels.splice(index, 1);
    if (newData.meta) newData.meta.splice(index, 1);
    newData.datasets.forEach(dataset => {
      dataset.data.splice(index, 1);
    });
    pushToHistory(newData);
  };

  const deleteDataset = (datasetIndex: number) => {
    const newData = { ...data };
    newData.datasets.splice(datasetIndex, 1);
    pushToHistory(newData);
  };

  const addDataset = () => {
    if (singleDatasetCharts.includes(chartType) && data.datasets.length >= 1) {
      alert(`${chartType} charts support only one dataset. You can still add text metadata in cells.`);
      return;
    }

    const newData = { ...data };
    const newDataset = {
      label: `Dataset ${newData.datasets.length + 1}`,
      data: data.labels.map(() => 0),
      backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
    };
    newData.datasets.push(newDataset);
    pushToHistory(newData);
  };

const addMetadataColumn = () => {
  const newData = { ...data };

  if (newData.meta) {
    delete newData.meta;
  } else {
    const labelCount = newData.labels?.length || 0;
    newData.meta = Array(labelCount).fill('');
  }

  pushToHistory(newData);
};

  const reorderColumns = (startIndex: number, endIndex: number) => {
    const newData = { ...data };
    const [removed] = newData.datasets.splice(startIndex, 1);
    newData.datasets.splice(endIndex, 0, removed);
    pushToHistory(newData);
  };

  const sortByColumn = (datasetIndex: number) => {
    const direction = sortConfig?.key === `col-${datasetIndex}` && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const newData = { ...data };
    const combined = newData.labels.map((label: string, i: number) => ({
      label,
      meta: newData.meta?.[i] || '',
      values: newData.datasets.map(ds => ds.data[i])
    }));

    combined.sort((a, b) => {
      const aVal = a.values[datasetIndex];
      const bVal = b.values[datasetIndex];
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    newData.labels = combined.map(d => d.label);
    newData.meta = combined.map(d => d.meta);
    newData.datasets.forEach((ds, i) => {
      ds.data = combined.map(d => d.values[i]);
    });

    pushToHistory(newData);
    setSortConfig({ key: `col-${datasetIndex}`, direction });
  };

  const exportData = data.labels.map((label: string, rowIndex: number) => {
    const row: any = { [columnHeaders.label]: label, Metadata: data.meta?.[rowIndex] || '' };
    data.datasets.forEach((ds: any, i: number) => {
      row[ds.label || `Dataset ${i + 1}`] = ds.data[rowIndex];
    });
    return row;
  });

const handleLastRowChange = (label: string, values: string[], meta: string = '') => {
  const newData = { ...data };

  // Add label
  newData.labels.push(label);

  // Add meta only if meta column already exists
  if (Array.isArray(newData.meta)) {
    newData.meta.push(meta);
  }

  // Add values to each dataset
  newData.datasets.forEach((ds, i) => {
    const val = isNaN(Number(values[i])) ? values[i] : parseFloat(values[i]);
    ds.data.push(val);
  });

  pushToHistory(newData);
};



  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between">
        <div className="flex space-x-2">
          <button onClick={addDataset} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Add Dataset</button>
          <button onClick={addMetadataColumn} className="px-3 py-1.5 border border-yellow-500 dark:border-yellow-600 text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-700 transition-colors" title="Add Metadata Column">
            <Info size={16} className="inline mr-1" /> Add Metadata
          </button>
          <button onClick={undo} className="px-3 py-1.5 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors" title="Undo"><CornerUpLeft size={16} /></button>
          <button onClick={redo} className="px-3 py-1.5 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors" title="Redo"><CornerUpRight size={16} /></button>
        </div>
        <CSVLink data={exportData} filename="chart-data.csv" className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
        </CSVLink>
      </div>
      <DragDropContext onDragEnd={(result) => {
        if (!result.destination) return;
        reorderColumns(result.source.index, result.destination.index);
      }}>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
{data.meta && (
  <th className="px-6 py-3 text-left text-xs font-medium text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">Metadata</th>
)}

              <Droppable droppableId="dataset-columns" direction="horizontal">
                {(provided) => (
                  <tr ref={provided.innerRef} {...provided.droppableProps}>
                    {data.datasets.map((dataset: any, index: number) => (
                      <Draggable key={index} draggableId={`dataset-${index}`} index={index}>
                        {(draggableProvided) => (
                          <th
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            <input
                              value={dataset.label || `Dataset ${index + 1}`}
                              onChange={(e) => handleDatasetLabelChange(index, e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                            />
                            <button onClick={() => deleteDataset(index)} disabled={data.datasets.length <= 1} className={`ml-2 text-red-500 hover:text-red-700 ${data.datasets.length <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}><XCircle size={14} /></button>
                          </th>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tr>
                )}
              </Droppable>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
            {data.labels.map((label: string, labelIndex: number) => (
              <tr key={labelIndex}>
                
<td className="px-6 py-4 whitespace-nowrap">
  <div title={data.meta?.[labelIndex] || ''} className="inline-block w-full">
    <input
      type="text"
      value={label}
      onChange={(e) => handleLabelChange(labelIndex, e.target.value)}
      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
    />
  </div>
</td>

                {data.meta && (
  <td className="px-6 py-4 whitespace-nowrap">
    <input
      type="text"
      value={data.meta?.[labelIndex] ?? ''}
      onChange={(e) => handleMetadataChange(labelIndex, e.target.value)}
      className="w-full px-2 py-1 border border-yellow-400 dark:border-yellow-500 rounded-md bg-white dark:bg-gray-800"
    />
  </td>
)}

                {data.datasets.map((dataset: any, datasetIndex: number) => {
                  const cellKey = `${datasetIndex}-${labelIndex}`;
                  return (
                    <td key={datasetIndex} className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={dataset.data?.[labelIndex] ?? ''}
                        onChange={(e) => handleValueChange(datasetIndex, labelIndex, e.target.value)}
                        className={`w-full px-2 py-1 border ${validationErrors[cellKey] ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 rounded-md bg-white dark:bg-gray-800`}
                        title={validationErrors[cellKey] ? 'Only numbers allowed' : ''}
                      />
                    </td>
                  );
                })}
                <td className="px-6 py-4 text-center">
                  <button onClick={() => deleteRow(labelIndex)} disabled={data.labels.length <= 1} className={`text-red-500 hover:text-red-700 ${data.labels.length <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
  <td className="px-6 py-4 whitespace-nowrap">
    <input
      type="text"
      placeholder="Add label"
      id="new-label"
      className="w-full px-2 py-1 border border-green-500 rounded-md bg-green-50"
    />
  </td>

  {data.meta && (
    <td className="px-6 py-4 whitespace-nowrap">
      <input
        type="text"
        placeholder="Add metadata"
        id="new-meta"
        className="w-full px-2 py-1 border border-yellow-400 rounded-md bg-yellow-50"
      />
    </td>
  )}

  {data.datasets.map((_, datasetIndex: number) => (
    <td key={datasetIndex} className="px-6 py-4 whitespace-nowrap">
      <input
        type="number"
        placeholder="0"
        className="w-full px-2 py-1 border border-green-500 rounded-md bg-green-50"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const label = (document.getElementById('new-label') as HTMLInputElement)?.value.trim();
            const meta = (document.getElementById('new-meta') as HTMLInputElement)?.value.trim() || '';
            const inputs = document.querySelectorAll<HTMLInputElement>('td input[type="number"]');
            const values = Array.from(inputs).map(input => input.value);
            if (label) handleLastRowChange(label, values, meta);
          }
        }}
      />
    </td>
  ))}

  <td className="px-6 py-4 text-center text-green-500">
  <button
    onClick={() => {
      const label = (document.getElementById('new-label') as HTMLInputElement)?.value.trim();
      const meta = (document.getElementById('new-meta') as HTMLInputElement)?.value.trim() || '';
      const inputs = document.querySelectorAll<HTMLInputElement>('td input[type="number"]');
      const values = Array.from(inputs).map(input => input.value);
      if (label) handleLastRowChange(label, values, meta);
    }}
    className="hover:text-green-700"
    title="Add row"
  >
    <Plus size={18} />
  </button>
</td>
</tr>

          </tbody>
        </table>
      </DragDropContext>
    </div>
  );
};

export default DataTable;
