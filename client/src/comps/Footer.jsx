function Footer() {
  return (
    <div className="w-full bg-black">
      <div className="flex items-center justify-start gap-[200px] max-w-[1200px] m-auto p-4">
        <div className="flex flex-col">
          <h2 className="text-white py-4 text-[20px]">CUSTOMER SERVICES</h2>
          <div className="flex flex-col gap-1">
            <p className="text-gray-500 hover:text-blue-700 cursor-pointer">
              Help & Contact Us
            </p>
            <p className="text-gray-500 hover:text-blue-700 cursor-pointer">
              Returns and Refunds
            </p>
            <p className="text-gray-500 hover:text-blue-700 cursor-pointer">
              Online Stores
            </p>
            <p className="text-gray-500 hover:text-blue-700 cursor-pointer">
              Term and conditions
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-white py-4 text-[20px]">COMPANY</h2>
          <div className="flex flex-col gap-1">
            <p className="text-gray-500 hover:text-blue-700 cursor-pointer">
              What we do
            </p>
            <p className="text-gray-500 hover:text-blue-700 cursor-pointer">
              Available Services
            </p>
            <p className="text-gray-500 hover:text-blue-700 cursor-pointer">
              Lastest Posts
            </p>
            <p className="text-gray-500 hover:text-blue-700 cursor-pointer">
              FAQs
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-white py-4 text-[20px]">SOCIAL MEDIA</h2>
          <div className="flex flex-col gap-1">
            <p className="text-gray-500 hover:text-blue-700 cursor-pointer">
              Twitter
            </p>
            <p className="text-gray-500 hover:text-blue-700 cursor-pointer">
              Instagram
            </p>
            <p className="text-gray-500 hover:text-blue-700 cursor-pointer">
              Facebook
            </p>
            <p className="text-gray-500 hover:text-blue-700 cursor-pointer">
              Pinterest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
