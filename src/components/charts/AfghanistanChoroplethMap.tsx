import React, { useState, useEffect } from 'react';
import BaseChoroplethMap from './BaseChoroplethMap';
import { RegionValue } from './BaseChoroplethMap';
import { colorThemes } from '../../lib/chartThemes';

const normalizeRegionName = (name: string) =>
  name.trim().toLowerCase();

interface AfghanistanChoroplethMapProps {
  data: Record<string, RegionValue>;
  selectedLayer?: string;
  focusedRegion?: string;
  searchRegion?: string;
  devMode?: boolean;
  showLabels?: boolean;
  selectedColorTheme?: string;
}

const AfghanistanChoroplethMap: React.FC<AfghanistanChoroplethMapProps> = ({
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
    fetch('/data/afghanistan.json')
      .then((res) => res.json())
      .then(setGeoData)
      .catch((err) => console.error('Failed to load afghanistan.json', err));
  }, []);

  const tooltipRenderer = (name: string, value: number, meta?: string) =>
    `<strong>${name}</strong><br/>Value: ${value}${meta ? `<br/><em>${meta}</em>` : ''}`;

  if (!geoData) return <div>Loading Afghanistan map...</div>;

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
      selectedColorTheme={selectedColorTheme}
      legendId="legend-afghanistan-map"
    />
  );
};

export default AfghanistanChoroplethMap;
