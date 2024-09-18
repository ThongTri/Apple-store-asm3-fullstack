import { useEffect, useRef } from "react";
import Layout from "../comps/Layout";

import { useNavigate, useParams } from "react-router-dom";

function EditProductPage() {
  const { productId } = useParams();
  const name = useRef();
  const category = useRef();
  const price = useRef();
  const short_desc = useRef();
  const long_desc = useRef();
  const count = useRef();
  const curCount = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(
          `http://localhost:5000/product/client/${productId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        name.current.value = data.data.product.name;
        category.current.value = data.data.product.category;
        price.current.value = data.data.product.price;
        short_desc.current.value = data.data.product.short_desc;
        long_desc.current.value = data.data.product.long_desc;
        curCount.current.value = data.data.product.count;
      } catch (error) {
        console.log(error.message);
      }
    }
    getProduct();
  }, [productId]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const product = {
        name: name.current.value.trim(),
        category: category.current.value.trim(),
        price: Number(price.current.value.trim()),
        short_desc: short_desc.current.value.trim(),
        long_desc: long_desc.current.value.trim(),
        count:
          Number(curCount.current.value.trim()) +
          Number(count.current.value.trim()),
      };
      const res = await fetch(
        `http://localhost:5000/product/admin/${productId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("success edit product");
      navigate("/product");
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <Layout pageName="Edit product">
      <div className="m-2 p-2 shadow-md w-full">
        <h2 className="text-[24px] text-gray-500 capitalize">edit product</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="m-2 p-2 w-full flex flex-wrap justify-between shadow-md">
        <div className="flex flex-col w-1/2 p-4 capitalize">
          <label>name</label>
          <input
            type="text"
            placeholder="Iphone 15 124gb"
            className="border-b p-2 focus:outline-purple-400"
            ref={name}
            required
          />
        </div>
        <div className="flex flex-col w-1/2 p-4 capitalize">
          <label>category</label>
          <select
            ref={category}
            className="border-b p-2 focus:outline-purple-400 capitalize"
            required>
            <option value="iphone">iphone</option>
            <option value="ipad">ipad</option>
            <option value="mac">mac</option>
            <option value="airpod">airpod</option>
            <option value="watch">watch</option>
            <option value="mouse">mouse</option>
            <option value="keyboard">keyboard</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="flex flex-col w-1/2 p-4 capitalize">
          <label>price</label>
          <input
            type="text"
            placeholder="10.000.000"
            className="border-b p-2 focus:outline-purple-400"
            ref={price}
            required
          />
        </div>
        <div className="flex flex-col w-1/4 p-4 capitalize">
          <label>Current count</label>
          <input
            type="text"
            placeholder="100"
            className="border-b p-2 focus:outline-purple-400"
            ref={curCount}
            disabled
          />
        </div>
        <div className="flex flex-col w-1/4 p-4 capitalize">
          <label>count</label>
          <input
            type="text"
            placeholder="100"
            className="border-b p-2 focus:outline-purple-400"
            ref={count}
            required
          />
        </div>
        <div className="flex flex-col w-full p-4 capitalize">
          <label>short description</label>
          <textarea
            type="text"
            placeholder="This is best phone"
            className="border-b p-2 focus:outline-purple-400"
            ref={short_desc}
            required
          />
        </div>
        <div className="flex flex-col w-full p-4 capitalize">
          <label>long description</label>
          <textarea
            type="text"
            placeholder="features of product"
            className="border-b p-2 focus:outline-purple-400"
            ref={long_desc}
            required
          />
        </div>
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="px-2 py-1 text-green-500 border border-green-500 hover:bg-green-500 hover:text-white">
            Update
          </button>
        </div>
      </form>
      <div className="p-4">
        <h2 className="text-[24px] text-red-700">Chú ý:</h2>
        <p>Phần count sẽ cộng vào số lượng sản phẩm đang có</p>
      </div>
    </Layout>
  );
}

export default EditProductPage;
