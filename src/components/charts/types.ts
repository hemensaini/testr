export type ChartType =
  | 'bar'
  | 'horizontalBar'
  | 'line'
  | 'area'
  | 'pie'
  | 'usaChoropleth'
  | 'delhiChoropleth'
  | 'indiaChoropleth'
  | 'afghanistanChoropleth'
  | 'albaniaChoropleth';

export interface ChartComponentProps {
  data: any;
  options: any;
  altText?: string;
}

export type ChartCategory = 'basic' | 'statistical' | 'geo' | 'interactive';

export interface ChartTypeInfo {
  id: ChartType;
  name: string;
  description: string;
  category: ChartCategory;
  examples: string[];
  dataRequirements: {
    minDataPoints?: number;
    maxDataPoints?: number;
    structure: string;
    variables: {
      type: 'numeric' | 'categorical' | 'temporal' | 'geographic';
      required: boolean;
      description: string;
    }[];
  };
}

export interface ChartRegistryEntry {
  name: string;
  component: React.ComponentType<ChartComponentProps>;
  info: ChartTypeInfo;
}

export interface ChartRegistry {
  [key: string]: ChartRegistryEntry;
}
