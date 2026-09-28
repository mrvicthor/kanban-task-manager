import type { Board, Task } from "@/domain/schema";
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { useBoard } from "./useBoard";

export function useDragAndDrop(board: Board) {
  const { dispatch, setTaskId, setViewTask } = useBoard();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findColumn = (id: UniqueIdentifier) =>
    board!.columns.find((c) => c.id === id || c.tasks.some((t) => t.id === id));

  const indexInColumn = (id: UniqueIdentifier, columnId: string) => {
    const column = board!.columns.find((c) => c.id === columnId)!;
    const index = column.tasks.findIndex((t) => t.id === id);
    return index === -1 ? column.tasks.length : index;
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const task = board!.columns
      .flatMap((c) => c.tasks)
      .find((t) => t.id === active.id);
    setActiveTask(task ?? null);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const from = findColumn(active.id);
    const to = findColumn(over.id);
    if (!from || !to || from.id === to.id) return;

    dispatch({
      type: "move_task",
      boardId: board!.id,
      taskId: String(active.id),
      toColumnId: to.id,
      toIndex: indexInColumn(over.id, to.id),
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    if (!over) return;
    const column = findColumn(active.id);
    if (!column || findColumn(over.id)?.id !== column.id) return;

    const oldIndex = column.tasks.findIndex((t) => t.id === active.id);
    const newIndex =
      over.id === column.id
        ? column.tasks.length - 1
        : column.tasks.findIndex((t) => t.id === over.id);

    if (oldIndex !== newIndex) {
      dispatch({
        type: "move_task",
        boardId: board!.id,
        taskId: String(active.id),
        toColumnId: column.id,
        toIndex: newIndex,
      });
    }
  };
  const openTask = (taskId: string) => {
    setTaskId(taskId);
    setViewTask(true);
  };
  return {
    sensors,
    findColumn,
    indexInColumn,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    openTask,
    activeTask,
    setActiveTask,
  };
}
