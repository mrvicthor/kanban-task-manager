import { useContext } from "react";
import { CreateBoardContext } from "../context/board-context";

export const useBoard = () => {
  const context = useContext(CreateBoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};
