export interface DataResponse {
  unit: string;
  period: {start: string; end: string};
  gdudim: Gdud[];
}

export interface Gdud {
    name: string;
    forceType: string;
    pikud: string;
    shibutsim: Shibutz[];
}

export interface Shibutz {
    title: string;
    codeShibutz: string;
    directCost: number;
    costOfItems: number;
    mesima: string;
    serviceType: string;
    variationPastYear: number;
    dateBegin: string;
    dateEnd: string;
    resources: Resource[];
}

export interface Resource {
    categoryName: string;
    items: Item[];
}

export interface Item {
    name: string;
    quantity: number;
    unitCost: number;
}