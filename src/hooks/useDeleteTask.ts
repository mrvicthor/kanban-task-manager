import type { ActionType, Task } from "@/domain/board";

export function useDeleteTask(
  boardId: string,
  task: Task,
  dispatch: (action: ActionType) => void,
  onOpenChange: () => void,
) {
  const handleDelete = () => {
    dispatch({
      type: "delete_task",
      boardId,
      status: task.status,
      taskId: task.id,
    });
    onOpenChange();
  };

  return {
    handleDelete,
  };
}
