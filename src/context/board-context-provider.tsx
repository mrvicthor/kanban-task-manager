import { useReducer, type ReactNode, useState } from "react";
import { boardReducer, type Task, type BoardData } from "../domain/board";
import { CreateBoardContext } from "./board-context";
import { boards } from "../data.json";

const initialState: BoardData = { boards };

export const BoardContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const [openAddBoardForm, setOpenAddBoardForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  console.log({ initialState });
  return (
    <CreateBoardContext
      value={{
        state,
        dispatch,
        openAddBoardForm,
        setOpenAddBoardForm,
        showTaskForm,
        setShowTaskForm,
        onEdit,
        setOnEdit,
        task,
        setTask,
      }}
    >
      {children}
    </CreateBoardContext>
  );
};
