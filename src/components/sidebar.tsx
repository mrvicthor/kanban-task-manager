import LogoLight from "@/assets/logo-light.svg";
import LogoDark from "@/assets/logo-dark.svg";
import { useTheme } from "@/hooks/useTheme";
import { useSlide } from "@/hooks/useSlide";
import { useBoard } from "@/hooks/useBoard";
import ClosedEye from "./closeEye";
import SvgComponent from "./svgComponent";
import type { SetURLSearchParams } from "react-router";
import BoardList from "./boardList";
import ToggleTheme from "./toggleTheme";

type SidebarProps = {
  activeBoardName: string;
  setSearchParams: SetURLSearchParams;
};

const Sidebar = ({ activeBoardName, setSearchParams }: SidebarProps) => {
  const { theme, setTheme } = useTheme();
  const { currentSlide, setCurrentSlide } = useSlide();
  const {
    setOpenAddBoardForm,
    openAddBoardForm,
    state: { boards },
  } = useBoard();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  return (
    <section
      className={`w-75 h-full hidden fixed overflow-auto bg-card px-8 py-8 border-r border-border md:flex flex-col gap-4 transition-transform duration-300 ease-in-out z-10 ${
        currentSlide > 0 ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <div className="h-6 -ml-24">
        <img
          alt="logo"
          src={isDark ? LogoLight : LogoDark}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="mt-12">
        <h2 className="font-bold text-xs capitalize text-muted-foreground tracking-[2.5px]">
          all boards ({boards.length})
        </h2>
        <BoardList
          boards={boards}
          activeBoardName={activeBoardName}
          setSearchParams={setSearchParams}
        />
      </div>

      <button
        onClick={() => setOpenAddBoardForm(!openAddBoardForm)}
        aria-label="add new board"
        className="text-primary flex items-center capitalize gap-4 text-sm font-bold cursor-pointer"
      >
        <SvgComponent /> + create new board
      </button>
      <ToggleTheme
        isDark={isDark}
        setTheme={setTheme}
        styles="fixed bottom-24 left-6 w-62.75"
      />

      <button
        onClick={() => setCurrentSlide(currentSlide === 0 ? 1 : 0)}
        className="flex items-center gap-2 text-muted-foreground w-40 h-12 cursor-pointer rounded-[6px] fixed bottom-10 -left-5 px-4 hover:bg-add-column-bg hover:w-74 hover:rounded-full hover:text-primary"
      >
        <div className="ml-4" />
        <ClosedEye className="" />
        <p className="text-xs capitalize">hide sidebar</p>
      </button>
    </section>
  );
};

export default Sidebar;
