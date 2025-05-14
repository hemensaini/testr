// components/charts/IndonesiaChoroplethMap.tsx
import React, { useState, useEffect } from 'react';
import BaseChoroplethMap from './BaseChoroplethMap';
import { RegionValue } from './BaseChoroplethMap';
import { colorThemes } from '../../lib/chartThemes';

const regionAliases: Record<string, string> = {
  'daerah istimewa yogyakarta': 'yogyakarta',
  'kepulauan riau': 'riau islands',
  'dki jakarta': 'jakarta',
};

const normalizeRegionName = (name: string) => {
  const cleaned = name.trim().toLowerCase();
  return regionAliases[cleaned] || cleaned;
};

interface IndonesiaChoroplethMapProps {
  data: Record<string, RegionValue>;
  selectedLayer?: string;
  focusedRegion?: string;
  searchRegion?: string;
  devMode?: boolean;
  showLabels?: boolean;
  selectedColorTheme?: string;
}

const IndonesiaChoroplethMap: React.FC<IndonesiaChoroplethMapProps> = ({
  data,
  selectedLayer,
  focusedRegion,
  searchRegion,
  devMode = false,
  showLabels = false,
  selectedColorTheme = 'Default Theme',
}) => {
  const [geoData, setGeoData] = useState<any>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/indonesia.json')
      .then((res) => res.json())
      .then(setGeoData)
      .catch((err) => console.error('Failed to load indonesia.json', err));
  }, []);

  const tooltipRenderer = (name: string, value: number, meta?: string) =>
    `<strong>${name}</strong><br/>Value: ${value}${meta ? `<br/><em>${meta}</em>` : ''}`;

  if (!geoData) return <div>Loading map...</div>;

  const themeColors = colorThemes[selectedColorTheme] ?? colorThemes['Default Theme'];

  return (
    <BaseChoroplethMap
      geoData={geoData}
      regionData={data}
      projection="mercator"
      width={800}
      height={600}
      normalizeRegionName={normalizeRegionName}
      tooltipRenderer={tooltipRenderer}
      selectedLayer={selectedLayer}
      focusedRegion={focusedRegion}
      searchRegion={searchRegion}
      zoomable
      devMode={devMode}
      showLabels={showLabels}
      onRegionHover={(name) => setHoveredRegion(name)}
      colorThemeColors={themeColors}
      legendId="legend-indonesia-map"
    />
  );
};

export default IndonesiaChoroplethMap;
