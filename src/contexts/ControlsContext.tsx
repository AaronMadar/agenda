import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { TreeNodeData } from "@/components/shared/tree-dropdown/types";

export type ServiceTypeOption = string;
export type ResourceTypeOption = string;

export type ControlsContextType = {
  // Unit tree
  treeData: TreeNodeData[];
  selectedUnit: TreeNodeData | null;

  // Service types
  serviceTypes: ServiceTypeOption[];
  serviceTypeOptions: ServiceTypeOption[];
  selectedServiceType: ServiceTypeOption | null;

  // Resource types
  resourceTypes: ResourceTypeOption[];
  resourceTypeOptions: ResourceTypeOption[];
  selectedResourceType: ResourceTypeOption | null;

  // Meta
  loading: boolean;
  error: string | null;

  // Actions
  setSelectedUnit: (node: TreeNodeData | null) => void;
  setSelectedServiceType: (value: ServiceTypeOption | null) => void;
  setSelectedResourceType: (value: ResourceTypeOption | null) => void;
  refetch: () => void;
};

const ControlsContext = createContext<ControlsContextType | null>(null);

export const ControlsProvider = ({ children }: { children: ReactNode }) => {
  const [treeData, setTreeData] = useState<TreeNodeData[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<TreeNodeData | null>(null);

  const [serviceTypes, setServiceTypes] = useState<ServiceTypeOption[]>([]);
  const [selectedServiceType, setSelectedServiceType] =
    useState<ServiceTypeOption | null>(null);

  const [resourceTypes, setResourceTypes] = useState<ResourceTypeOption[]>([]);
  const [selectedResourceType, setSelectedResourceType] =
    useState<ResourceTypeOption | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI-ready options
  const serviceTypeOptions = useMemo(
    () => ["הכל", ...serviceTypes],
    [serviceTypes]
  );

  const resourceTypeOptions = useMemo(
    () => ["הכל", ...resourceTypes],
    [resourceTypes]
  );

  const fetchData = async () => {
    try {
      setLoading(true);

      // Units tree
      const treeRes = await fetch("/public/tree-data.json");
      if (!treeRes.ok) throw new Error("Failed to fetch tree data");
      const tree: TreeNodeData[] = await treeRes.json();
      setTreeData(tree);
      if (tree.length > 0 && !selectedUnit) {
        setSelectedUnit(tree[0]);
      }

      // Service types
      const serviceRes = await fetch("/public/service-types.json");
      if (!serviceRes.ok) throw new Error("Failed to fetch service types");
      const services: ServiceTypeOption[] = await serviceRes.json();
      setServiceTypes(services);
      if (!selectedServiceType && services.length > 0) {
        setSelectedServiceType(null); // null === "הכל"
      }

      // Resource types
      const resourceRes = await fetch("/public/resource-types.json");
      if (!resourceRes.ok) throw new Error("Failed to fetch resource types");
      const resources: ResourceTypeOption[] = await resourceRes.json();
      setResourceTypes(resources);
      if (!selectedResourceType && resources.length > 0) {
        setSelectedResourceType(null); // null === "הכל"
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
        serviceTypeOptions,
        selectedServiceType,

        resourceTypes,
        resourceTypeOptions,
        selectedResourceType,

        loading,
        error,

        setSelectedUnit,
        setSelectedServiceType,
        setSelectedResourceType,
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
