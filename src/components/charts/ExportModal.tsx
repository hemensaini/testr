import React, { useState } from 'react';
import { Download, X, Lock, AlertCircle } from 'lucide-react';
import { exportChart } from '../../lib/export';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartRef: React.RefObject<HTMLDivElement>;
  title: string;
  isPremium: boolean;
  isLoggedIn: boolean;
}

const ExportModal: React.FC<ExportModalProps> = ({ 
  isOpen, 
  onClose, 
  chartRef, 
  title, 
  isPremium,
  isLoggedIn 
}) => {
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    if (!chartRef.current) return;

    setError(null);
    setIsExporting(true);

    try {
      const exportFunctions = await exportChart({
        element: chartRef.current,
        title,
        isPremium,
        isLoggedIn
      });

      if (exportFunctions[selectedFormat as keyof typeof exportFunctions]) {
        await exportFunctions[selectedFormat as keyof typeof exportFunctions]();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Export Chart</h3>
          <button 
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedFormat === 'png'
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 text-blue-700 dark:text-blue-300'
                    : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedFormat('png')}
              >
                PNG Image
              </button>
              <button
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedFormat === 'jpeg'
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 text-blue-700 dark:text-blue-300'
                    : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedFormat('jpeg')}
              >
                JPEG Image
              </button>
              <button
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedFormat === 'svg'
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 text-blue-700 dark:text-blue-300'
                    : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                } ${!isPremium || !isLoggedIn ? 'relative' : ''}`}
                onClick={() => isPremium && isLoggedIn && setSelectedFormat('svg')}
              >
                SVG Vector
                {(!isPremium || !isLoggedIn) && (
                  <div className="absolute inset-0 bg-gray-900/60 rounded-lg flex items-center justify-center">
                    <Lock size={16} className="text-white mr-1" />
                    <span className="text-white text-sm">
                      {!isLoggedIn ? 'Login Required' : 'Premium'}
                    </span>
                  </div>
                )}
              </button>
              <button
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedFormat === 'html'
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 text-blue-700 dark:text-blue-300'
                    : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                } ${!isPremium || !isLoggedIn ? 'relative' : ''}`}
                onClick={() => isPremium && isLoggedIn && setSelectedFormat('html')}
              >
                HTML
                {(!isPremium || !isLoggedIn) && (
                  <div className="absolute inset-0 bg-gray-900/60 rounded-lg flex items-center justify-center">
                    <Lock size={16} className="text-white mr-1" />
                    <span className="text-white text-sm">
                      {!isLoggedIn ? 'Login Required' : 'Premium'}
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm flex items-start">
              <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              {error}
            </div>
          )}

          {!isLoggedIn && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                Login Required
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Please log in to access advanced export options and save your charts.
              </p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                Log In
              </button>
            </div>
          )}

          {isLoggedIn && !isPremium && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                Upgrade to Premium
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Get access to SVG, PDF, and HTML exports, plus many more features!
              </p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                Upgrade Now
              </button>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleExport}
              disabled={isExporting}
            >
              <Download size={18} className="mr-2" />
              {isExporting ? 'Exporting...' : 'Export'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;