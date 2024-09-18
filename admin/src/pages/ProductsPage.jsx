import Layout from "../comps/Layout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductRow from "../comps/ProductRow";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState([]);
  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch(
          `http://localhost:5000/product/client?search=${query}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setProducts(data.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getProducts();
  }, [query]);

  return (
    <Layout pageName="Product">
      <div className="w-full p-2">
        <div className="flex flex-col">
          <label>Search Product</label>
          <input
            type="text"
            className="w-1/4 border border-black p-2 focus:outline-green-700"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
        <div className="flex capitalize justify-between items-center mt-4 px-4">
          <h2>Product list</h2>
          <button
            type="button"
            onClick={() => {
              navigate("/add-product");
            }}
            className="border border-green-500 text-green-500 p-1 rounded-[5px] capitalize">
            add new
          </button>
        </div>
        <table className="border border-gray-20 mt-8 min-w-full mx-auto">
          <thead className="py-2 px-1 capitalize text-[16px]">
            <tr className="border-b border-gray-300 text-gray-700 text-left capitalize py-8">
              <th className="border-l px-2">ID</th>
              <th className="border-l px-1 ">name</th>
              <th className="border-l px-1 ">price</th>
              <th className="border-l px-1 ">image</th>
              <th className="border-l px-1 ">category</th>
              <th className="border-l px-1 ">count</th>
              <th className="border-l px-1 ">edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <ProductRow product={product} index={index} key={product._id} />
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default ProductPage;
