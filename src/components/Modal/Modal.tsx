import { AnimatePresence, motion } from "framer-motion";
import { BiError } from "react-icons/bi";
import { useModalContext } from "../../hooks/useModalContext";
import Loader from "../Loader/Loader";
import ModalProduct from "../ModalProduct/ModalProduct";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const Modal = () => {
  const { product, showModal, isLoading, error, handleShowModal } =
    useModalContext();
  return (
    <AnimatePresence mode="wait">
      {showModal ? (
        <motion.div
          variants={backdrop}
          className="fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center"
          animate="visible"
          initial="hidden"
          exit="hidden"
        >
          <div
            className="relative z-10 w-full h-full"
            onClick={() => {
              handleShowModal();
            }}
          ></div>
          <motion.div
            variants={modal}
            className="absolute z-20 top-20 right-1/2 translate-x-1/2 bg-slate-200 text-black rounded overflow-hidden w-3/4 sm:w-96 dark:bg-neutral-700 dark:text-white dark:divide-slate-200"
            style={{ translateX: "50%" }}
          >
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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
