import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useBoard } from "@/hooks/useBoard";
import { useDeleteBoard } from "@/hooks/useDeleteBoard";

type DeleteBoardDialogProps = {
  open: boolean;
  boardTitle: string;
  boardId: string;
};

export function DeleteBoardDialog({
  open,
  boardTitle,
  boardId,
}: DeleteBoardDialogProps) {
  const { setShowDeleteBoard } = useBoard();
  const { deleteBoard } = useDeleteBoard(boardId);
  return (
    <AlertDialog open={open} onOpenChange={() => setShowDeleteBoard(false)}>
      <AlertDialogContent className="sm:max-w-md py-6 px-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive text-lg font-bold">
            Delete this board?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to delete the '{boardTitle}' board? This
            action will remove all columns and tasks and cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row gap-4 sm:justify-start border-0 bg-transparent">
          <AlertDialogAction
            onClick={deleteBoard}
            className="flex-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/80"
          >
            Delete
          </AlertDialogAction>
          <button
            className="flex-1 rounded-full bg-add-column-bg text-add-column-fg hover:bg-add-column-bg/80 border-none capitalize cursor-pointer"
            onClick={() => setShowDeleteBoard(false)}
          >
            cancel
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
