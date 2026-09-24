import { MoreVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBoard } from "@/hooks/useBoard";
import type { Task } from "@/domain/board";
import { useUpdateSubtask } from "@/hooks/useUpdateSubtask";

type ViewTaskDialogProps = {
  task: Task;
  boardId: string;
};

export function ViewTaskDialog({ task, boardId }: ViewTaskDialogProps) {
  const {
    state: { boards },
    dispatch,
    setViewTask,
    setOnEdit,
    setConfirmDeleteOpen,
  } = useBoard();
  const { changeStatus, toggleSubtask } = useUpdateSubtask(
    boardId,
    task,
    dispatch,
  );

  const board = boards.find((b) => b.id === boardId)!;
  const completedCount = task.subtasks.filter((s) => s.isCompleted).length;

  return (
    <Dialog open={!!task} onOpenChange={() => setViewTask(false)}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="flex-row items-start justify-between gap-4">
          <DialogTitle className="text-lg font-bold leading-snug">
            {task.title}
          </DialogTitle>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  aria-label="Task options"
                  className="text-muted-foreground hover:text-foreground shrink-0"
                >
                  <MoreVertical className="size-5" />
                </button>
              }
            ></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setOnEdit(true);
                  setViewTask(false);
                }}
              >
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={(e) => {
                  e.preventDefault();
                  setConfirmDeleteOpen(true);
                  setViewTask(false);
                }}
              >
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogHeader>

        {task.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {task.description}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-foreground">
            Subtasks ({completedCount} of {task.subtasks.length})
          </p>

          {task.subtasks.map((subtask) => (
            <label
              key={subtask.id}
              className="flex items-center gap-4 bg-background rounded-lg px-4 py-3 cursor-pointer hover:bg-primary/10 transition-colors"
            >
              <Checkbox
                checked={subtask.isCompleted}
                onCheckedChange={() => toggleSubtask(subtask.id as string)}
              />
              <span
                className={`text-xs font-bold ${
                  subtask.isCompleted
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {subtask.title}
              </span>
            </label>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-foreground">Current Status</p>
          <Select value={task.status} onValueChange={changeStatus}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {board.columns.map((column) => (
                <SelectItem key={column.id} value={column.name}>
                  {column.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
}
