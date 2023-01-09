import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useThemeContext = () => {
  const themeState = useContext(ThemeContext);

  if (!themeState) {
    throw new Error(`You forgot ThemeContextProvider!`);
  }

  return themeState;
};
