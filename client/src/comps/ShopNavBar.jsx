import ShopBtn from "./ShopBtn";

function ShopNavBar({ setCategory }) {
  return (
    <div className="flex flex-col w-1/4">
      <h2 className="italic text-[28px] py-2 pl-4">Categories</h2>
      <h3 className="bg-black text-white italic text-[20px] py-2 pl-4 uppercase font-semibold ">
        Apple
      </h3>
      <ShopBtn name="all" setCategory={setCategory} />
      <h3 className="italic text-[20px] py-2 pl-4 uppercase font-semibold bg-[#e9fac8]">
        Iphone & Mac
      </h3>
      <ShopBtn name="iphone" setCategory={setCategory} />
      <ShopBtn name="ipad" setCategory={setCategory} />
      <ShopBtn name="mac" setCategory={setCategory} />
      <h3 className="italic text-[20px] py-2 pl-4 uppercase font-semibold bg-[#e9fac8]">
        wireless
      </h3>
      <ShopBtn name="airpod" setCategory={setCategory} />
      <ShopBtn name="watch" setCategory={setCategory} />
      <h3 className="italic text-[20px] py-2 pl-4 uppercase font-semibold bg-[#e9fac8]">
        other
      </h3>
      <ShopBtn name="mouse" setCategory={setCategory} />
      <ShopBtn name="keyboard" setCategory={setCategory} />
      <ShopBtn name="other" setCategory={setCategory} />
    </div>
  );
}

export default ShopNavBar;
