import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, X, Table, Eye } from 'lucide-react';
import { parseFile } from '../../lib/fileParser';

interface DatasetUploaderProps {
  onDatasetAnalyzed: (data: any) => void;
}

const DatasetUploader: React.FC<DatasetUploaderProps> = ({ onDatasetAnalyzed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationStatus, setValidationStatus] = useState<'none' | 'validating' | 'valid' | 'invalid'>('none');
  const [validationMessage, setValidationMessage] = useState('');
  const [uploadedData, setUploadedData] = useState<any[] | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = [
    'CSV (.csv)',
    'JSON (.json)',
    'Excel (.xlsx, .xls)',
    'TSV (.tsv)',
    'XML (.xml)',
    'YAML (.yaml, .yml)',
    'SQLite (.sql)'
  ];
  
  const validateData = (data: any[]) => {
    setValidationStatus('validating');
    
    if (!data || data.length === 0) {
      setValidationStatus('invalid');
      setValidationMessage('File is empty');
      return false;
    }

    if (data.length < 2) {
      setValidationStatus('invalid');
      setValidationMessage('Dataset must contain at least 2 rows');
      return false;
    }

    const columnCount = Object.keys(data[0]).length;
    const hasInconsistentColumns = data.some(row => Object.keys(row).length !== columnCount);
    if (hasInconsistentColumns) {
      setValidationStatus('invalid');
      setValidationMessage('Inconsistent number of columns detected');
      return false;
    }

    setValidationStatus('valid');
    setValidationMessage('Dataset is valid and ready to use');
    return true;
  };

  const processFile = useCallback(async (file: File) => {
    try {
      const data = await parseFile(file);
      if (validateData(data)) {
        setUploadedData(data);
        setSelectedColumns(Object.keys(data[0]));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing file');
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await processFile(file);
    }
  };
  
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleColumnToggle = (column: string) => {
    setSelectedColumns(prev => 
      prev.includes(column) 
        ? prev.filter(c => c !== column)
        : [...prev, column]
    );
  };

  const handleConfirm = () => {
    if (!uploadedData) return;
    
    const processedData = uploadedData.map(row => {
      const newRow: any = {};
      selectedColumns.forEach(col => {
        newRow[col] = row[col];
      });
      return newRow;
    });

    onDatasetAnalyzed(processedData);
  };

  const handleReset = () => {
    setUploadedData(null);
    setSelectedColumns([]);
    setValidationStatus('none');
    setValidationMessage('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      {!uploadedData ? (
        <div
          className={`
            border-2 border-dashed rounded-lg p-8
            ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}
            ${validationStatus === 'valid' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}
            ${validationStatus === 'invalid' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
            <Upload className="text-blue-500" size={24} />
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Upload Your Dataset</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Drag and drop your file here, or click to browse
          </p>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <p className="font-medium mb-2">Supported formats:</p>
            <div className="flex flex-wrap gap-2">
              {supportedFormats.map((format, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json,.xlsx,.xls,.tsv,.xml,.yaml,.yml,.sql"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            Upload Data
          </label>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Preview Data</h3>
            <button
              onClick={handleReset}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Select columns to include:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.keys(uploadedData[0]).map(column => (
                <label
                  key={column}
                  className="inline-flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(column)}
                    onChange={() => handleColumnToggle(column)}
                    className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2">{column}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border rounded-lg overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {selectedColumns.map(column => (
                    <th
                      key={column}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {uploadedData.slice(0, 5).map((row, i) => (
                  <tr key={i}>
                    {selectedColumns.map(column => (
                      <td
                        key={column}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                      >
                        {row[column]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={selectedColumns.length === 0}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-start">
          <AlertCircle className="text-red-500 mt-0.5 mr-2" size={16} />
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DatasetUploader;