import { Tooltip } from "react-tooltip";
import { formatNumber } from "../utils";
import { useNavigate } from "react-router-dom";

function OrderRow({ order, index }) {
  const navigate = useNavigate();
  return (
    <tr className={`${index % 2 === 0 ? "bg-red-100" : ""} text-[12px]`}>
      <td className="py-2 px-1 border">
        <div
          className="w-[50px] truncate"
          data-tooltip-content={order._id}
          data-tooltip-id={order._id}>
          {order._id}
        </div>
        <Tooltip id={order._id} />
      </td>
      <td className="py-2 px-1 border">{order.user.fullName}</td>
      <td className="py-2 px-1 border">{order.user.phoneNumber}</td>
      <td className="py-2 px-1 border">{order.address}</td>
      <td className="py-2 px-1 border">
        {formatNumber(order.total.toString())}
      </td>
      <td className="py-2 px-1 border">Waiting</td>
      <td className="py-2 px-1 border">Waiting</td>
      <td className="py-2 px-1 border text-center">
        <button
          type="button"
          className="px-2 py-1 bg-green-600 text-white"
          onClick={() => navigate(`/order/${order._id}`)}>
          View
        </button>
      </td>
    </tr>
  );
}

export default OrderRow;
