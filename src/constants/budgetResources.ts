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
    color: "#d1bb95",
    icon: "bi bi-bullseye",
    items: {
      "כד’ 5.56 מ”מ": "bi bi-dot",
      "כד’ 7.62 מ”מ": "bi bi-circle-fill",
      
      "רימון יד מס’ 20": "bi bi-exclamation-diamond",
      "רימון יד מס’ 4": "bi bi-exclamation-diamond-fill",
      "רימון יד מס’ 40": "bi bi-exclamation-octagon",
      
      "טיל נ\"ט": "bi bi-rocket",
      
      "תותח": "bi bi-bullseye",
      "מאג": "bi bi-grip-horizontal", 
      "מקלע": "bi bi-three-dots", 
      
      "טנק": "bi bi-truck-front",
      "מוקש": "bi bi-exclamation-triangle",
    },
  },

  // ===== ימ"מ =====
  'ימ"מ': {
    key: "mm",
    label: 'ימ"מ',
    color: "#a5daea",
    icon: "bi bi-shield-fill",
  },

  // ===== הובלות =====
  "הובלות": {
    key: "transportation",
    label: "הובלות",
    color: "#c2ddb5",
    icon: "bi bi-truck",
    items: {
      "סמי טריילר": "bi bi-truck",
      "משאיות": "bi bi-truck-front",
      "גרר": "bi bi-truck-flatbed",
    },
  },

  // ===== ק"מ =====
  'ק"מ': {
    key: "km",
    label: 'ק"מ',
    color: "#e5c9bd",
    icon: "bi bi-speedometer2",
  },

  // ===== הפשרות =====
  "הפשרות": {
    key: "thawing",
    label: "הפשרות",
    color: "#93a7df",
    icon: "bi bi-thermometer-snow",
    items: {
      "הפשרות": "bi bi-thermometer-snow",
      "אוהלים": "bi bi-tent",
    },
  },

  // ===== סטיקלייט =====
  "סטיקלייט": {
    key: "sticklight",
    label: "סטיקלייט",
    color: "#d6cfad",
    icon: "bi bi-lightbulb",
    items: {
      "ציוד מטווחים": "bi bi-bullseye",
      "ציוד אישי": "bi bi-backpack",
      "תאורה": "bi bi-lightning",
    },
  },

  // ===== מאמנים =====
  "מאמנים": {
    key: "trainers",
    label: "מאמנים",
    color: "#f4c8b5",
    icon: "bi bi-person-workspace",
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

export const getResourceItemIcon = (label?: string, itemName?: string) => {
  const config = getResourceConfigSafe(label);
  return config.items?.[itemName ?? ""] ?? config.icon;
};