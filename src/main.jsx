import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router";
import "./index.css";
import App from "./App.jsx";
import Banner from "./components/Banner.jsx";
import Body from "./components/Body.jsx";
import Cart from "./components/Cart.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import RecipeList from "./components/RecipeList.jsx";
import CartPage from "./components/CartPage.jsx";
import React, { useState } from "react";
import { CartProvider } from "./data/CartContext.jsx";
import Checkout from "./components/Checkout.jsx";
import MyOrders from "./components/MyOders.jsx";

const Main = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Main;
const approot = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Banner />
            <RecipeList />
          </>
        ),
      },
      { path: "/cart", element: <CartPage /> },
      { path: "/order-success", element: <Checkout /> },
      { path: "/myorders", element: <MyOrders /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <RouterProvider router={approot} />
  </CartProvider>
);
