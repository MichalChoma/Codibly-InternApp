import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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

export const ProductsContext = createContext<{
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  id: number | string;
  setId: Dispatch<SetStateAction<string | number>>;
  isLoading: boolean;
  isError: boolean;
  products: ProductItemType[] | ProductItemType | [];
  totalPages: number;
  error: unknown;
} | null>(null);

export const ProductsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [id, setId] = useState<string | number>("");
  const [products, setProducts] = useState<
    ProductItemType[] | ProductItemType | []
  >([]);
  const perPage = 5;
  const fetchProducts = (page: number, perPage: number, id: number | string) =>
    fetch(
      `https://reqres.in/api/products?page=${page}&per_page=${perPage}&id=${id}`
    ).then((res) => res.json());

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["products", page, id, perPage],
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
