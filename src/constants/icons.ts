export const iconResources = {
  "אוכל": "bi bi-basket2",
  "מיטוט": "bi bi-cloud-moon",
  "רכבים": "bi bi-car-front",
  "network": "bi bi-broadcast-pin",
  "אופניים": "bi bi-bicycle",
  default: "bi bi-question-circle"
};

export const iconServiceType = {
    "מילואים- אימונים": "bi bi-crosshair",
    "סדיר- אימונים": "bi bi-shadows",
    "מילואים- תע\"ם": "bi bi-brightness-high-fill",
    "סדיר- תע”ם": "bi bi-vinyl-fill",
    "דפולטיבי": "bi bi-question-circle"
}  as const;

export type ServiceTypeKey = keyof typeof iconServiceType;
