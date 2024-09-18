import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddProduct from "./pages/AddProduct";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import EditProductPage from "./pages/EditProductPage";

import myContext from "./context";
import { useEffect, useState } from "react";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrderPage from "./pages/OrderPage";
import LiveChat from "./pages/LiveChat";
// import ChatPage from "./pages/ChatPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/add-product", element: <AddProduct /> },
  { path: "/product", element: <ProductsPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/user", element: <UserPage /> },
  { path: "/product/:productId", element: <EditProductPage /> },
  { path: "/order/:orderId", element: <OrderDetailPage /> },
  { path: "/order", element: <OrderPage /> },
  { path: "/chat", element: <LiveChat /> },
]);
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function autoLogin() {
      try {
        const res = await fetch("http://localhost:5000/user/auto-login", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        if (data.data.user) {
          setIsLogin(true);
          setUser(data.data.user);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    autoLogin();
  }, []);

  return (
    <myContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
      <RouterProvider router={router}></RouterProvider>
    </myContext.Provider>
  );
}

export default App;
