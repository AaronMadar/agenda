// export type ResourceConfig = {
//   key: string;
//   label: string;
//   color: string;
// };

// export const RESOURCE_CONFIG: Record<string, ResourceConfig> = {
//   "תחמושת": { key: "ammo", label: "תחמושת", color: "#f28b82" },
//   'ימ"מ': { key: "mm", label: 'ימ"מ', color: "#fbbc04" },
//   "הובלות": { key: "transportationAAAAAA", label: "הובלות", color: "#34a853" },
//   'ק"מ': { key: "km", label: 'ק"מ', color: "#4285f4" },
//   "הפשרות": { key: "thawing", label: "הפשרות", color: "#b36ec0" },
//   "סטיקלייט": { key: "sticklight", label: "סטיקלייט", color: "#e91e63" },
//   "מאמנים": { key: "trainers", label: "מאמנים", color: "#00bcd4" },

//   "רכב": { key: "vehicle", label: "רכב", color: "#fbbc04" },
//   "ציוד": { key: "equipment", label: "ציוד", color: "#34a853" },
//   "אחר": { key: "other", label: "אחר", color: "#4285f4" },
//   "לוגיסטיקה": { key: "logistics", label: "לוגיסטיקה", color: "#b36ec0" },
//   "רפואה": { key: "medical", label: "רפואה", color: "#e91e63" },
//   "תקשוב": { key: "it", label: "תקשוב", color: "#00bcd4" },
//   "ציוד אישי": { key: "personal_equipment", label: "ציוד אישי", color: "#ff5722" },
//   "תחבורה": { key: "transportation", label: "תחבורה", color: "#b98877" },
//   "הדרכה": { key: "training", label: "הדרכה", color: "#8cb8ce" },
//   "תחזוקה": { key: "maintenance", label: "תחזוקה", color: "#4caf50" },
//   "אבטחה": { key: "security", label: "אבטחה", color: "#bc9393" },
// };

// // ================= LOOKUPS =================

// // עברית -> config
// export const getResourceConfig = (label?: string) => {
//   return label ? RESOURCE_CONFIG[label] : undefined;
// };

// // אנגלית -> config
// export const RESOURCE_BY_KEY = Object.fromEntries(
//   Object.values(RESOURCE_CONFIG).map((r) => [r.key, r])
// );

// export const getResourceByKey = (key?: string) => {
//   return key ? RESOURCE_BY_KEY[key] : undefined;
// };




































// ================= TYPES =================

export type ResourceConfig = {
  key: string;
  label: string;
  color: string;
  icon: string;
  items?: Record<string, string>;
};

// ================= DEFAULT =================

const DEFAULT_RESOURCE: ResourceConfig = {
  key: "default",
  label: "אחר",
  color: "#999",
  icon: "bi bi-question-circle",
};

// ================= CONFIG =================

