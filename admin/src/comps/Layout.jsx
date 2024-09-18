import SideBar from "./SideBar";

import ProtectRoute from "./ProtectRoute";

function Layout({ children, pageName }) {
  return (
    <ProtectRoute>
      <div className="flex max-w-[1200px] mx-auto mb-10">
        <SideBar />
        <div className="w-5/6">
          <div className="border-b text-[24px] p-2 text-center text-black">
            {pageName}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </ProtectRoute>
  );
}

export default Layout;
