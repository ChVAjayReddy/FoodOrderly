import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isModalopen, setisModalopen] = useState(false);
  const [finalcart, setfinalcart] = useState([]);
  const [myorders, setmyorders] = useState([]);

  const [loginbtn, setloginbtn] = useState("Login");
  const [isuserlogged, setisuserlogged] = useState("guest");

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
        setisuserlogged,
        setmyorders,
        myorders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
