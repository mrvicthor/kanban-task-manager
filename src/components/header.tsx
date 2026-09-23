import { useTheme } from "../hooks/useTheme";
import { useSlide } from "../hooks/useSlide";
import LogoLight from "@/assets/logo-light.svg";
import LogoDark from "@/assets/logo-dark.svg";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import { useBoard } from "@/hooks/useBoard";

const Header = () => {
  const { theme } = useTheme();
  const { currentSlide } = useSlide();
  const { activeBoardName } = useActiveBoard();
  const { setShowTaskForm } = useBoard();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  return (
    <header className="flex items-center gap-6 border-b border-border h-24.25 bg-card fixed w-full pr-8">
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
      <p
        className={`${currentSlide === 0 && "pl-82 transition-transform duration-300 ease-in-out"} text-foreground text-2xl font-bold`}
      >
        {activeBoardName}
      </p>
      <button
        onClick={() => setShowTaskForm(true)}
        className="ml-auto bg-primary py-3 px-4 rounded-full capitalize font-bold text-[15px] cursor-pointer hover:bg-primary-hover"
      >
        + add new task
      </button>
    </header>
  );
};

export default Header;
