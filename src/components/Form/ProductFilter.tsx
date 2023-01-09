import React from "react";
import { BsSearch } from "react-icons/bs";
import { useProductsContext } from "../../hooks/useProductsContext";
// import { debounce } from "lodash";

const ProductFilter = () => {
  const { setId } = useProductsContext();
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  return (
    <form className="flex items-center w-full lg:justify-center">
      <div className="flex w-full lg:w-72 rounded-lg overflow-hidden shadow-md">
        <div className="p-2 bg-white dark:bg-neutral-600">
          <BsSearch />
        </div>
        <input
          type="number"
          min={1}
          className="pr-2 py-1 dark:bg-neutral-600 dark:text-white focus:outline-none w-full"
          placeholder="Find by id"
          onChange={handleIdChange}
        />
      </div>
    </form>
  );
};

export default ProductFilter;
