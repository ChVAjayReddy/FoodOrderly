import { FaSearch } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import React from "react";
const Header = (props) => {
  const { cart } = props;
  return (
    <div className="w-full flex flex-row justify-evenly align-center p-2 shadow-md sticky top-0 bg-white">
      <div className="flex flex-row align-center">
        {" "}
        <img
          src="/src/assets/Screenshot 2025-11-05 194616.png"
          className="h-20 self-center"
        ></img>
        <h1 className="text-4xl text-[#FF6B00]  font-bold text-foodorderly content-evenly self-center ml-2 ">
          FoodOrderly
        </h1>
      </div>

      <ul className="flex flex-row justify-around ">
        <li className="m-10">Home</li>
        <li className="m-10">Menu</li>
        <li className="m-10">Contact</li>
      </ul>
      <div className="flex flex-row justify-around  align-center  gap-10  ">
        <button className="cursor-pointer">
          {" "}
          <FaSearch size={30} color="#FF6B00" />
        </button>
        <button className="cursor-pointer">
          {" "}
          {cart >= 1 && (
            <p className="rounded-full bg-amber-600 text-white">{cart}</p>
          )}
          <FaShoppingBag size={30} color="#FF6B00" />
        </button>

        <button className="h-min self-center border-2 p-2 cursor-pointer border-[#FF6B00] rounded-md">
          Login
        </button>
      </div>
    </div>
  );
};
export default Header;
