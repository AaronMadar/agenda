import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { TreeNodeData } from "@/components/shared/tree-dropdown/types";
import { getUnitsTree, getServiceTypes, getResourceTypes } from "@/api/controls.api";

export type ServiceTypeOption = string;
export type ResourceTypeOption = string;

export type ControlsContextType = {
  // Unit tree
  treeData: TreeNodeData[];
  selectedUnit: TreeNodeData | null;

  // Service types
  serviceTypes: ServiceTypeOption[];
  selectedServiceTypes: ServiceTypeOption[] | null;

  // Resource types
  resourceTypes: ResourceTypeOption[];
  selectedResourceTypes: ResourceTypeOption[] | null;

  // Meta
  loading: boolean;
  error: string | null;

  // Actions
  setSelectedUnit: (node: TreeNodeData | null) => void;
  setSelectedServiceTypes: (value: ServiceTypeOption[] | null) => void;
  setSelectedResourceTypes: (value: ResourceTypeOption[] | null) => void;
  refetch: () => void;
};

const ControlsContext = createContext<ControlsContextType | null>(null);

export const ControlsProvider = ({ children }: { children: ReactNode }) => {
  const [treeData, setTreeData] = useState<TreeNodeData[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<TreeNodeData | null>(null);

  const [serviceTypes, setServiceTypes] = useState<ServiceTypeOption[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] =
    useState<ServiceTypeOption[] | null>(null);

  const [resourceTypes, setResourceTypes] = useState<ResourceTypeOption[]>([]);
  const [selectedResourceTypes, setSelectedResourceTypes] =
    useState<ResourceTypeOption[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Units tree
      const unitsTree = await getUnitsTree();
      setTreeData(unitsTree);
      if (unitsTree.length > 0 && !selectedUnit) {
        setSelectedUnit(unitsTree[0]);
      }

      // Service types
      const services: ServiceTypeOption[] = await getServiceTypes();
      setServiceTypes(services);
      if (!selectedServiceTypes && services.length > 0) {
        setSelectedServiceTypes(null); // null === "הכל"
      }

      // Resource types
      const resources: ResourceTypeOption[] = await getResourceTypes();
      setResourceTypes(resources);
      if (!selectedResourceTypes && resources.length > 0) {
        setSelectedResourceTypes(null); // null === "הכל"
      }

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ControlsContext.Provider
      value={{
        treeData,
        selectedUnit,

        serviceTypes,
        selectedServiceTypes,

        resourceTypes,
        selectedResourceTypes,

        loading,
        error,

        setSelectedUnit,
        setSelectedServiceTypes,
        setSelectedResourceTypes,
        refetch: fetchData,
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
};

export const useControls = () => {
  const context = useContext(ControlsContext);
  if (!context) {
    throw new Error("useControls must be used inside ControlsProvider");
  }
  return context;
};
