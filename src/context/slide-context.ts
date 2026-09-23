import { createContext } from "react";

export type SlideContextType = {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
};

export const SlideContext = createContext<SlideContextType | undefined>(
  undefined,
);
