import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeleteTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskTitle: string;
  onConfirm: () => void;
};

export function DeleteTaskDialog({
  open,
  onOpenChange,
  taskTitle,
  onConfirm,
}: DeleteTaskDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={() => onOpenChange(false)}>
      <AlertDialogContent className="sm:max-w-md py-6 px-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive text-lg font-bold">
            Delete this task?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to delete the '{taskTitle}' task and its
            subtasks? This action cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row gap-4 sm:justify-start border-0 bg-transparent">
          <AlertDialogAction
            onClick={onConfirm}
            className="flex-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/80"
          >
            Delete
          </AlertDialogAction>
          <button
            className="flex-1 rounded-full bg-add-column-bg text-add-column-fg hover:bg-add-column-bg/80 border-none capitalize cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            cancel
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
