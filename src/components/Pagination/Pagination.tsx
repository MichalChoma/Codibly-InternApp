import { useSearchParams } from "react-router-dom";
import { useProductsContext } from "../../hooks/useProductsContext";
import ThemeButton from "../ThemeButton/ThemeButton";

const Pagination = () => {
  const { page, setPage, totalPages } = useProductsContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const handlePrevPage = () => {
    setPage((prevState) => {
      if (prevState === 1) {
        searchParams.set("page", prevState.toString());
        setSearchParams(searchParams, {
          replace: true,
        });
        return 1;
      }
      searchParams.set("page", `${prevState - 1}`);
      setSearchParams(searchParams, {
        replace: true,
      });
      return prevState - 1;
    });
  };

  const handleNextPage = () => {
    setPage((prevState) => {
      if (prevState === totalPages) {
        searchParams.set("page", prevState.toString());
        setSearchParams(searchParams, {
          replace: true,
        });
        return totalPages;
      }
      searchParams.set("page", `${prevState + 1}`);
      setSearchParams(searchParams, {
        replace: true,
      });
      return prevState + 1;
    });
  };
  return (
    <>
      {id ? null : (
        <div className="flex flex-row items-center p-2 justify-center">
          <ThemeButton onClick={handlePrevPage}>previous page</ThemeButton>
          <p className="px-4" aria-label="page-count">
            {page}
          </p>
          <ThemeButton onClick={handleNextPage}>next page</ThemeButton>
        </div>
      )}
    </>
  );
};

export default Pagination;
