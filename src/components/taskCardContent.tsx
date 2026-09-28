import type { Task } from "@/domain/schema";

export function TaskCardContent({ task }: { task: Task }) {
  return (
    <>
      <p className="text-[15px] font-bold text-foreground mb-1 group-hover:text-primary">
        {task.title}
      </p>
      <p className="text-xs font-bold text-muted-foreground">
        {task.subtasks.filter((s) => s.isCompleted).length} of{" "}
        {task.subtasks.length} subtasks
      </p>
    </>
  );
}
