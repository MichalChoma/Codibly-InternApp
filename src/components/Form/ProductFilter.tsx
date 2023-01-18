import React from "react";
import { BsSearch } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { useProductsContext } from "../../hooks/useProductsContext";

const ProductFilter = () => {
  const { setId } = useProductsContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const idURL = searchParams.get("id");
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    if (e.target.value.length === 0) {
      searchParams.delete("id");
    } else {
      searchParams.set("id", e.target.value);
    }
    setSearchParams(searchParams, {
      replace: true,
    });
  };
  return (
    <div className="flex items-center w-full lg:justify-center">
      <div className="flex w-full lg:w-72 rounded-lg overflow-hidden shadow-md">
        <div className="p-2 bg-white dark:bg-neutral-600 flex items-center">
          <BsSearch />
        </div>
        <input
          type="number"
          min={1}
          defaultValue={idURL ? idURL : ""}
          className="pr-2 py-1 dark:bg-neutral-600 dark:text-white focus:outline-none w-full appearance-none rounded-tl-none rounded-bl-none"
          style={{
            WebkitAppearance: "none",
            WebkitBorderRadius: 0,
          }}
          placeholder="Find by id"
          onChange={handleIdChange}
        />
      </div>
    </div>
  );
};

export default ProductFilter;
