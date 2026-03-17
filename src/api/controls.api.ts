import { httpClient } from "./httpClient";
import type { TreeNodeData } from "@/components/shared/tree-dropdown/types";

export const getUnitsTree = async (idSoldier: string) => {
  const { data } = await httpClient.get<TreeNodeData[]>("/tree-data.json");
  return data;
};

export const getServiceTypes = async () => {
  const { data } = await httpClient.get<string[]>("/service-types.json");
  return data;
};

export const getResourceTypes = async () => {
  const { data } = await httpClient.get<string[]>("/resource-types.json");
  return data;
};
 