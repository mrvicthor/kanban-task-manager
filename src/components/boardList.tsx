import SvgComponent from "./svgComponent";
import type { Board } from "@/domain/schema";
import type { SetURLSearchParams } from "react-router";

type BoardListProps = {
  boards: Board[];
  activeBoardName: string;
  setSearchParams: SetURLSearchParams;
};

const BoardList = ({
  boards,
  activeBoardName,
  setSearchParams,
}: BoardListProps) => {
  return (
    <ul className="-ml-16 mt-4 overflow-y-auto">
      {boards.map((board, index) => (
        <li
          key={index}
          className={`${board.name === activeBoardName ? "bg-primary text-white" : "hover:bg-background hover:text-primary"} cursor-pointer px-16 py-3.5 text-muted-foreground left-4 rounded-full`}
        >
          <button
            onClick={() => setSearchParams({ board: board.name })}
            className="flex items-center gap-4 cursor-pointer"
            aria-current={board.name === activeBoardName ? "true" : undefined}
          >
            <SvgComponent />
            <span className="min-w-0 flex-1 truncate capitalize">
              {board.name}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BoardList;
