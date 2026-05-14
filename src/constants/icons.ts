export const iconServiceType = {
  מילואים: {
    className: 'bi bi-crosshair',
    color: '#FABF8B',
  },
  סדיר: {
    className: 'bi bi-shadows',
    color: '#87C9FF',
  },
  קבע: {
    className: 'bi bi-brightness-high-fill',
    color: '#43a047',
  },
  'שירות לאומי': {
    className: 'bi bi-vinyl-fill',
    color: '#8e24aa',
  },
  default: {
    otherName: 'דפולטיבי',
    className: 'bi bi-question-circle',
    color: '#616161',
  },
} as const;

export type ServiceTypeKey = keyof typeof iconServiceType;
