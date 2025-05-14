import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import * as d3 from "d3";

const geoUrl = "/data/delhi.json";

interface DelhiChoroplethMapProps {
  data: Record<string, number>;
  width?: number;
  height?: number;
  colorThemeColors?: string[];
  colorScaleIndex?: number;
}

const DelhiChoroplethMap: React.FC<DelhiChoroplethMapProps> = ({
  data,
  width = 800,
  height = 550,
  colorThemeColors = ["#dbeafe", "#60a5fa", "#1e3a8a"],
  colorScaleIndex = 1
}) => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [geographies, setGeographies] = useState<any[]>([]);
  const [zoom, setZoom] = useState(1);
  const legendRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    d3.json(geoUrl).then((geo: any) => {
      if (geo && geo.features) {
        setGeographies(geo.features);
      } else {
        console.error("Failed to load delhi.json or no features present");
      }
    });
  }, []);

  const { colorScale, legendDomain } = useMemo(() => {
    const values = Object.values(data || {});
    const min = values.length ? Math.min(...values) : 0;
    const max = values.length ? Math.max(...values) : 100;
    const adjustedMax = min + (max - min) * colorScaleIndex;
    const domain = min === max ? [min, min + 1] : [min, adjustedMax];
    const scale = scaleLinear<string>()
      .domain(domain)
      .range(colorThemeColors)
      .clamp(true);
    return { colorScale: scale, legendDomain: domain };
  }, [data, colorThemeColors, colorScaleIndex]);

  useEffect(() => {
    if (legendRef.current) {
      const axisScale = d3.scaleLinear()
        .domain(legendDomain)
        .range([20, 280]);

      const axis = d3.axisBottom(axisScale)
        .ticks(5)
        .tickFormat(d3.format(".2s"));

      d3.select(legendRef.current).call(axis);
    }
  }, [legendDomain]);

  const handleMouseMove = (event: React.MouseEvent, name: string, value?: number) => {
    setTooltipContent(value ? `${name}: ${value}` : name);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => setTooltipContent(null);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Map */}
      <ComposableMap
        projection="geoMercator"
        width={width}
        height={height}
      >
        <ZoomableGroup
          center={[77.2, 28.6]}
          zoom={zoom}
          onMoveEnd={({ zoom }) => setZoom(zoom)}
        >
          <Geographies geography={{ type: "FeatureCollection", features: geographies }}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const rawName = geo.properties.name || geo.properties.district;
                const name = rawName?.trim().toLowerCase();
                const value = data?.[rawName] ?? data?.[name];
                const fill = value != null ? colorScale(value) : "#f3f4f6";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    onMouseMove={(e) => handleMouseMove(e, rawName, value)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: value ? colorScale(value) : "#e5e7eb" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltipContent && (
        <div
          style={{
            position: "fixed",
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y + 10,
            zIndex: 1000,
          }}
          className="bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-sm"
        >
          {tooltipContent}
        </div>
      )}

      {/* Zoom Buttons */}
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
        <button
          onClick={() => setZoom((z) => Math.min(z * 1.5, 20))}
          className="bg-blue-500 text-white px-2 py-1 rounded m-1"
        >
          +
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z / 1.5, 1))}
          className="bg-blue-500 text-white px-2 py-1 rounded m-1"
        >
          −
        </button>
      </div>

      {/* Legend */}
      <div
        id="legend"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: '6px 12px',
        }}
      >
        <svg width={300} height={40}>
          <defs>
            <linearGradient id="delhi-legend-gradient" x1="0%" x2="100%">
              {colorThemeColors.map((color, i) => (
                <stop
                  key={i}
                  offset={`${(i / (colorThemeColors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>
          <rect x={20} y={0} width={260} height={10} fill="url(#delhi-legend-gradient)" stroke="#aaa" />
          <g ref={legendRef} transform="translate(0, 10)" />
        </svg>
      </div>
    </div>
  );
};

export default DelhiChoroplethMap;
