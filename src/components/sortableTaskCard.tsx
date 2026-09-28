import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCardContent } from "./taskCardContent";
import type { Task } from "@/domain/schema";

export const cardClasses =
  "bg-card group rounded-lg shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] px-4 py-6";

type SortableTaskCardProps = {
  task: Task;
  onOpen: () => void;
};

export function SortableTaskCard({ task, onOpen }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      onClick={onOpen}
      className={`${cardClasses} cursor-pointer hover:opacity-80 transition-opacity ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <TaskCardContent task={task} />
    </li>
  );
}
