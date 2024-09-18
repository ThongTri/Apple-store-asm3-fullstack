import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaCartFlatbed } from "react-icons/fa6";

import { formatNumber } from "../ultility";
import { hidePopup } from "../store";

function Popup() {
  const product = useSelector((store) => store.popupProduct);
  const navigate = useNavigate();
  function handleViewDetail() {
    navigate(`/detail/${product._id}`);
  }

  const dispatch = useDispatch();
  function handleHidePopup() {
    dispatch(hidePopup());
  }
  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-1000  animated-comp`}
      onClick={handleHidePopup}>
      {product ? (
        <div className="relative p-8 bg-white  w-[800px]">
          <button
            type="button"
            className="absolute top-4 right-4 hover:border p-2"
            onClick={handleHidePopup}>
            X
          </button>
          <div className="flex w-full gap-4">
            <img
              src={product.img1}
              alt={product.name}
              className="w-1/2 object-cover"
            />
            <div>
              <h2 className="font-semibold italic pt-4 pl-4 text-[24px]">
                {product.name}
              </h2>
              <p className="text-gray-500 italic pl-4 text-[20px]">
                {formatNumber(product.price)}
              </p>
              <p className="text-gray-400 italic pb-2 pl-4 text-[16px]">
                {product.short_desc}
              </p>
              <button
                className="flex items-center bg-black text-white p-3 gap-3 text-[16px] italic"
                onClick={handleViewDetail}>
                <FaCartFlatbed />
                View Detail
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Popup;
