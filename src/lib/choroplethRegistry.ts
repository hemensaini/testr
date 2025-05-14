// src/lib/choroplethRegistry.ts
import IndiaChoroplethMap from "../components/charts/IndiaChoroplethMap";
import USAChoroplethMap from "../components/charts/USAChoroplethMap";
import DelhiChoroplethMap from "../components/charts/DelhiChoroplethMap";
import AfghanistanChoroplethMap from '../components/charts/AfghanistanChoroplethMap';
import AlbaniaChoroplethMap from '../components/charts/AlbaniaChoroplethMap';

const choroplethRegistry: Record<string, React.FC<any>> = {
  india: IndiaChoroplethMap,
  usa: USAChoroplethMap,
  delhi: DelhiChoroplethMap,
  afghanistan: AfghanistanChoroplethMap,
  albania: AlbaniaChoroplethMap,
};

export default choroplethRegistry;
