import { useState, type ReactNode } from "react";
import { SlideContext } from "./slide-context";

type SlideProviderProps = {
  children: ReactNode;
};

export const SlideProvider = ({ children }: SlideProviderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <SlideContext.Provider value={{ currentSlide, setCurrentSlide }}>
      {children}
    </SlideContext.Provider>
  );
};
