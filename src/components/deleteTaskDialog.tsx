import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Task } from "@/domain/schema";

import { useBoard } from "@/hooks/useBoard";
import { useDeleteTask } from "@/hooks/useDeleteTask";

type DeleteTaskDialogProps = {
  open: boolean;
  boardId: string;
  task: Task;
};

export function DeleteTaskDialog({
  open,
  task,
  boardId,
}: DeleteTaskDialogProps) {
  const { dispatch, setConfirmDeleteOpen } = useBoard();
  const { handleDelete } = useDeleteTask(
    boardId,
    task,
    dispatch,
    setConfirmDeleteOpen,
  );
  return (
    <AlertDialog open={open} onOpenChange={() => setConfirmDeleteOpen(false)}>
      <AlertDialogContent className="sm:max-w-md py-6 px-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive text-lg font-bold">
            Delete this task?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to delete the '{task.title}' task and its
            subtasks? This action cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row gap-4 sm:justify-start border-0 bg-transparent">
          <AlertDialogAction
            onClick={handleDelete}
            className="flex-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/80"
          >
            Delete
          </AlertDialogAction>
          <button
            className="flex-1 rounded-full bg-add-column-bg text-add-column-fg hover:bg-add-column-bg/80 border-none capitalize cursor-pointer"
            onClick={() => setConfirmDeleteOpen(false)}
          >
            cancel
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
