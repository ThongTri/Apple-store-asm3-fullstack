import { useEffect, useState } from "react";
import Layout from "../comps/Layout";
import { MdContactPage, MdOutlineShoppingCart } from "react-icons/md";
import { LuCircleDollarSign } from "react-icons/lu";
import { formatNumber } from "../utils";
import OrderRow from "../comps/OrderRow";

function HomePage() {
  const [header, setHeader] = useState([
    { name: "user", quantity: 100 },
    { name: "earning", quantity: 100 },
    { name: "order", quantity: 100 },
  ]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const res = await fetch("http://localhost:5000/order/admin", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setOrders(data.data.orders);
        setHeader([
          { name: "user", quantity: data.data.userQty },
          {
            name: "earning",
            quantity: formatNumber(data.data.earning.toString()),
          },
          { name: "order", quantity: data.data.orderQty },
        ]);
      } catch (err) {
        console.log(err.message);
      }
    }
    getOrders();
  }, []);

  return (
    <Layout pageName="Main Page">
      <div className="w-full p-2">
        <div className="flex gap-2 justify-around">
          {header.map((item) => (
            <div
              className="w-1/4 border border-gray-100 p-2 rounded-[5px] shadow-md"
              key={item.name}>
              <h2 className="text-gray-700 text-[16px] uppercase">
                {item.name}
              </h2>
              <h3 className="font-semibold text-[24px]">{item.quantity}</h3>
              <div className="flex justify-end  h-6">
                {item.name === "user" && (
                  <MdContactPage className="bg-red-300 text-[28px] rounded-[5px]" />
                )}
                {item.name === "earning" && (
                  <LuCircleDollarSign className="bg-green-300 text-[28px] rounded-[5px]" />
                )}
                {item.name === "order" && (
                  <MdOutlineShoppingCart className="bg-yellow-300 text-[28px] rounded-[5px]" />
                )}
              </div>
            </div>
          ))}
        </div>

        <table className="border border-gray-20 mt-8 min-w-full mx-auto">
          <thead className="py-2 px-1 capitalize text-[16px]">
            <tr className="border-b border-gray-300 text-gray-700 text-left capitalize py-8">
              <th className="border-l px-2">Order Id</th>
              <th className="border-l px-1 ">Name</th>
              <th className="border-l px-1 ">Phone</th>
              <th className="border-l px-1 ">Address</th>
              <th className="border-l px-1 ">Total</th>
              <th className="border-l px-1 ">delivery</th>
              <th className="border-l px-1 ">status</th>
              <th className="border-l px-1 ">detail</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return <OrderRow order={order} index={index} key={order._id} />;
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default HomePage;
