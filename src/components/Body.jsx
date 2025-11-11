import Header from "./Header";
import Banner from "./Banner";
import RecipeList from "./RecipeList";
import Footer from "./Footer";
import Cart from "./Cart";
import React, { useState } from "react";

const Body = () => {
  const [cart, setcart] = useState(0);
  const [cartindex, setcartindex] = useState([]);
  const [cartitems, setcartitems] = useState([]);

  function addcart(ind) {
    if (cartindex.includes(ind)) {
      setcart((prevcart) => prevcart - 1);
      let temp = cartindex.filter((item) => item !== ind);
      setcartindex(temp);

      return;
    } else {
      setcart((prevcart) => prevcart + 1);
      setcartindex((prevcartindex) => [...prevcartindex, ind]);
    }

    console.log(cart);
  }
  function handleCart(idMeal, mealname, price) {
    let temp = {};
    temp.id = idMeal;
    temp.name = mealname;
    temp.price = price;
    temp.quantity = 1;
    temp.total = price * 1;
    setcartitems((prevcartitems) => [...prevcartitems, temp]);
  }
  function handlelocalcart(idMeal, operation) {
    if (operation === "add") {
      let temp = cartitems.map((cart) =>
        cart.id === idMeal
          ? {
              ...cart,
              quantity: cart.quantity + 1,
              total: cart.price * (cart.quantity + 1),
            }
          : cart
      );
      setcartitems(temp);
    } else {
      let temp = cartitems.map((cart) =>
        cart.id === idMeal
          ? {
              ...cart,
              quantity: cart.quantity - 1,
              total: cart.price * (cart.quantity - 1),
            }
          : cart
      );
      let carttemp = temp.filter((cart) => cart.quantity >= 1);
      setcartitems(carttemp);
    }
  }

  return (
    <>
      <Header cart={cart} />
      <RecipeList
        addcart={addcart}
        handleCart={handleCart}
        handlelocalcart={handlelocalcart}
        cartitems={cartitems}
      />
      <Cart cartitems={cartitems} />
      <Footer />{" "}
    </>
  );
};
export default Body;
