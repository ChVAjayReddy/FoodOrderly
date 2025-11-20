import { FaSearch, FaShoppingBag, FaBars } from "react-icons/fa";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../data/CartContext";
import AuthModal from "./AuthModal";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { modalopen, finalcart, isuserlogged, loginbtn, hanldelogin } =
    useCart();

  return (
    <header className="w-full p-3 shadow-md sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO + TITLE */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src="/src/assets/Screenshot 2025-11-05 194616.png"
              className="h-10 sm:h-12 md:h-16 object-contain"
              alt="FoodOrderly Logo"
            />

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FF6B00] whitespace-nowrap">
              FoodOrderly
            </h1>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          <Link className="text-lg hover:text-[#FF6B00] transition">Home</Link>
          <Link className="text-lg hover:text-[#FF6B00] transition">Menu</Link>
          <Link className="text-lg hover:text-[#FF6B00] transition">
            Contact
          </Link>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">
          {/* SEARCH ICON */}
          <button className="p-1">
            <FaSearch size={22} color="#FF6B00" />
          </button>

          {/* CART */}
          <Link to="/cart" className="relative">
            {finalcart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-xs w-5 h-5 rounded-full flex justify-center items-center">
                {finalcart.length}
              </span>
            )}
            <FaShoppingBag size={22} color="#FF6B00" />
          </Link>

          {/* LOGIN BUTTON */}
          <button
            onClick={() => {
              modalopen();
            }}
            className="px-3 py-1.5 border-2 border-[#FF6B00] text-[#FF6B00] rounded-md font-semibold hover:bg-[#FF6B00] hover:text-white transition text-sm sm:text-base"
          >
            {loginbtn}
          </button>
          <AuthModal />

          {/* MOBILE MENU ICON */}
          <button className="md:hidden" onClick={() => setOpenMenu(!openMenu)}>
            <FaBars size={24} color="#FF6B00" />
          </button>
        </div>
      </div>

      {/* MOBILE NAV MENU */}
      {openMenu && (
        <div className="md:hidden mt-3 flex flex-col gap-3 text-lg font-medium">
          <Link className="hover:text-[#FF6B00]">Home</Link>
          <Link className="hover:text-[#FF6B00]">Menu</Link>
          <Link className="hover:text-[#FF6B00]">Contact</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
