import { useProductsContext } from "../../hooks/useProductsContext";
import ThemeButton from "../ThemeButton/ThemeButton";

const Pagination = () => {
  const { page, setPage, totalPages } = useProductsContext();
  return (
    <div className="flex flex-row items-center p-2 justify-center">
      <ThemeButton
        onClick={() =>
          setPage((prevState) => {
            if (prevState === 1) {
              return 1;
            }
            return prevState - 1;
          })
        }
      >
        previous page
      </ThemeButton>
      <p className="px-4">{page}</p>
      <ThemeButton
        onClick={() => {
          setPage((prevState) => {
            if (prevState === totalPages) {
              return totalPages;
            }
            return prevState + 1;
          });
        }}
      >
        next page
      </ThemeButton>
    </div>
  );
};

export default Pagination;
