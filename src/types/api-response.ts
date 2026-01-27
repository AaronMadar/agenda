export interface ResourceItem {
  item: string | null;
  quantity: number;
  price: number;
}

export interface ShibutsApi {
  codeShibuts: string;
  directCost: number;
  costOfItems: number;
  mesima: string;
  seviceType: string;
  title: string;
  variationPastYear: number;
  dateBegin: string;
  dateEnd: string;
  resource: ResourceItem[];
}

export interface GdudApi {
  name: string;
  forceType: string;
  pikud: string;
  shibutsim: ShibutsApi[];
}[];

export interface ApiResponse {
  unit: string;
  period: {
    start: string;
    end: string;
  };
  gdudim: GdudApi[];
}
