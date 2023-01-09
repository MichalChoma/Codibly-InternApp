import { ProductsContext } from "../context/ProductsContext";
import { useContext } from "react";

export const useProductsContext = () => {
  const productsContext = useContext(ProductsContext);

  if (!productsContext) {
    throw new Error(`You forgot ProductsContextProvider!`);
  }

  return productsContext;
};
