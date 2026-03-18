import { create } from "zustand";
import type { TreeNodeData } from "@/components/shared/tree-dropdown/types";
import { getUnitsTree, getServiceTypes, getResourceTypes } from "@/api/filters.api";

// Option types
export type UnitTypeOption = string;
export type ServiceTypeOption = string;
export type ResourceTypeOption = string;
export type PeriodDateType = { start: string | null; end: string | null };

// Zustand store type
export type FiltersState = {
  // Unit tree
  UnitTreeData: TreeNodeData[];
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
  periodDate: PeriodDateType;

  // Status
  loading: boolean;
  error: string | null;

  // Actions
  setSelectedUnitIds: (ids: UnitTypeOption[] | null) => void;
  setSelectedServiceTypes: (values: ServiceTypeOption[] | null) => void;
  setSelectedResourceTypes: (values: ResourceTypeOption[] | null) => void;
  setPeriodView: (value: string) => void;
  setPeriodDate: (value: PeriodDateType) => void;
  loadFiltersData: (idSoldier: string) => Promise<void>; 
};

export const useFilters = create<FiltersState>((set, get) => ({
  // Initial values
  UnitTreeData: [],
  selectedUnitIds: null,

  serviceTypes: [],
  selectedServiceTypes: null,

  resourceTypes: [],
  selectedResourceTypes: null,

  currentYear: new Date().getFullYear(),
  periodView: `כל ${new Date().getFullYear()}`, 
  periodDate: { start: null, end: null },

  loading: true,
  error: null,

  // Actions
  setSelectedUnitIds: (ids) => set({ selectedUnitIds: ids }),
  setSelectedServiceTypes: (values) => set({ selectedServiceTypes: values }),
  setSelectedResourceTypes: (values) => set({ selectedResourceTypes: values }),
  setPeriodView: (value) => set({ periodView: value }),
  setPeriodDate: (value) => set({ periodDate: value }),

  // Load initial data from API
  loadFiltersData: async (idSoldier) => {
    try {
      set({ loading: true });

      const unitsTree = await getUnitsTree(idSoldier);
      const services = await getServiceTypes();
      const resources = await getResourceTypes();

      set({
        UnitTreeData: unitsTree,
        serviceTypes: services,
        resourceTypes: resources,
        error: null,
      });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Unknown error" });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));