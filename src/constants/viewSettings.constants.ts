import type { Shibutz } from "@/types/shibutzim.types";

export const GROUP_BY_OPTIONS = [
  { value: "location", label: "מיקום" },
  { value: "unitId", label: "יחידה" },
  { value: "forceType", label: "סוג כח" },
  { value: "mesima", label: "משימה" },
  { value: "serviceType", label: "סוג שירות" },
] satisfies { value: keyof Shibutz; label: string }[];