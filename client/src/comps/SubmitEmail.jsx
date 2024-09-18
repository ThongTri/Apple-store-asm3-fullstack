function SubmitEmail() {
  return (
    <div className="pt-8">
      <div className="flex items-center justify-around py-10 px-8 bg-gray-100">
        <div>
          <h2 className="text-[24px] font-semibold italic uppercase">
            free shipping
          </h2>
          <p className="text-gray-500 italic">Free shipping worldwide</p>
        </div>
        <div>
          <h2 className="text-[24px] font-semibold italic uppercase">
            24 x 7 service
          </h2>
          <p className="text-gray-500 italic">Free shipping worldwide</p>
        </div>
        <div>
          <h2 className="text-[24px] font-semibold italic uppercase">
            Festical offer
          </h2>
          <p className="text-gray-500 italic">Free shipping worldwide</p>
        </div>
      </div>
      <form className="pt-8 flex items-center px-8 ">
        <div className="w-1/2">
          <h2 className="text-[24px] font-semibold italic uppercase">
            let's be friends!
          </h2>
          <p className="text-gray-500 italic">
            Nisi nisi tempor consequat laboris nisi.
          </p>
        </div>
        <div className="w-1/2 grow">
          <input
            type="email"
            placeholder="Enter your email address"
            className="border p-4 w-2/3"
          />
          <button type="submit" className="bg-black text-white p-4 w-1/3">
            Subcribe
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubmitEmail;
