import { Plus } from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Board } from "@/domain/schema";
import SvgComponent from "./svgComponent";
import ToggleTheme from "./toggleTheme";
import MobileBoardList from "./mobileBoardList";
import { useBoard } from "@/hooks/useBoard";
import type { SetURLSearchParams } from "react-router";
import { useTheme } from "@/hooks/useTheme";
import type { RefObject } from "react";

type MobileMenuProps = {
  anchor: RefObject<HTMLElement | null>;
  boards: Board[];
  activeBoardName: string;
  setSearchParams: SetURLSearchParams;
};

const MobileMenu = ({
  anchor,
  boards,
  activeBoardName,
  setSearchParams,
}: MobileMenuProps) => {
  const { setOpenAddBoardForm, setOpenMobileMenu } = useBoard();
  const { theme, setTheme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  return (
    <PopoverContent
      anchor={anchor}
      align="center"
      sideOffset={16}
      collisionPadding={16}
      className="w-66 gap-0 rounded-lg border-0 p-0 py-4 shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)] md:hidden"
    >
      <p
        id="mobile-boards-heading"
        className="mb-5 px-6 text-xs font-bold uppercase tracking-[2.4px] text-muted-foreground"
      >
        All Boards ({boards.length})
      </p>

      <nav aria-labelledby="mobile-boards-heading" className="flex flex-col">
        <MobileBoardList
          boards={boards}
          activeBoardName={activeBoardName}
          setOpenMobileMenu={setOpenMobileMenu}
          setSearchParams={setSearchParams}
        />

        <div className={cn("pr-6")}>
          <button
            type="button"
            onClick={() => {
              setOpenMobileMenu(false);
              setOpenAddBoardForm(true);
            }}
            className="flex w-full items-center gap-4 rounded-r-full py-3.5 pl-6 text-[15px] font-bold text-primary transition-colors cursor-pointer hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
          >
            <SvgComponent />
            <span className="flex items-center gap-1">
              <Plus className="size-3" strokeWidth={3} aria-hidden="true" />
              Create New Board
            </span>
          </button>
        </div>
      </nav>

      <ToggleTheme
        isDark={isDark}
        setTheme={setTheme}
        styles="w-[235px] ml-4"
      />
    </PopoverContent>
  );
};

export default MobileMenu;
