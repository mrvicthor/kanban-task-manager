import { SlideContext } from "@/context/slide-context";
import { useContext } from "react";

export const useSlide = () => {
  const context = useContext(SlideContext);
  if (!context) {
    throw new Error("useSlide must be used within a SlideProvider");
  }
  return context;
};
