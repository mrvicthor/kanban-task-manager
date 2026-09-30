import type { Theme } from "@/context/them-context";
import { Moon, Sun } from "lucide-react";

type Props = {
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  styles: string;
};

const ToggleTheme = ({ isDark, setTheme, styles }: Props) => {
  return (
    <div
      className={`flex items-center justify-center gap-3.25 h-12 rounded-[6px] bg-background ${styles}`}
    >
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
  );
};

export default ToggleTheme;
