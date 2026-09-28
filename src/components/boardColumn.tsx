import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { getStatusColor } from "@/helpers/getStatusColor";
import type { Column } from "@/domain/schema";
import { SortableTaskCard } from "./sortableTaskCard";

type BoardColumnProps = {
  column: Column;
  onOpenTask: (taskId: string) => void;
};

export function BoardColumn({ column, onOpenTask }: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <li className="flex flex-col w-70 shrink-0">
      <h2 className="flex items-center gap-3 uppercase text-muted-foreground font-bold text-xs tracking-[2.4px] mb-6">
        <span
          style={{ backgroundColor: getStatusColor(column.name) }}
          className="block rounded-full size-3.75 shrink-0"
        />
        {column.name} ({column.tasks.length})
      </h2>

      <SortableContext
        items={column.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul
          ref={setNodeRef}
          className={`flex flex-col gap-5 min-h-[75vh] rounded-lg transition-colors ${
            column.tasks.length === 0
              ? "border-2 border-dashed border-border"
              : ""
          } ${isOver ? "bg-border/20" : ""}`}
        >
          {column.tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              onOpen={() => onOpenTask(task.id)}
            />
          ))}
        </ul>
      </SortableContext>
    </li>
  );
}
