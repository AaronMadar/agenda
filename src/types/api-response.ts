export interface ResourceItem {
  categoryName: string;
  items: {name: string, quantity: number, unitCost: number}[]
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
  resources: ResourceItem[];
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
