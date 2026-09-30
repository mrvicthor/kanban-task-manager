import SvgComponent from "./svgComponent";
import type { Board } from "@/domain/schema";
import type { Dispatch, SetStateAction } from "react";
import type { SetURLSearchParams } from "react-router";

type MobileBoardListProps = {
  boards: Board[];
  activeBoardName: string;
  setSearchParams: SetURLSearchParams;
  setOpenMobileMenu: Dispatch<SetStateAction<boolean>>;
};

const MobileBoardList = ({
  boards,
  activeBoardName,
  setSearchParams,
  setOpenMobileMenu,
}: MobileBoardListProps) => {
  return (
    <ul className="mt-4 overflow-y-auto flex flex-col">
      {boards.map((board, index) => (
        <li
          key={index}
          className={`${board.name === activeBoardName ? "bg-primary text-white" : "hover:bg-background hover:text-primary"} w-68 cursor-pointer px-16 py-3.5 text-muted-foreground rounded-full -ml-10.5`}
        >
          <button
            onClick={() => {
              setSearchParams({ board: board.name });
              setOpenMobileMenu(false);
            }}
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

export default MobileBoardList;
