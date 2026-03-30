export interface ShibutzimRes {
    period: {
        start: string;
        end: string;
    }
    shibutzim: Shibutz[]
}

export interface Shibutz {
    title: string;
    codeShibutz: string;
    directCost: number;
    costOfItems: number;
    mesima: string;
    serviceType: string;
    forceType: string;
    variationPastYear: number;
    dateBegin: string;
    dateEnd: string;
    unitId: string;
    location: string;
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