export const RESOURCE_CONFIG: Record<string, ResourceConfig> = {
  // ===== תחמושת =====
  "תחמושת": {
    key: "ammo",
    label: "תחמושת",
    color: "#f28b82",
    icon: "bi bi-bullseye",
    items: {
      "כד’ 5.56 מ”מ": "bi bi-record-circle",
      "רימונים": "bi bi-exclamation-octagon",
    },
  },

  // ===== ימ"מ =====
  'ימ"מ': {
    key: "mm",
    label: 'ימ"מ',
    color: "#fbbc04",
    icon: "bi bi-shield-fill",
  },

  // ===== הובלות =====
  "הובלות": {
    key: "transportationAAAAAA",
    label: "הובלות",
    color: "#34a853",
    icon: "bi bi-truck",
    items: {
      "משאיות לוגיסטיות": "bi bi-truck-flatbed",
    },
  },

  // ===== תחבורה =====
  "תחבורה": {
    key: "transportation",
    label: "תחבורה",
    color: "#b98877",
    icon: "bi bi-truck",
    items: {
      "רכבים": "bi bi-car-front",
      "אופניים": "bi bi-bicycle",
      "אוטובוסים": "bi bi-bus-front",
      "משאיות לוגיסטיות": "bi bi-truck-flatbed",
    },
  },

  // ===== ק"מ =====
  'ק"מ': {
    key: "km",
    label: 'ק"מ',
    color: "#4285f4",
    icon: "bi bi-speedometer2",
  },

  // ===== הפשרות =====
  "הפשרות": {
    key: "thawing",
    label: "הפשרות",
    color: "#b36ec0",
    icon: "bi bi-thermometer-snow",
  },

  // ===== סטיקלייט =====
  "סטיקלייט": {
    key: "sticklight",
    label: "סטיקלייט",
    color: "#e91e63",
    icon: "bi bi-lightbulb",
    items: {
      "אמצעי תאורה": "bi bi-lightbulb",
    },
  },

  // ===== מאמנים =====
  "מאמנים": {
    key: "trainers",
    label: "מאמנים",
    color: "#00bcd4",
    icon: "bi bi-person-workspace",
  },

  // ===== רכב =====
  "רכב": {
    key: "vehicle",
    label: "רכב",
    color: "#fbbc04",
    icon: "bi bi-car-front",
  },

  // ===== ציוד =====
  "ציוד": {
    key: "equipment",
    label: "ציוד",
    color: "#34a853",
    icon: "bi bi-tools",
  },

  // ===== ציוד אישי =====
  "ציוד אישי": {
    key: "personal_equipment",
    label: "ציוד אישי",
    color: "#ff5722",
    icon: "bi bi-backpack",
    items: {
      "אפודים": "bi bi-shield",
      "קסדות": "bi bi-helmet-safety",
    },
  },

  // ===== לוגיסטיקה =====
  "לוגיסטיקה": {
    key: "logistics",
    label: "לוגיסטיקה",
    color: "#b36ec0",
    icon: "bi bi-box-seam",
    items: {
      "אוכל": "bi bi-basket2",
      "מים": "bi bi-droplet",
      "מיטוט": "bi bi-cloud-moon",
    },
  },

  // ===== רפואה =====
  "רפואה": {
    key: "medical",
    label: "רפואה",
    color: "#e91e63",
    icon: "bi bi-heart-pulse",
    items: {
      "ערכות עזרה ראשונה": "bi bi-bandaid",
      "תחבושות אישיות": "bi bi-bandaid-fill",
    },
  },

  // ===== תקשוב =====
  "תקשוב": {
    key: "it",
    label: "תקשוב",
    color: "#00bcd4",
    icon: "bi bi-broadcast-pin",
  },

  // ===== הדרכה =====
  "הדרכה": {
    key: "training",
    label: "הדרכה",
    color: "#8cb8ce",
    icon: "bi bi-journal-text",
    items: {
      "חוברות אימון": "bi bi-journal-bookmark",
      "ציוד מטווחים": "bi bi-bullseye",
    },
  },

  // ===== תחזוקה =====
  "תחזוקה": {
    key: "maintenance",
    label: "תחזוקה",
    color: "#4caf50",
    icon: "bi bi-wrench-adjustable",
    items: {
      "חלקי חילוף לנשק": "bi bi-gear-wide-connected",
      "שימון וניקוי": "bi bi-droplet-half",
    },
  },

  // ===== אבטחה =====
  "אבטחה": {
    key: "security",
    label: "אבטחה",
    color: "#bc9393",
    icon: "bi bi-shield-lock",
    items: {
      "אמצעי תצפית": "bi bi-binoculars",
    },
  },

  // ===== אחר =====
  "אחר": {
    key: "other",
    label: "אחר",
    color: "#4285f4",
    icon: "bi bi-question-circle",
  },
};

// ================= LOOKUPS =================

// עברית -> config (עם fallback)
export const getResourceConfigSafe = (label?: string): ResourceConfig => {
  if (!label) return DEFAULT_RESOURCE;
  return RESOURCE_CONFIG[label] ?? DEFAULT_RESOURCE;
};

// אנגלית -> config
export const RESOURCE_BY_KEY: Record<string, ResourceConfig> = Object.fromEntries(
  Object.values(RESOURCE_CONFIG).map((r) => [r.key, r])
);

// ================= HELPERS =================

export const getResourceIcon = (label?: string) => {
  return getResourceConfigSafe(label).icon;
};

export const getResourceColor = (label?: string) => {
  return getResourceConfigSafe(label).color;
};

export const getResourceKey = (label?: string) => {
  return getResourceConfigSafe(label).key;
};

export const getResourceLabel = (key?: string) => {
  return RESOURCE_BY_KEY[key ?? ""]?.label ?? DEFAULT_RESOURCE.label;
};

// אופציונלי (לשלב הבא)
export const getResourceItemIcon = (label?: string, itemName?: string) => {
  const config = getResourceConfigSafe(label);
  return config.items?.[itemName ?? ""] ?? config.icon;
};