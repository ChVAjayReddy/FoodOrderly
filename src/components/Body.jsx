import Header from "./Header";
import Banner from "./Banner";
import RecipeList from "./RecipeList";
import Footer from "./Footer";
import React, { useState } from "react";

const Body = () => {
  const [cart, setcart] = useState(0);

  function addcart() {
    setcart((prevcart) => prevcart + 1);
    console.log(cart);
  }

  return (
    <>
      <Header cart={cart} />
      <Banner />
      <RecipeList addcart={addcart} />
      <Footer />{" "}
    </>
  );
};
export default Body;
