import Banner from "../comps/Banner";
import Categories from "../comps/Categories";
import ListOfProducts from "../comps/ListOfProducts";
import SubmitEmail from "../comps/SubmitEmail";

function HomePage() {
  return (
    <div>
      <Banner />
      <Categories />
      <ListOfProducts />
      <SubmitEmail />
    </div>
  );
}

export default HomePage;
