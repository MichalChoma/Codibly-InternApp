import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error(`You forgot ModalContextProvider!`);
  }

  return modalContext;
};
