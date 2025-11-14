import React, { createContext, useState, useContext } from "react";

// 1️⃣ Create Context
const CartContext = createContext();

// 2️⃣ Create Provider
export const CartProvider = ({ children }) => {
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
    <CartContext.Provider
      value={{
        cart,
        cartindex,
        cartitems,
        addcart,
        handleCart,
        handlelocalcart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3️⃣ Custom Hook (for cleaner imports)
export const useCart = () => useContext(CartContext);
