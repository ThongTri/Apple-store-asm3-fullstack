import { useNavigate } from "react-router-dom";
import { formatNumber } from "../utils";

function ProductRow({ product, index }) {
  const navigate = useNavigate();

  async function handleDeleteProduct() {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(
        `http://localhost:5000/product/admin/${product._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Cant delete");
      alert("product deleted!");
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <tr
      className={`${
        index % 2 === 0 ? "bg-red-100" : ""
      } text-[12px] capitalize`}>
      <td className="py-2 px-1 border">
        <div>{product._id}</div>
      </td>
      <td className="py-2 px-1 border">{product.name}</td>
      <td className="py-2 px-1 border">
        {formatNumber(product.price.toString())}
      </td>
      <td className="py-2 px-1 border uppercase flex items-center justify-center">
        <img src={product.img1} alt="" className="w-[50px] object-cover" />
      </td>
      <td className="py-2 px-1 border text-center">{product.category}</td>
      <td className="py-2 px-1 border text-center">{product.count}</td>
      <td className=" py-2 px-1 text-center m-auto">
        <button
          type="button"
          onClick={() => {
            navigate(`/product/${product._id}`);
          }}
          className="text-white bg-green-500 rounded-[5px] px-3 py-1 capitalize mr-2">
          update
        </button>
        <button
          type="button"
          onClick={handleDeleteProduct}
          className="text-white bg-red-500 rounded-[5px] p-1 capitalize">
          delete
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;
