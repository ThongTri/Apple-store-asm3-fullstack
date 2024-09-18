import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../store";
function Category({ product, title }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(getCategory(title.toLowerCase()));
    navigate("/shop");
  }
  return (
    <div className="relative" onClick={handleClick}>
      <img src={product} alt={title} />
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-50 transition-all"></div>
    </div>
  );
}

export default Category;
