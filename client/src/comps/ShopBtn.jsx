function ShopBtn({ name, setCategory }) {
  return (
    <button
      className="italic text-gray-500 text-[16px] py-2 pl-4 capitalize text-left"
      onClick={() => setCategory(name)}>
      {name}
    </button>
  );
}

export default ShopBtn;
