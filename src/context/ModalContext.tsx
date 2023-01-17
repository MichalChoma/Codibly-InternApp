import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ProductItemType } from "./ProductsContext";

interface ModalContextType {
  showModal: boolean;
  handleShowModal: () => void;
  handleSelectProductId: (id: number) => void;
  isLoading: boolean;
  isError: boolean;
  product: ProductItemType | null;
  error: unknown;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectProductId, setSelectProductId] = useState<null | number>(null);
  const [product, setProduct] = useState<ProductItemType | null>(null);

  const handleShowModal = () => setShowModal((prevState) => !prevState);
  const handleSelectProductId = (id: number) => setSelectProductId(id);

  const fetchProduct = (id: number | null) => {
    if (id !== null) {
      return fetch(`https://reqres.in/api/products/${id}`).then((res) =>
        res.json()
      );
    }
    return null;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["product", selectProductId],
    queryFn: () => fetchProduct(selectProductId),
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    const { data: productsItem } = data;
    setProduct(productsItem);
  }, [data]);

  return (
    <ModalContext.Provider
      value={{
        showModal,
        handleShowModal,
        handleSelectProductId,
        isLoading,
        isError,
        product: product || null,
        error,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
