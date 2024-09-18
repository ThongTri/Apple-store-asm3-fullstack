import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { popupStore } from "./store";

import Root from "./pages/Root";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShopPage from "./pages/ShopPage";
import HomePage from "./pages/HomePage";

import "./store";
import ProtectRoute from "./pages/ProtectRoute";
import HistoryPage from "./pages/HistoryPage";
import HistoryDetailPage from "./pages/HistoryDetailPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/cart",
        element: (
          <ProtectRoute>
            <CartPage />
          </ProtectRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectRoute>
            <CheckoutPage />
          </ProtectRoute>
        ),
      },
      {
        path: "/history",
        element: (
          <ProtectRoute>
            <HistoryPage />
          </ProtectRoute>
        ),
      },
      {
        path: "/history/:orderId",
        element: (
          <ProtectRoute>
            <HistoryDetailPage />
          </ProtectRoute>
        ),
      },
      { path: "/detail/:idProduct", element: <DetailPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/", element: <HomePage /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={popupStore}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
