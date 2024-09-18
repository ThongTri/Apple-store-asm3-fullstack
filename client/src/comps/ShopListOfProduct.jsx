import ShopProduct from "./ShopProduct";

function ShopListOfProduct({ categoryProduct, addKey }) {
  return (
    <div className="flex flex-wrap gap-y-6 w-full">
      {categoryProduct.map((product) => (
        <ShopProduct key={product._id + addKey} product={product} />
      ))}
    </div>
  );
}

export default ShopListOfProduct;
