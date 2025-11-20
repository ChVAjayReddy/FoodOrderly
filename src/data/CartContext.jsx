import React, { createContext, useState, useContext } from "react";

// 1️⃣ Create Context
const CartContext = createContext();

// 2️⃣ Create Provider
export const CartProvider = ({ children }) => {
  const [isModalopen, setisModalopen] = useState(false);
  const [finalcart, setfinalcart] = useState([]);

  const [loginbtn, setloginbtn] = useState("Login");
  const [isuserlogged, setisuserlogged] = useState(false);

  function emptycart() {
    setfinalcart([]);
  }
  function hanldelogin() {
    if (loginbtn === "Login") {
      setloginbtn("Logout");
    }
    if (loginbtn === "Logout") {
      setloginbtn("Login");
    }
  }
  function modalopen() {
    if (loginbtn === "Logout") {
      setloginbtn("Login");
    } else {
      setisModalopen(!isModalopen);
    }
  }
  function modalclose() {
    setisModalopen(false);
  }

  function carting(id, name, imgurl, price, operation) {
    if (operation === "new") {
      let temp = {};
      temp.id = id;
      temp.mealname = name;
      temp.ingurl = imgurl;
      temp.price = price;
      temp.quantity = 1;
      temp.total = price;
      setfinalcart([...finalcart, temp]);
    } else if (operation == "add") {
      let temp = finalcart.map((cart) =>
        cart.id == id
          ? {
              ...cart,
              quantity: cart.quantity + 1,
              total: cart.price * (cart.quantity + 1),
            }
          : cart
      );
      setfinalcart(temp);
    } else {
      let temp = finalcart.map((cart) =>
        cart.id == id
          ? {
              ...cart,
              quantity: cart.quantity - 1,
              total: cart.price * (cart.quantity - 1),
            }
          : cart
      );
      let temp1 = temp.filter((cart) => cart.quantity >= 1);

      setfinalcart(temp1);
    }
  }

  return (
    <CartContext.Provider
      value={{
        emptycart,
        modalopen,
        isModalopen,
        carting,
        finalcart,
        setisModalopen,
        loginbtn,
        isuserlogged,
        hanldelogin,
        modalclose,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3️⃣ Custom Hook (for cleaner imports)
export const useCart = () => useContext(CartContext);
