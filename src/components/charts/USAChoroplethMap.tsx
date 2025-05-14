import React, { useState, useEffect } from 'react';
import BaseChoroplethMap from './BaseChoroplethMap';
import { RegionValue } from './BaseChoroplethMap';
import { colorThemes } from '../../lib/chartThemes';

const normalizeRegionName = (name: string) => name.trim().toLowerCase();

interface USAChoroplethMapProps {
  data: Record<string, RegionValue>;
  selectedLayer?: string;
  focusedRegion?: string;
  searchRegion?: string;
  devMode?: boolean;
  showLabels?: boolean;
  selectedColorTheme?: string;
  colorScaleIndex?: number;
}

const USAChoroplethMap: React.FC<USAChoroplethMapProps> = ({
  data,
  selectedLayer,
  focusedRegion,
  searchRegion,
  devMode = false,
  showLabels = false,
  selectedColorTheme = 'Default Theme',
  colorScaleIndex = 1,
}) => {
  const [geoData, setGeoData] = useState<any>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/usa.json')
      .then((res) => res.json())
      .then(setGeoData)
      .catch((err) => console.error('Failed to load usa.json', err));
  }, []);

  const tooltipRenderer = (name: string, value: number, meta?: string) =>
    `<strong>${name}</strong><br/>Value: ${value}${meta ? `<br/><em>${meta}</em>` : ''}`;

  const themeColors = colorThemes[selectedColorTheme] ?? colorThemes['Default Theme'];

  if (!geoData) return <div>Loading USA map...</div>;

  return (
    <BaseChoroplethMap
      geoData={geoData}
      regionData={data}
      projection="albers"
      width={960}
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
      colorScaleIndex={colorScaleIndex}
      legendId="legend-usa-map"
    />
  );
};

export default USAChoroplethMap;
