import React, { useState, useEffect } from 'react';
import { generateStyledChartData } from '../lib/chartStyler'; // New safer utility

// Component Props Type
type Props = {
  colorThemes: Record<string, string[]>;
  fontFamilies: string[];
  fontSizeMap: Record<string, number>;
  colorTheme: string;
  setColorTheme: (value: string) => void;
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
  fontFamily: string;
  setFontFamily: (value: string) => void;
  fontSize: string;
  setFontSize: (value: string) => void;
  updateFontSizeInOptions: (px: number) => void;
  updateFontFamilyInOptions: (family: string) => void;
  setChartData: React.Dispatch<React.SetStateAction<any>>;
};

const ChartAppearancePanel: React.FC<Props> = ({
  colorThemes,
  fontFamilies,
  fontSizeMap,
  colorTheme,
  setColorTheme,
  backgroundColor,
  setBackgroundColor,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  updateFontSizeInOptions,
  updateFontFamilyInOptions,
  setChartData,
}) => {
  const [customColors, setCustomColors] = useState<string[]>([]);

  useEffect(() => {
    const themeColors = colorThemes[colorTheme] || colorThemes['Default Theme'] || [];
    setCustomColors(themeColors);
    setChartData(prev => generateStyledChartData(prev, themeColors));
  }, [colorTheme]);

  const handleCustomColorChange = (index: number, color: string) => {
    const updatedColors = [...customColors];
    updatedColors[index] = color;
    setCustomColors(updatedColors);
    setChartData(prev => generateStyledChartData(prev, updatedColors));
  };

  return (
    <div className="space-y-6">
      {/* Color Theme Selection */}
      <div>
        <label className="block text-sm mb-1">Color Theme</label>
        <div className="flex flex-wrap gap-2 mt-2 overflow-x-auto max-w-full">
          {Object.keys(colorThemes).map((theme) => (
            <button
              key={theme}
              className={`px-2 py-1 border rounded text-sm whitespace-nowrap ${
                colorTheme === theme ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
              }`}
              onClick={() => setColorTheme(theme)}
            >
              {theme}
            </button>
          ))}
        </div>

        {/* Custom Color Inputs */}
        <div className="mt-3 space-y-2">
          <label className="block text-sm mb-1">Custom Colors</label>
          {Array.from({ length: customColors.length || 1 }).map((_, i) => (
            <input
              key={i}
              type="color"
              value={customColors[i] || '#000000'}
              onChange={(e) => handleCustomColorChange(i, e.target.value)}
              className="w-12 h-8 border rounded mr-2"
            />
          ))}
        </div>
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-sm mb-1">Background Color</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="w-12 h-8 border rounded"
        />
      </div>

      {/* Font Family Selector */}
      <div>
        <label className="block text-sm mb-1">Font Family</label>
        <div className="flex flex-wrap gap-2 mt-2 overflow-x-auto max-w-full">
          {fontFamilies.map((font) => (
            <button
              key={font}
              className={`px-2 py-1 border rounded text-sm whitespace-nowrap ${
                fontFamily === font ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setFontFamily(font);
                updateFontFamilyInOptions(font);
              }}
            >
              {font}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size Dropdown */}
      <div>
        <label className="block text-sm mb-1">Font Size (px)</label>
        <select
          value={fontSizeMap[fontSize] !== undefined ? fontSizeMap[fontSize] : 14}
          onChange={(e) => {
            const size = Number(e.target.value);
            const label = Object.entries(fontSizeMap).find(([, val]) => val === size)?.[0] || `${size}px`;
            setFontSize(label);
            updateFontSizeInOptions(size);
          }}
          className="w-full border rounded px-2 py-1"
        >
          {Array.from({ length: 19 }, (_, i) => 10 + i).map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ChartAppearancePanel;
