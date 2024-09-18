import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductOfOrderRow from "../comps/ProductOfOrderRow";
import { formatNumber } from "../ultility";

function HistoryDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const user = useSelector((store) => store.curUser);
  useEffect(() => {
    async function getOrder() {
      try {
        const res = await fetch(`http://localhost:5000/order/${orderId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setOrder(data.data.order);
      } catch (error) {
        console.log(error.message);
      }
    }
    getOrder();
  }, [orderId]);
  return (
    <>
      {order && (
        <div>
          <h2 className="text-[32px] uppercase font-semibold">
            information order
          </h2>
          <div className="text-gray-500 italic capitalize">
            <p>ID order: {order._id}</p>
            <p>Full name: {user.fullName}</p>
            <p>Phone: {user.phoneNumber}</p>
            <p>Address: {order.address}</p>
            <p className="font-semibold">
              Total: {formatNumber(order.total.toString())}
            </p>
          </div>
          <table className="w-full mt-8">
            <thead>
              <tr className="border border-white text-white bg-green-500 uppercase">
                <th className="border border-white px-2 py-2">ID Product</th>
                <th className="border border-white px-1 py-2">image</th>
                <th className="border border-white px-1 py-2">NAME</th>
                <th className="border border-white px-1 py-2">price</th>
                <th className="border border-white px-1 py-2">count</th>
              </tr>
            </thead>
            <tbody>
              {order.cart.map((product, index) => {
                return (
                  <ProductOfOrderRow
                    product={product.product}
                    quantity={product.qty}
                    index={index}
                    key={product._id + order._id}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default HistoryDetailPage;
