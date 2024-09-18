import { useNavigate } from "react-router-dom";
import img from "../imgs/banner1.jpg";
function Banner() {
  const navigate = useNavigate();
  function handleBrowseCollections() {
    navigate("/shop");
  }
  return (
    <div className="relative">
      <img src={img} alt="banner" />
      <div className="absolute top-1/2 transform -translate-y-1/2 left-10 uppercase w-[30%]">
        <p className="text-gray-400 text-[16px]">new inspiration 2020</p>
        <h2 className="text-[32px] py-4 leading-9">20% off on new season</h2>
        <button
          className="text-white bg-black py-2 px-4"
          onClick={handleBrowseCollections}>
          Browse collections
        </button>
      </div>
    </div>
  );
}

export default Banner;
