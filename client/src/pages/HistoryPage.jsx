import { useEffect, useState } from "react";
import SubBanner from "../comps/SubBanner";
import OrderRow from "../comps/OrderRow";

function HistoryPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function getOrders() {
      try {
        const res = await fetch("http://localhost:5000/order", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setOrders(data.data.orders);
      } catch (error) {
        console.log(error.message);
      }
    }
    getOrders();
  }, []);
  return (
    <div>
      <SubBanner name="history" />
      <div className="max-w-[900px] mx-auto my-12">
        <h2 className="capitalize font-bold text-[24px]">
          your orders({orders.length})
        </h2>
        {orders.length > 0 && (
          <table className="w-full">
            <thead>
              <tr className="border border-white text-white bg-green-500">
                <th className="border border-white px-2 py-2">ID ORDER</th>
                <th className="border border-white px-1 py-2">ID USER</th>
                <th className="border border-white px-1 py-2">NAME</th>
                <th className="border border-white px-1 py-2">PHONE</th>
                <th className="border border-white px-1 py-2">ADDRESS</th>
                <th className="border border-white px-1 py-2">TOTAL</th>
                <th className="border border-white px-1 py-2">DELIVERY</th>
                <th className="border border-white px-1 py-2">STATUS</th>
                <th className="border border-white px-1 py-2">DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return <OrderRow order={order} index={index} key={order._id} />;
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
