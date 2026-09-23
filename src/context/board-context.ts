import { createContext, type Dispatch, type SetStateAction } from "react";
import { type BoardData, type ActionType } from "../domain/board";
export type BoardContextType = {
  state: BoardData;
  dispatch: React.ActionDispatch<[action: ActionType]>;
  openAddBoardForm: boolean;
  setOpenAddBoardForm: Dispatch<SetStateAction<boolean>>;
  showTaskForm: boolean;
  setShowTaskForm: Dispatch<SetStateAction<boolean>>;
  onEdit: boolean;
  setOnEdit: Dispatch<SetStateAction<boolean>>;
  taskId: string | null;
  setTaskId: Dispatch<SetStateAction<string | null>>;
};

export const CreateBoardContext = createContext<BoardContextType | undefined>(
  undefined,
);
