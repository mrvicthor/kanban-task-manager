import type { ActionType } from "@/domain/board";
import type { Task } from "@/domain/schema";
import type { Dispatch, SetStateAction } from "react";

export function useDeleteTask(
  boardId: string,
  task: Task,
  dispatch: (action: ActionType) => void,
  setConfirmDeleteOpen: Dispatch<SetStateAction<boolean>>,
) {
  const handleDelete = () => {
    dispatch({
      type: "delete_task",
      boardId,
      status: task.status,
      taskId: task.id,
    });
    setConfirmDeleteOpen(false);
  };

  return {
    handleDelete,
  };
}
