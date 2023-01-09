import ProductFilter from "../Form/ProductFilter";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";
import Products from "../Products/Products";

const Main = () => {
  return (
    <main className="flex flex-grow bg-slate-50 dark:bg-neutral-900 dark:text-white">
      <div className="container mx-auto">
        <div className="flex justify-center p-6 items-center flex-col">
          <ProductFilter />
          <Products />
          <Pagination />
          <Modal />
        </div>
      </div>
    </main>
  );
};

export default Main;
