import LogoLight from "@/assets/logo-light.svg";
import LogoDark from "@/assets/logo-dark.svg";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { useSlide } from "@/hooks/useSlide";
import { useBoard } from "@/hooks/useBoard";
import ClosedEye from "./closeEye";
import SvgComponent from "./svgComponent";
import { useActiveBoard } from "@/hooks/useActiveBoard";

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const { currentSlide, setCurrentSlide } = useSlide(); // Assuming you want to use the slide context here, but it's currently unused
  const {
    setOpenAddBoardForm,
    openAddBoardForm,
    state: { boards },
  } = useBoard();
  const { activeBoardName, setSearchParams } = useActiveBoard();
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
        <ul className="-ml-16 mt-4 overflow-y-auto">
          {boards.map((board, index) => (
            <li
              key={index}
              className={`${board.name === activeBoardName ? "bg-primary text-white" : "hover:bg-background hover:text-primary"} cursor-pointer px-16 py-3.5 text-muted-foreground  left-4 rounded-full`}
            >
              <button
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => setSearchParams({ board: board.name })}
                aria-current={
                  board.name === activeBoardName ? "true" : undefined
                }
              >
                <SvgComponent />
                {board.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => setOpenAddBoardForm(!openAddBoardForm)}
        className="text-primary flex items-center capitalize gap-4 text-sm font-bold cursor-pointer"
      >
        <SvgComponent /> + create new board
      </button>

      <div className="flex items-center justify-center gap-3.25 w-62.75 h-12 rounded-[6px] bg-background fixed bottom-24 left-6">
        <Sun className="size-4.5 text-muted-foreground" />

        <button
          role="switch"
          aria-checked={isDark}
          aria-label="Toggle dark mode"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="relative w-10 h-5 rounded-full shrink-0 cursor-pointer"
          style={{ backgroundColor: "#A8A4FF" }}
        >
          <span
            className={`absolute top-0.75 left-0.75 size-3.5 rounded-full bg-white transition-transform duration-200 ${
              isDark ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>

        <Moon className="size-3.75 text-muted-foreground" />
      </div>
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
