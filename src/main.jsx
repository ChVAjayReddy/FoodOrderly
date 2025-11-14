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

const Main = () => {
  // const [cart, setcart] = useState(0);
  // const [cartindex, setcartindex] = useState([]);
  // const [cartitems, setcartitems] = useState([]);

  // function addcart(ind) {
  //   if (cartindex.includes(ind)) {
  //     setcart((prevcart) => prevcart - 1);
  //     let temp = cartindex.filter((item) => item !== ind);
  //     setcartindex(temp);

  //     return;
  //   } else {
  //     setcart((prevcart) => prevcart + 1);
  //     setcartindex((prevcartindex) => [...prevcartindex, ind]);
  //   }

  //   console.log(cart);
  // }
  // function handleCart(idMeal, mealname, price) {
  //   let temp = {};
  //   temp.id = idMeal;
  //   temp.name = mealname;
  //   temp.price = price;
  //   temp.quantity = 1;
  //   temp.total = price * 1;
  //   setcartitems((prevcartitems) => [...prevcartitems, temp]);
  // }
  // function handlelocalcart(idMeal, operation) {
  //   if (operation === "add") {
  //     let temp = cartitems.map((cart) =>
  //       cart.id === idMeal
  //         ? {
  //             ...cart,
  //             quantity: cart.quantity + 1,
  //             total: cart.price * (cart.quantity + 1),
  //           }
  //         : cart
  //     );
  //     setcartitems(temp);
  //   } else {
  //     let temp = cartitems.map((cart) =>
  //       cart.id === idMeal
  //         ? {
  //             ...cart,
  //             quantity: cart.quantity - 1,
  //             total: cart.price * (cart.quantity - 1),
  //           }
  //         : cart
  //     );
  //     let carttemp = temp.filter((cart) => cart.quantity >= 1);
  //     setcartitems(carttemp);
  //   }
  // }
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <RouterProvider router={approot} />
  </CartProvider>
);
