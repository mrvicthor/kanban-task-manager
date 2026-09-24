import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useBoard } from "@/hooks/useBoard";

const BoardActionDialog = () => {
  const { setShowEditBoard, setShowDeleteBoard } = useBoard();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            aria-label="Board options"
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            <MoreVertical className="size-7" />
          </button>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-7">
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setShowEditBoard(true);
          }}
          className="text-muted-foreground font-bold"
        >
          Edit Board
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive font-bold"
          onClick={(e) => {
            e.preventDefault();
            console.log("delete board");
            setShowDeleteBoard(true);
          }}
        >
          Delete Board
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BoardActionDialog;
