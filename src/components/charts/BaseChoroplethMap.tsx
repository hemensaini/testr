import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

export type RegionValue =
  | number
  | { value: number; meta?: string; layers?: Record<string, number> };

export interface BaseChoroplethProps {
  geoData: any;
  regionData: Record<string, RegionValue>;
  width?: number;
  height?: number;
  colorThemeColors?: string[];
  colorScaleIndex?: number;
  normalizeRegionName?: (name: string) => string;
  tooltipRenderer?: (name: string, value: number, meta?: string) => string;
  projection?: 'mercator' | 'albers' | 'orthographic' | ((w: number, h: number, geoData: any) => d3.GeoProjection);
  zoomable?: boolean;
  onRegionClick?: (regionName: string, value: number, meta?: string) => void;
  onRegionHover?: (regionName: string, value: number, meta?: string) => void;
  ariaLabel?: string;
  showLabels?: boolean;
  getLabelPosition?: (feature: any) => [number, number];
  legendId?: string;
  focusedRegion?: string;
  getRegionStyle?: (feature: any) => { stroke?: string; fill?: string; strokeWidth?: number };
  devMode?: boolean;
  selectedLayer?: string;
  searchRegion?: string;
}

const getValue = (val: RegionValue, selectedLayer?: string): number => {
  return typeof val === 'object'
    ? ((selectedLayer && val.layers?.[selectedLayer]) ?? val.value)
    : val;
};

