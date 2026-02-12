export const iconResources = {
  // לוגיסטיקה בסיסית
  "אוכל": "bi bi-basket2",
  "מים": "bi bi-droplet",
  "מיטוט": "bi bi-cloud-moon",
  "לוגיסטיקה": "bi bi-box-seam",

  // תחבורה
  "רכבים": "bi bi-car-front",
  "אופניים": "bi bi-bicycle",
  "תחבורה": "bi bi-truck",
  "אוטובוסים": "bi bi-bus-front",
  "משאיות לוגיסטיות": "bi bi-truck-flatbed",

  // תחמושת ונשק
  "תחמושת": "bi bi-bullseye",
  "כד’ 5.56 מ”מ": "bi bi-record-circle",
  "רימונים": "bi bi-exclamation-octagon",

  // ציוד ולבוש
  "ציוד אישי": "bi bi-backpack",
  "אפודים": "bi bi-shield",
  "קסדות": "bi bi-helmet-safety",

  // הדרכה ואימונים
  "הדרכה": "bi bi-journal-text",
  "חוברות אימון": "bi bi-journal-bookmark",
  "ציוד מטווחים": "bi bi-bullseye",

  // רפואה
  "רפואה": "bi bi-heart-pulse",
  "ערכות עזרה ראשונה": "bi bi-bandaid",
  "תחבושות אישיות": "bi bi-bandaid-fill",

  // תחזוקה
  "תחזוקה": "bi bi-wrench-adjustable",
  "חלקי חילוף לנשק": "bi bi-gear-wide-connected",
  "שימון וניקוי": "bi bi-droplet-half",

  // מבצעי / אבטחה
  "אבטחה": "bi bi-shield-lock",
  "אמצעי תצפית": "bi bi-binoculars",
  "אמצעי תאורה": "bi bi-lightbulb",

  // תקשוב
  "network": "bi bi-broadcast-pin",

  // fallback
  default: "bi bi-question-circle"
};

export const iconServiceType = {
    "מילואים- אימונים": "bi bi-crosshair",
    "סדיר- אימונים": "bi bi-shadows",
    "מילואים- תע\"ם": "bi bi-brightness-high-fill",
    "סדיר- תע”ם": "bi bi-vinyl-fill",
    default: "bi bi-question-circle"
}  as const;

export type ServiceTypeKey = keyof typeof iconServiceType;