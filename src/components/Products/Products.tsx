import { useProductsContext } from "../../hooks/useProductsContext";
import ProductListItem from "../ProductListItem/ProductListItem";
import GridRow from "../GridRow/GridRow";
import { BiError } from "react-icons/bi";
import Loader from "../Loader/Loader";

const Products = () => {
  const { isLoading, products, id, error } = useProductsContext();

  if (error) {
    console.error(error);
  }
  return (
    <div className="my-6 w-full md:max-w-3xl grid grid-cols-3 text-center dark:bg-neutral-600 bg-slate-300 rounded overflow-hidden">
      <GridRow>
        <div>id</div>
        <div>name</div>
        <div>year</div>
      </GridRow>
      {error ? <p>Something went wrong</p> : null}
      {!isLoading && !error && products ? (
        <>
          {Array.isArray(products) ? (
            products.map((product) => (
              <ProductListItem key={product.id} {...product} />
            ))
          ) : (
            <ProductListItem {...products} />
          )}
        </>
      ) : null}
      {isLoading ? <Loader /> : null}
      {!products && !isLoading ? (
        <div className="col-span-3 text-center p-1 flex items-center justify-center">
          <p className="text-red-500 mr-1">
            <BiError />
          </p>
          Cannot find product of id: {id}
        </div>
      ) : null}
    </div>
  );
};

export default Products;
