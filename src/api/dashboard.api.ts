import { httpClient } from "./httpClient";
import type { Resource } from "@/components/shared/resourceCard.types";


const get = async <T>(url: string): Promise<T> => {
  const { data } = await httpClient.get(url);
  return data;
};

export const getQuantityAndCost = (): Promise<Resource[]> =>
  get<Resource[]>("/dashboard/quantity-and-cost");

export const getResources = (): Promise<Resource[]> =>
  get<Resource[]>("/dashboard/resources");

export const getReports = (): Promise<string[]> =>
  get<string[]>("/dashboard/reports");