const BaseChoroplethMap: React.FC<BaseChoroplethProps> = ({
  geoData,
  regionData,
  width = 800,
  height = 500,
  colorThemeColors = ['#ccc'],
  colorScaleIndex = 1,
  normalizeRegionName = (name) => name.trim().toLowerCase(),
  tooltipRenderer = (name, value, meta) => `<strong>${name}</strong><br/>Value: ${value}${meta ? `<br/><em>${meta}</em>` : ''}`,
  projection = 'mercator',
  zoomable = false,
  onRegionClick,
  onRegionHover,
  ariaLabel = 'Choropleth Map',
  showLabels = false,
  getLabelPosition,
  legendId = 'choropleth-legend',
  focusedRegion,
  getRegionStyle,
  devMode = false,
  selectedLayer,
  searchRegion,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const normalizedData = useMemo(() => {
    return Object.fromEntries(
      Object.entries(regionData).map(([k, v]) => [normalizeRegionName(k), v])
    );
  }, [regionData, normalizeRegionName]);

  const getProjection = () => {
    if (typeof projection === 'function') return projection(width, height, geoData);
    switch (projection) {
      case 'albers': return d3.geoAlbersUsa().fitSize([width, height], geoData);
      case 'orthographic': return d3.geoOrthographic().fitSize([width, height], geoData);
      default: return d3.geoMercator().fitSize([width, height], geoData);
    }
  };

  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const group = svg.append('g').attr('class', 'map-group');
    const pathGenerator = d3.geoPath().projection(getProjection());

    const values = Object.values(normalizedData).map(v => getValue(v, selectedLayer));
    const [min, max] = d3.extent(values) as [number, number];
    const adjustedMax = min + (max - min) * colorScaleIndex;

    const bandCount = Math.max(2, Math.min(colorThemeColors.length, Math.round(colorScaleIndex * colorThemeColors.length)));
    const colorScale = d3.scaleQuantize<string>().domain([min, adjustedMax]).range(colorThemeColors.slice(0, bandCount));

    group.selectAll('path')
      .data(geoData.features)
      .join('path')
      .attr('d', pathGenerator)
      .attr('fill', d => {
        const name = normalizeRegionName(d.properties.name);
        const val = normalizedData[name];
        const value = getValue(val, selectedLayer);
        const customFill = getRegionStyle?.(d)?.fill;
        return customFill ?? (value != null ? colorScale(value) : '#ccc');
      })
      .attr('stroke', d => {
        const style = getRegionStyle?.(d);
        return focusedRegion && normalizeRegionName(d.properties.name) === normalizeRegionName(focusedRegion)
          ? '#000'
          : style?.stroke || '#fff';
      })
      .attr('stroke-width', d => getRegionStyle?.(d)?.strokeWidth ?? 1)
      .attr('tabIndex', 0)
      .attr('role', 'button')
      .on('mouseover', (event, d) => {
        const name = d.properties.name;
        const key = normalizeRegionName(name);
        const val = normalizedData[key];
        const value = getValue(val, selectedLayer);
        const meta = typeof val === 'object' ? val.meta : '';
        tooltipRef.current!.innerHTML = tooltipRenderer(name, value ?? 0, meta);
        tooltipRef.current!.style.opacity = '1';
        onRegionHover?.(name, value ?? 0, meta);
      })
      .on('mousemove', (event) => {
        tooltipRef.current!.style.left = `${event.pageX + 10}px`;
        tooltipRef.current!.style.top = `${event.pageY + 10}px`;
      })
      .on('mouseout', () => {
        tooltipRef.current!.style.opacity = '0';
      })
      .on('click', (event, d) => {
        const name = d.properties.name;
        const key = normalizeRegionName(name);
        const val = normalizedData[key];
        const value = getValue(val, selectedLayer);
        const meta = typeof val === 'object' ? val.meta : '';
        onRegionClick?.(name, value ?? 0, meta);
      });

    if (showLabels) {
      group.selectAll('text')
        .data(geoData.features)
        .join('text')
        .text(d => d.properties.name)
        .attr('x', d => getLabelPosition?.(d)?.[0] ?? pathGenerator.centroid(d)[0])
        .attr('y', d => getLabelPosition?.(d)?.[1] ?? pathGenerator.centroid(d)[1])
        .attr('font-size', 10)
        .attr('text-anchor', 'middle')
        .attr('fill', '#111');
    }

    if (zoomable) {
      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 10])
        .on('zoom', (event) => {
          group.attr('transform', event.transform);
        });
      svg.call(zoom);
    }

    if (searchRegion) {
      const targetFeature = geoData.features.find((f: any) =>
        normalizeRegionName(f.properties.name) === normalizeRegionName(searchRegion));
      if (targetFeature) {
        const [[x0, y0], [x1, y1]] = pathGenerator.bounds(targetFeature);
        const dx = x1 - x0;
        const dy = y1 - y0;
        const x = (x0 + x1) / 2;
        const y = (y0 + y1) / 2;
        const scale = Math.min(8, 0.9 / Math.max(dx / width, dy / height));
        const translate = [width / 2 - scale * x, height / 2 - scale * y];
        group.transition().duration(750).attr('transform', `translate(${translate}) scale(${scale})`);
      }
    }

    if (devMode) {
      group.selectAll('circle.centroid')
        .data(geoData.features)
        .join('circle')
        .attr('class', 'centroid')
        .attr('cx', d => pathGenerator.centroid(d)[0])
        .attr('cy', d => pathGenerator.centroid(d)[1])
        .attr('r', 3)
        .attr('fill', 'red');
    }

    const legend = d3.select(`#${legendId}`);
    if (!legend.empty()) {
      legend.selectAll('*').remove();
      const legendWidth = 300, legendHeight = 10;
      const legendSvg = legend.append('svg').attr('width', legendWidth).attr('height', 40);

      const defs = legendSvg.append('defs');
      const gradientId = 'gradient';

      const gradient = defs.append('linearGradient')
        .attr('id', gradientId)
        .attr('x1', '0%')
        .attr('x2', '100%');

      colorThemeColors.slice(0, bandCount).forEach((color, i) => {
        gradient.append('stop')
          .attr('offset', `${(i / (bandCount - 1)) * 100}%`)
          .attr('stop-color', color);
      });

      legendSvg.append('rect')
        .attr('x', 20)
        .attr('y', 0)
        .attr('width', legendWidth - 40)
        .attr('height', legendHeight)
        .style('fill', `url(#${gradientId})`)
        .style('stroke', '#aaa');
    }

  }, [
    geoData,
    normalizedData,
    selectedLayer,
    focusedRegion,
    devMode,
    searchRegion,
    colorScaleIndex,
    JSON.stringify(colorThemeColors) // 🔧 FIXED LINE: tracks theme change
  ]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} aria-label={ariaLabel} role="img">
      <svg ref={svgRef} width={width} height={height}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          background: 'white',
          border: '1px solid gray',
          borderRadius: 4,
          fontSize: 12,
          padding: '6px 10px',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      <div id={legendId} style={{ position: 'absolute', bottom: 0, right: 0 }} />
    </div>
  );
};

export default BaseChoroplethMap;
