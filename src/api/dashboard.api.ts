import { httpClient } from "./httpClient";
import type { Resource, QuantityAndCostItem } from "./dashboard.types";

const get = async <T>(url: string): Promise<T> => {
  const { data } = await httpClient.get(url);
  return data;
};

export const getQuantityAndCost = (): Promise<QuantityAndCostItem[]> =>
  get<QuantityAndCostItem[]>("/dashboard/quantity-and-cost.json");

export const getResources = (): Promise<Resource[]> =>
  get<Resource[]>("/dashboard/resources.json");

export const getReports = (): Promise<string[]> =>
  get<string[]>("/dashboard/reports.json");

export const getDashboardCalendarData = async () => {
  const { data } = await httpClient.get("/data.json");
  return data;
};
