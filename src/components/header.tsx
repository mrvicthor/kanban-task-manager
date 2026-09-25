import { useTheme } from "../hooks/useTheme";
import { useSlide } from "../hooks/useSlide";
import LogoLight from "@/assets/logo-light.svg";
import LogoDark from "@/assets/logo-dark.svg";
import { useBoard } from "@/hooks/useBoard";
import LogoMobile from "@/assets/logo-mobile.svg";
import BoardActionDialog from "./boardActionDialog";
import { Plus } from "lucide-react";

type HeaderProps = {
  activeBoardName: string;
};

const Header = ({ activeBoardName }: HeaderProps) => {
  const { theme } = useTheme();
  const { currentSlide } = useSlide();

  const {
    setShowTaskForm,
    state: { boards },
  } = useBoard();
  const isAddTaskButtonDisabled =
    boards.find((b) => b.name === activeBoardName)!.columns.length === 0;

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  return (
    <header className="flex items-center gap-4 md:gap-6 border-b border-border h-24.25 bg-card fixed w-full pr-4 md:pr-4">
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
      <div className="pl-4">
        <img
          alt="logo"
          src={LogoMobile}
          className="w-full h-full object-contain md:hidden"
        />
      </div>
      <p
        className={`${currentSlide === 0 && "md:pl-70 transition-transform duration-300 ease-in-out"} text-foreground text-2xl font-bold`}
      >
        {activeBoardName}
      </p>
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
  );
};

export default Header;
