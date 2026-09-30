import { useTheme } from "../hooks/useTheme";
import { useSlide } from "../hooks/useSlide";
import LogoLight from "@/assets/logo-light.svg";
import LogoDark from "@/assets/logo-dark.svg";
import { useBoard } from "@/hooks/useBoard";
import LogoMobile from "@/assets/logo-mobile.svg";
import BoardActionDialog from "./boardActionDialog";
import { ChevronDown, Plus, ChevronUp } from "lucide-react";
import type { SetURLSearchParams } from "react-router";
import { Popover, PopoverTrigger } from "./ui/popover";
import MobileMenu from "./mobileMenu";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type HeaderProps = {
  activeBoardName: string;
  setSearchParams: SetURLSearchParams;
};

const Header = ({ activeBoardName, setSearchParams }: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const { currentSlide } = useSlide();

  const {
    setShowTaskForm,
    setOpenMobileMenu,
    openMobileMenu,
    state: { boards },
  } = useBoard();
  const isAddTaskButtonDisabled =
    boards.find((b) => b.name === activeBoardName)!.columns.length === 0;

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  return (
    <>
      <Popover open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
        <header
          ref={headerRef}
          className="flex items-center gap-4 md:gap-6 border-b border-border h-24.25 bg-card fixed w-full pr-4 md:pr-4"
        >
          {currentSlide > 0 && (
            <>
              <div className={`h-6 ml-6`}>
                <img
                  alt="logo"
                  src={isDark ? LogoLight : LogoDark}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="h-full bg-border w-px" />
            </>
          )}
          <div
            aria-label="Show all boards"
            className={cn(
              currentSlide > 0 ? "md:hidden" : "pl-4",
              "cursor-pointer",
            )}
          >
            <img
              alt=""
              src={LogoMobile}
              className="w-full h-full object-contain"
            />
          </div>
          <h1
            className={`${currentSlide === 0 && "md:pl-66 transition-transform duration-300 ease-in-out"} text-foreground text-lg md:text-2xl font-bold`}
          >
            {activeBoardName}
          </h1>
          <PopoverTrigger
            aria-label="Show all boards"
            className="pl-4 md:hidden cursor-pointer"
          >
            {openMobileMenu ? <ChevronUp /> : <ChevronDown />}
          </PopoverTrigger>
          <button
            onClick={() => setShowTaskForm(true)}
            className="ml-auto md:hidden bg-primary py-3 px-5 rounded-full cursor-pointer hover:bg-primary-hover text-white"
          >
            <Plus />
          </button>
          <button
            onClick={() => setShowTaskForm(true)}
            disabled={isAddTaskButtonDisabled}
            className="ml-auto hidden md:block bg-primary text-white py-3 px-4 rounded-full capitalize font-bold text-[15px] cursor-pointer hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            + add new task
          </button>
          <BoardActionDialog />
        </header>

        {openMobileMenu && (
          <div
            aria-hidden="true"
            className="fixed inset-x-0 top-24 bottom-0 z-40 bg-black/50 md:hidden"
          />
        )}
        <MobileMenu
          anchor={headerRef}
          boards={boards}
          activeBoardName={activeBoardName}
          setSearchParams={setSearchParams}
        />
      </Popover>
    </>
  );
};

export default Header;
