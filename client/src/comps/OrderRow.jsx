import { useSelector } from "react-redux";
import { formatNumber } from "../ultility";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";

function OrderRow({ order, index }) {
  const user = useSelector((store) => store.curUser);
  const navigate = useNavigate();
  function handleView() {
    navigate(`/history/${order._id}`);
  }
  return (
    <tr className={`${index % 2 === 0 ? "bg-red-100" : ""} text-gray-600`}>
      <td className="py-2 px-1 border">
        <div
          data-tooltip-id={order._id}
          data-tooltip-content={order._id}
          className="w-10 truncate">
          {order._id}
        </div>
        <Tooltip id={order._id} />
      </td>
      <td className="py-2 px-1 border">
        <div
          data-tooltip-id={user._id + index}
          data-tooltip-content={user._id}
          className="w-10 truncate">
          {user._id}
        </div>
        <Tooltip id={user._id + index} />
      </td>
      <td className="py-2 px-1 border">{user.fullName}</td>
      <td className="py-2 px-1 border">{user.phoneNumber}</td>
      <td className="py-2 px-1 border">
        <div
          data-tooltip-id={order._id + index + 1}
          data-tooltip-content={order.address}
          className="w-20 truncate">
          {order.address}
        </div>
        <Tooltip id={order._id + index + 1} />
      </td>
      <td className="py-2 px-1 border">
        {formatNumber(order.total.toString())}
      </td>
      <td className="py-2 px-1 border italic">Waiting</td>
      <td className="py-2 px-1 border italic">Waiting</td>
      <td className="py-2 px-1 text-center">
        <button
          onClick={handleView}
          type="button"
          className="border border-black px-2 py-1 italic">
          View
        </button>
      </td>
    </tr>
  );
}

export default OrderRow;
