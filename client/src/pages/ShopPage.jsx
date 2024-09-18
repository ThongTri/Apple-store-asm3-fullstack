import { useEffect, useState } from "react";

import ShopNavBar from "../comps/ShopNavBar";
import SubBanner from "../comps/SubBanner";
import ShopContent from "../comps/ShopContent";
import { useSelector } from "react-redux";

function ShopPage() {
  const curCategory = useSelector((store) => store.category);
  const [category, setCategory] = useState(curCategory);
  const [categoryProduct, setCategoryProduct] = useState([]);
  useEffect(
    function () {
      async function fetchProducts() {
        const res = await fetch("http://localhost:5000/product/client");
        const data = await res.json();
        if (category === "all") setCategoryProduct(data.data);
        else
          setCategoryProduct(
            data.data.filter((product) => product.category === category)
          );
      }
      fetchProducts();
    },
    [category]
  );

  return (
    <div>
      <SubBanner name="shop" />
      <div className="flex gap-6">
        <ShopNavBar setCategory={setCategory} />
        <ShopContent categoryProduct={categoryProduct} />
      </div>
    </div>
  );
}

export default ShopPage;
