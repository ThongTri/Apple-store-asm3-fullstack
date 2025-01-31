import { useRef } from "react";
import Layout from "../comps/Layout";

import { useNavigate } from "react-router-dom";

function AddProduct() {
  const name = useRef();
  const category = useRef();
  const price = useRef();
  const short_desc = useRef();
  const long_desc = useRef();
  const imgs = useRef();
  const count = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("name", name.current.value.trim());
      formData.append("category", category.current.value.trim());
      formData.append("price", Number(price.current.value.trim()));
      formData.append("short_desc", short_desc.current.value.trim());
      formData.append("long_desc", long_desc.current.value.trim());
      formData.append("count", Number(count.current.value.trim()));
      const imageFiles = imgs.current.files;
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append("img", imageFiles[i]);
      }
      const res = await fetch("http://localhost:5000/product/admin", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("success add product");
      navigate("/product");
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <Layout pageName="Add a product">
      <div className="m-2 p-2 shadow-md w-full">
        <h2 className="text-[24px] text-gray-500 capitalize">
          add new product
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="m-2 p-2 w-full flex flex-wrap justify-between shadow-md"
        encType="multipart/form-data">
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
        <div className="flex flex-col w-1/2 p-4 capitalize">
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

        <div className="flex flex-col w-1/2 p-4 capitalize">
          <label>Images</label>
          <input
            type="file"
            placeholder="My Hotel"
            className="border-b p-2 focus:outline-purple-400"
            ref={imgs}
            name="img"
            multiple
            required
          />
        </div>

        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="px-2 py-1 text-green-500 border border-green-500 hover:bg-green-500 hover:text-white">
            Add Product
          </button>
        </div>
      </form>
      <div className="p-4">
        <h2 className="text-[24px] text-red-700">Chú ý:</h2>
        <p>Link ảnh cách nhau bởi dấu xuống dòng</p>
      </div>
    </Layout>
  );
}

export default AddProduct;
