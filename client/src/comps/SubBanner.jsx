function SubBanner({ name }) {
  return (
    <div className="bg-[#e9fac8] flex justify-between items-center px-10 py-16">
      <h1 className="text-[28px] uppercase">{name}</h1>
      <p className="text-gray-500 text-[20px] uppercase">{name}</p>
    </div>
  );
}

export default SubBanner;
