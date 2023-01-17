import { motion } from "framer-motion";
import React from "react";

interface ThemeButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const ThemeButton = ({ children, onClick, disabled }: ThemeButtonProps) => {
  return (
    <motion.button
      className="bg-gray-200 p-2 hover:bg-gray-300 cursor-pointer text-sm dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:text-white rounded-lg transition-colors"
      onClick={onClick}
      role="themeButton"
      whileTap={{
        scale: 0.9,
      }}
      transition={{ type: "spring", damping: 100, stiffness: 500 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default ThemeButton;
