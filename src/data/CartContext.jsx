import React, { createContext, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "../firebase";
import { db } from "../firebase";

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
    // Toggle login button text. When logging out, clear user-specific data.
    if (loginbtn === "Login") {
      setloginbtn("Logout");
    } else if (loginbtn === "Logout") {
      // User is logging out: reset states that should be cleared on logout
      setloginbtn("Login");
      setisuserlogged("guest");
      setmyorders([]);
      setfinalcart([]);
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
  async function MyOrders() {
    const querySnapshot = await getDocs(collection(db, "users"));

    let temp = querySnapshot.docs;
    if (loginbtn === "Login") {
      setmyorders([]);
      return;
    }
    if (auth.currentUser.email === "admin@foodorderly.in") {
      setmyorders(temp);
      return;
    }

    let oderslist = temp.filter(
      (doc) =>
        doc._document.data.value.mapValue.fields.email.stringValue ===
        auth.currentUser.email
    );
    setmyorders(oderslist);

    // querySnapshot.docs.forEach((docs) => {
    //   auth.currentUser.email === doc.data().email
    //     ? console.log(typeof doc.data())
    //     : null;
    // });
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
        MyOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
