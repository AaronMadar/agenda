export type Shibuts = {
  title: string;
  dateBegin: string;
  dateEnd: string;
  seviceType: ServiceType;
};

export type Gdud = {
  name: string;
  shibutsim: Shibuts[];
};

export type CalendarSourceData = {
  gdudim: Gdud[];
};

export type ServiceType =
  | "מילואים- אימונים"
  | "סדיר- אימונים"
  | "מילואים- תע\"ם"
  | "סדיר- תע”ם";

export type CalendarEvent = {
  date: string;
  title: string;
  gdud: string;
  serviceType: ServiceType;
};
