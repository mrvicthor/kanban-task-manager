import { useReducer, type ReactNode, useState } from "react";
import { boardReducer, type BoardData } from "../domain/board";
import { CreateBoardContext } from "./board-context";
import { boards } from "../data.json";

const initialState: BoardData = { boards };

export const BoardContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const [openAddBoardForm, setOpenAddBoardForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  return (
    <CreateBoardContext
      value={{
        state,
        dispatch,
        openAddBoardForm,
        setOpenAddBoardForm,
        showTaskForm,
        setShowTaskForm,
      }}
    >
      {children}
    </CreateBoardContext>
  );
};
