import type { ActionType, Task } from "@/domain/board";

export function useUpdateSubtask(
  boardId: string,
  task: Task,
  dispatch: (action: ActionType) => void,
) {
  const toggleSubtask = (subtaskId: string) => {
    const updatedSubtasks = task.subtasks.map((s) =>
      s.id === subtaskId ? { ...s, isCompleted: !s.isCompleted } : s,
    );

    dispatch({
      type: "update_task",
      boardId,
      oldStatus: task.status,
      taskId: task.id,
      task: { ...task, subtasks: updatedSubtasks },
    });
  };

  const changeStatus = (newStatus: string | null) => {
    if (!newStatus || newStatus === task.status) return;

    dispatch({
      type: "update_task",
      boardId,
      oldStatus: task.status,
      taskId: task.id,
      task: { ...task, status: newStatus },
    });
  };

  return {
    toggleSubtask,
    changeStatus,
  };
}
