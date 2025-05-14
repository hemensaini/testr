import React, { useEffect, useState } from 'react';
import BaseChoroplethMap from './BaseChoroplethMap';
import { RegionValue } from './BaseChoroplethMap';
import { colorThemes } from '../../lib/chartThemes';

const regionAliases: Record<string, string> = {
  'orissa': 'odisha',
  'uttaranchal': 'uttarakhand',
  'pondicherry': 'puducherry',
  'dadra and nagar haveli': 'dadra and nagar haveli and daman and diu',
  'andaman & nicobar islands': 'andaman and nicobar islands',
};

const normalizeRegionName = (name: string): string => {
  const cleaned = name.trim().toLowerCase();
  return regionAliases[cleaned] || cleaned;
};

interface IndiaChoroplethMapProps {
  data: Record<string, RegionValue>;
  selectedLayer?: string;
  focusedRegion?: string;
  searchRegion?: string;
  devMode?: boolean;
  showLabels?: boolean;
  selectedColorTheme?: string;
  colorScaleIndex?: number;
}

const IndiaChoroplethMap: React.FC<IndiaChoroplethMapProps> = ({
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
    fetch('/data/india.json')
      .then((res) => res.json())
      .then(setGeoData)
      .catch((err) => console.error('Failed to load india.json', err));
  }, []);

  const tooltipRenderer = (name: string, value: number, meta?: string): string =>
    `<strong>${name}</strong><br/>Value: ${value}${meta ? `<br/><em>${meta}</em>` : ''}`;

  const themeColors = colorThemes[selectedColorTheme] ?? colorThemes['Default Theme'];

  if (!geoData) return <div>Loading map...</div>;

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
      colorScaleIndex={colorScaleIndex}
      legendId="legend-india-map"
    />
  );
};

export default IndiaChoroplethMap;
