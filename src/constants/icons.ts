export const iconResources = {
  "אוכל": "bi bi-egg-fried",
  "מיטוט": "bi bi-lamp-fill",
  "חךלחח": "bi bi-droplet-half",
  "וטא": "bi bi-wifi",
  "אופניים": "bi bi-bicycle",
  default: "bi bi-question-circle"
};

export const iconServiceType = {
    "מילואים- אימונים": "bi bi-brightness-high-fill",
    "סדיר- אימונים": "bi bi-circle-fill",
    "מילואים- תע\"ם": "bi bi-brightness-high-fill",
    "סדיר- תע”ם": "bi bi-circle-fill",
    default: "bi bi-question-circle"
}  as const;

export type ServiceType = keyof typeof iconServiceType;