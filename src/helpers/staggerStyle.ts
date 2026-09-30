export const STAGGER_START = 100; // ms, lets the menu open first
export const STAGGER_STEP = 40;
export const staggerStyle = (index: number) => ({
  animationDelay: `${STAGGER_START + index * STAGGER_STEP}ms`,
  animationFillMode: "both" as const,
});
