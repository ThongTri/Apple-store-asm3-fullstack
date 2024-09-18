import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import ShopListOfProduct from "../comps/ShopListOfProduct";

import { formatNumber } from "../ultility";
import { updateCart } from "../store";

function DetailPage() {
  const [products, setProducts] = useState([]);
  const { idProduct } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [showDesc, setShowDesc] = useState(true);
  const dispatch = useDispatch();
  async function handleAddToCart(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/user/cart/${idProduct}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: quantity }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch(updateCart(product, quantity));
      alert("This product is added to your cart");
      setQuantity(0);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(function () {
    async function fetchProducts() {
      try {
        const res = await fetch(`http://localhost:5000/product/client/`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setProducts(data.data);
      } catch (err) {
        alert(err.message);
      }
    }
    fetchProducts();
  }, []);

  const [product] = products.filter((item) => item._id === idProduct);
  if (!product) return <div>Item not found!</div>;
  const descriptions = product.long_desc.split("\n");
  const relatedProducts = products.filter(
    (item) => item.category === product.category && item._id !== idProduct
  );

  return (
    <div>
      <div className="flex gap-4">
        {/** detail product */}
        <div className="flex w-1/2">
          <div className="flex flex-col w-1/4">
            <img
              src={product.img1}
              alt="Product color"
              className="object-cover"
            />
            {product.img2 && (
              <img
                src={product.img2}
                alt="Product color"
                className="object-cover"
              />
            )}
            {product.img3 && (
              <img
                src={product.img3}
                alt="Product color"
                className="object-cover"
              />
            )}
            {product.img4 && (
              <img
                src={product.img4}
                alt="Product color"
                className="object-cover"
              />
            )}
          </div>
          <img
            src={product.img1}
            alt={product.name}
            className="w-3/4 object-cover"
          />
        </div>
        <div className="w-1/2">
          <h1 className="text-[32px] font-semibold italic">{product.name}</h1>
          <p className="italic text-gray-500 text-[20px] pt-4">
            {formatNumber(product.price)}
          </p>
          <p className="italic text-gray-500 pt-4">{product.short_desc}</p>
          <p className="pt-4">
            <b>
              <i>CATEGORY:</i>
            </b>{" "}
            <span className="italic text-gray-500 capitalize">
              {product.category}
            </span>
          </p>
          <p className="pt-4">
            <b>
              <i>Quantity:</i>
            </b>{" "}
            <span className="italic text-gray-500 capitalize">
              {product.count}
            </span>
          </p>
          <form action="" className="pt-4 flex" onSubmit={handleAddToCart}>
            <div className="flex items-center border">
              <button
                className="p-2"
                onClick={() =>
                  setQuantity((prev) =>
                    Number(prev) - 1 < 0 ? 0 : Number(prev) - 1
                  )
                }
                type="button">
                <SlArrowLeft />
              </button>
              <input
                type="text"
                placeholder="Quantity"
                className="p-2 outline-none text-center"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button
                className="p-2"
                onClick={() => setQuantity((prev) => Number(prev) + 1)}
                type="button">
                <SlArrowRight />
              </button>
            </div>

            <button
              className="bg-black text-white italic px-4 py-2"
              type="submit">
              Add to card
            </button>
          </form>
        </div>
      </div>
      <button
        className="px-4 py-2 bg-black text-white mt-10"
        onClick={() => setShowDesc((prev) => !prev)}>
        Description
      </button>
      {showDesc && (
        <div className="pb-10 pt-2 italic">
          {/** Description */}

          <h2 className="font-semibold text-[20px] uppercase py-2">
            product description
          </h2>
          {descriptions.map((description, index) => (
            <p key={description + index} className="text-gray-500">
              {description}
            </p>
          ))}
        </div>
      )}
      <div>
        {/**Related products */}
        <h2 className="font-semibold text-[20px] uppercase py-2 italic">
          related products
        </h2>
        <ShopListOfProduct categoryProduct={relatedProducts} addKey="detail" />
      </div>
    </div>
  );
}

export default DetailPage;
