import { BsMoon, BsSun } from "react-icons/bs";
import { useThemeContext } from "../../hooks/useThemeContext";
import ThemeButton from "../ThemeButton/ThemeButton";

const Header = () => {
  const { isDark, handleIsDark } = useThemeContext();

  const themeButtonChildren = isDark ? (
    <div className="flex items-center">
      <BsMoon />
      <p className="ml-1">Dark Mode</p>
    </div>
  ) : (
    <div className="flex items-center">
      <BsSun />
      <p className="ml-1">Light Mode</p>
    </div>
  );

  return (
    <header className="w-full bg-slate-50 dark:bg-neutral-800 border-b-[1px] border-gray-300 dark:border-neutral-700 dark:text-white">
      <nav className="px-6 py-3 flex justify-between container mx-auto items-center">
        <div className="bg-gray-300 dark:bg-neutral-900 w-32 py-5 rounded-lg"></div>
        <ThemeButton onClick={handleIsDark}>{themeButtonChildren}</ThemeButton>
      </nav>
    </header>
  );
};

export default Header;
