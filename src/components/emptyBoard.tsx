import { LayoutGrid } from "lucide-react";
import { AddBoardDialog } from "./forms/addBoardDialog";

export function EmptyBoardsState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-screen px-6 text-center">
      <div className="flex items-center justify-center size-16 rounded-full bg-add-column-bg">
        <LayoutGrid className="size-7 text-primary" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-foreground">No boards yet</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          Create your first board to start organizing tasks into columns.
        </p>
      </div>

      <AddBoardDialog />
    </div>
  );
}
