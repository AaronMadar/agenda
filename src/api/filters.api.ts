import { httpClient } from "./httpClient";
import type { TreeNodeData } from "@/components/shared/tree-dropdown/types";

export const getUnitsTree = async (idSoldier: string) => {
  // const { data } = await httpClient.get<TreeNodeData[]>(`/filters/units-tree/${idSoldier}.json`);
  const { data } = await httpClient.get<TreeNodeData[]>("/filters/units-tree-data.json");
  return data;
};

export const getServiceTypes = async () => {
  const { data } = await httpClient.get<string[]>("/filters/service-types.json");
  return data;
};

export const getResourceTypes = async () => {
  const { data } = await httpClient.get<string[]>("/filters/resource-types.json");
  return data;
};
