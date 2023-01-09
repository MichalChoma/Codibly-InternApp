import { BiError } from "react-icons/bi";
import { useModalContext } from "../../hooks/useModalContext";
import Loader from "../Loader/Loader";
import ModalProduct from "../ModalProduct/ModalProduct";

const Modal = () => {
  const { product, showModal, isLoading, error, handleShowModal } =
    useModalContext();
  return showModal ? (
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center">
      <div
        className="relative z-10 w-full h-full"
        onClick={() => {
          handleShowModal();
        }}
      ></div>
      <div className="absolute z-20 top-20 left-1/2 -translate-x-1/2 bg-slate-200 text-black rounded overflow-hidden w-3/4 sm:w-96 dark:bg-neutral-700 dark:text-white dark:divide-slate-200">
        {isLoading ? <Loader /> : null}
        {error ? (
          <div className="text-center p-1 flex items-center justify-center">
            <p className="text-red-500 mr-1">
              <BiError />
            </p>
            Something went wrong
          </div>
        ) : null}
        {!isLoading && product ? (
          <>
            <ModalProduct {...product} handleShowModal={handleShowModal} />
          </>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default Modal;
