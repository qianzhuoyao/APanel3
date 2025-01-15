export const MAX_LEVEL = 999;
export const MIN_LEVEL = 20;

export const LEVEL = {
  operator: {
    setUp: MAX_LEVEL,
    nodeMapTree: MAX_LEVEL,
    setting: MAX_LEVEL,
    menu: MAX_LEVEL,
  },
  scene: MIN_LEVEL,
} as const;
