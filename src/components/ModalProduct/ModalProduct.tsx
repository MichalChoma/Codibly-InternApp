import { ProductItemType } from "../../context/ProductsContext";

interface ModalProductType extends ProductItemType {
  handleShowModal: () => void;
}

const ModalProduct = ({
  color,
  id,
  name,
  pantone_value,
  year,
  handleShowModal,
}: ModalProductType) => {
  return (
    <>
      <div
        className="w-full flex justify-end text-white"
        style={{ backgroundColor: color }}
      >
        <button className="py-2 px-4" onClick={handleShowModal}>
          x
        </button>
      </div>
      <div className="flex flex-col divide-y divide-slate-300 justify-start pl-4 pr-8 py-4">
        <span className="flex p-1">
          id: <p className="ml-1">{id}</p>
        </span>
        <span className="flex p-1">
          name: <p className="ml-1">{name}</p>
        </span>
        <span className="flex p-1 items-center">
          color:
          <div className="flex flex-row items-center ml-1">
            <div className="w-3 h-3" style={{ backgroundColor: color }}></div>
            {color}
          </div>
        </span>
        <span className="flex p-1">
          pantone value: <p className="ml-1">{pantone_value}</p>
        </span>
        <span className="flex p-1">
          year: <p className="ml-1">{year}</p>
        </span>
      </div>
    </>
  );
};

export default ModalProduct;
