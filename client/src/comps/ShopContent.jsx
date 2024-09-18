import ShopListOfProduct from "./ShopListOfProduct";

function ShopContent({ categoryProduct }) {
  return (
    <div className="w-3/4">
      <form className="py-4 flex items-center justify-start">
        <input
          type="text"
          placeholder="Enter your search"
          className="p-2 w-1/3 border"
        />
      </form>
      <ShopListOfProduct
        categoryProduct={categoryProduct}
        addKey="shopContent"
      />
    </div>
  );
}

export default ShopContent;
