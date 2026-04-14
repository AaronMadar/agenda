import { httpClient } from "./httpClient";
import type { TreeNodeData } from "@/components/shared/tree-dropdown/types";

export const getUnitsTree = async (idSoldier: string) => {
  // const { data } = await httpClient.get<TreeNodeData[]>(`/filters/units-tree/${idSoldier}.json`);
  const { data } = await httpClient.get<TreeNodeData[]>(`/filters/units-tree/${idSoldier}`);
  return data;
};

export const getServiceTypes = async () => {
  const { data } = await httpClient.get<{ id: string; name: string }[]>("/filters/service-types");
  return data;  
};

export const getResourceTypes = async () => {
  const { data } = await httpClient.get<{ id: string; name: string }[]>("/filters/resource-types");
  return data;
};
