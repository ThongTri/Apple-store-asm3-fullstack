import Layout from "../comps/Layout";
import OrderRow from "../comps/OrderRow";
import { useEffect, useState } from "react";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getOrders() {
      try {
        const res = await fetch(
          `http://localhost:5000/order/admin?page=${page}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setOrders(data.data.orders);
        setMaxPage(data.data.totalPage);
      } catch (err) {
        console.log(err.message);
      }
    }
    getOrders();
  }, [page]);

  function handleLeftPagination() {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  }
  function handleRightPagination() {
    if (page === maxPage) return;
    setPage((prev) => prev + 1);
  }

  return (
    <Layout pageName="Order Page">
      <div className="w-full p-2">
        <div className="flex capitalize justify-between items-center mt-4 px-4">
          <h2>Orders</h2>
        </div>
        <table className="border border-gray-20 mt-8 min-w-full mx-auto">
          <thead className="py-2 px-1 capitalize text-[16px]">
            <tr className="border-b border-gray-300 text-gray-700 text-left capitalize py-8">
              <th className="border-l px-2">ID</th>
              <th className="border-l px-1 ">name</th>
              <th className="border-l px-1 ">phone</th>
              <th className="border-l px-1 ">address</th>
              <th className="border-l px-1 ">total</th>
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
        {/* {Pagination} */}
        <div className="flex justify-end gap-2 items-center mt-3">
          <button
            type="button"
            className="border border-gray-400 px-2 py-1"
            onClick={handleLeftPagination}>
            {"<"}
          </button>
          <p>{page}</p>
          <button
            type="button"
            className="border border-gray-400 px-2 py-1"
            onClick={handleRightPagination}>
            {">"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default OrderPage;
