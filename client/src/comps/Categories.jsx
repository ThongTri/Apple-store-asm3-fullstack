import product1 from "../imgs/product_1.png";
import product2 from "../imgs/product_2.png";
import product3 from "../imgs/product_3.png";
import product4 from "../imgs/product_4.png";
import product5 from "../imgs/product_5.png";
import Category from "./Category";
function Categories() {
  return (
    <div className="pt-10">
      <p className="text-gray-500 uppercase text-[16px] text-center italic">
        carefully created collections
      </p>
      <h2 className="text-[20px] uppercase text-center italic pb-4">
        browse our categories
      </h2>
      <div className="flex gap-4">
        <Category product={product1} title="IPhone" />
        <Category product={product2} title="Mac" />
      </div>
      <div className="flex gap-4 mt-4">
        <Category product={product3} title="IPad" />
        <Category product={product4} title="Watch" />
        <Category product={product5} title="AirPods" />
      </div>
    </div>
  );
}

export default Categories;
