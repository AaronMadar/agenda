import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { TreeNodeData } from "@/components/shared/tree-dropdown/types";
import { getUnitsTree, getServiceTypes, getResourceTypes } from "@/api/controls.api";

export type UnitTypeOption = string;
export type ServiceTypeOption = string;
export type ResourceTypeOption = string;
export type PeriodDateType = {start: string | null, end: string | null };

export type ControlsContextType = {
  // Unit tree
  treeData: TreeNodeData[];
  selectedUnitIds: UnitTypeOption[] | null;

  // Service types
  serviceTypes: ServiceTypeOption[];
  selectedServiceTypes: ServiceTypeOption[] | null;

  // Resource types
  resourceTypes: ResourceTypeOption[];
  selectedResourceTypes: ResourceTypeOption[] | null;

  // Period data
  currentYear: number;
  periodView: string;
  periodDate: PeriodDateType

  // Meta
  loading: boolean;
  error: string | null;

  // Actions
  setSelectedUnitIds: (ids: UnitTypeOption[] | null) => void;
  setSelectedServiceTypes: (value: ServiceTypeOption[] | null) => void;
  setSelectedResourceTypes: (value: ResourceTypeOption[] | null) => void;
  setPeriodView: (value: string) => void;
  setPeriodDate: (value: PeriodDateType) => void;
  refetch: () => void;
};

const ControlsContext = createContext<ControlsContextType | null>(null);

export const ControlsProvider = ({ children }: { children: ReactNode }) => {
  const [treeData, setTreeData] = useState<TreeNodeData[]>([]);
  const [selectedUnitIds, setSelectedUnitIds] = useState<UnitTypeOption[] | null>(null);

  const [serviceTypes, setServiceTypes] = useState<ServiceTypeOption[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] =
    useState<ServiceTypeOption[] | null>(null);

  const [resourceTypes, setResourceTypes] = useState<ResourceTypeOption[]>([]);
  const [selectedResourceTypes, setSelectedResourceTypes] =
    useState<ResourceTypeOption[] | null>(null);

  const currentYear = new Date().getFullYear();
  const [periodView, setPeriodView] = useState<string>(`כל ${currentYear}`);
  const [periodDate, setPeriodDate] = useState<PeriodDateType>({start: null, end: null})

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const unitsTree = await getUnitsTree();
      setTreeData(unitsTree);

      const services: ServiceTypeOption[] = await getServiceTypes();
      setServiceTypes(services);

      const resources: ResourceTypeOption[] = await getResourceTypes();
      setResourceTypes(resources);

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
        selectedUnitIds,

        serviceTypes,
        selectedServiceTypes,

        resourceTypes,
        selectedResourceTypes,

        currentYear,
        periodView,
        periodDate,
        
        loading,
        error,
        
        setSelectedUnitIds,
        setSelectedServiceTypes,
        setSelectedResourceTypes,
        setPeriodView,
        setPeriodDate,
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