import { ProductListItemType } from "../../context/ProductsContext";
import { useModalContext } from "../../hooks/useModalContext";
import GridRow from "../GridRow/GridRow";

const ProductListItem = ({ id, name, color, year }: ProductListItemType) => {
  const { handleSelectProductId, handleShowModal } = useModalContext();
  return (
    <GridRow
      style={{ backgroundColor: color, cursor: "pointer" }}
      onClick={() => {
        handleSelectProductId(id);
        handleShowModal();
      }}
    >
      <div aria-label="apiItemId" role={`apiItem-${id}`}>
        {id}
      </div>
      <div className="px-1">{name}</div>
      <div>{year}</div>
    </GridRow>
  );
};

export default ProductListItem;
