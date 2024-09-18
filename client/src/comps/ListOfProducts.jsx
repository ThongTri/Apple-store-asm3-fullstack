import { useEffect, useState } from "react";

import Product from "./Product";

const productsUrl = "http://localhost:5000/product/client";

function ListOfProducts() {
  const [products, setProducts] = useState([]);
  const firstEightProducts = products.slice(0, 8);
  useEffect(function () {
    async function fetchProducts() {
      try {
        const res = await fetch(productsUrl);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setProducts(data.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchProducts();
  }, []);
  return (
    <div className="pt-10">
      <p className="uppercase text-gray-500 italic">made the hard way</p>
      <h2 className="uppercase italic font-semibold text-[24px] pb-4">
        top trending products
      </h2>
      <div className="flex flex-wrap gap-y-6">
        {firstEightProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ListOfProducts;
