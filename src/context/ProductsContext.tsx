import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";

export interface ProductItemType {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export type ProductListItemType = Pick<
  ProductItemType,
  "id" | "name" | "color" | "year"
>;

export interface ProductContextType {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  id: number | string;
  setId: Dispatch<SetStateAction<string | number>>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  products: ProductItemType[] | ProductItemType | [];
  totalPages: number;
  error: unknown;
}

export const ProductsContext = createContext<ProductContextType | null>(null);

export const ProductsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchParams] = useSearchParams();
  const pageURL = searchParams.get("page");
  const idURL = searchParams.get("id");

  const [page, setPage] = useState<number>(pageURL ? +pageURL : 1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [id, setId] = useState<string | number>(idURL ? idURL : "");
  const [products, setProducts] = useState<
    ProductItemType[] | ProductItemType | []
  >([]);
  const perPage = 5;

  const fetchProducts = (
    page: number | string,
    perPage: number,
    id: number | string
  ) =>
    fetch(
      `https://reqres.in/api/products?page=${page}&per_page=${perPage}&id=${id}`
    ).then((res) => res.json());

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["products", page, id, totalPages],
    queryFn: () => fetchProducts(page, perPage, id),
  });

  useEffect(() => {
    if (data) {
      const { data: productsItems, total_pages } = data;
      setProducts(productsItems);
      if (total_pages === undefined) {
        return;
      }
      setTotalPages(total_pages);
    }
  }, [data]);

  return (
    <ProductsContext.Provider
      value={{
        page,
        error,
        setPage,
        isSuccess,
        totalPages,
        id,
        setId,
        isLoading,
        isError,
        products,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
