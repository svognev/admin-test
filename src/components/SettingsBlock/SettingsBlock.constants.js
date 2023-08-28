import { ANIMATIONS } from "constants/index";

export const DEFAULT_GOAL_STYLE_VALUE = "default";
export const DEFAULT_GOAL_STYLE_NAME = "Default";

export const GOAL_STYLE_OPTIONS = [
  { value: DEFAULT_GOAL_STYLE_VALUE, label: DEFAULT_GOAL_STYLE_NAME },
  { value: "special", label: "Special" },
];

export const DEFAULT_GOAL_LIMIT = 100000;

export const ANIMATION_OPTIONS = [ ...ANIMATIONS ].map(el => ({ label: el, value: el }));