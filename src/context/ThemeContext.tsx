import React, { useEffect, useState } from "react";

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = React.createContext<{
  isDark: boolean;
  handleIsDark: () => void;
} | null>(null);

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [isDark, setIsDark] = useState<boolean | undefined>(undefined);
  const handleIsDark = () => setIsDark((prevState) => !prevState);

  const getThemeFromLS = () => {
    const theme = localStorage.getItem("CODIBLY_THEME");
    if (!theme) {
      return false;
    }
    try {
      const themeParse = JSON.parse(theme);
      return themeParse;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const setThemeToLS = (isDark: boolean) => {
    localStorage.setItem("CODIBLY_THEME", JSON.stringify(isDark));
  };

  useEffect(() => {
    setIsDark(getThemeFromLS());
  }, []);

  useEffect(() => {
    if (isDark === undefined) {
      return;
    }
    setThemeToLS(isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider
      value={{
        isDark: isDark || false,
        handleIsDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
