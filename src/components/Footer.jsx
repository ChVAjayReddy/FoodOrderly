import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-orange-500">FoodOrderly</h2>
        <p className="text-sm text-gray-400">
          Delicious meals delivered fast 🍕
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">
          Quick Links
        </h3>
        <ul className="space-y-1 text-gray-400 text-sm">
          <li>Home</li>
          <li>Menu</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Follow Us</h3>
        <div className="flex space-x-4 text-gray-400">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Contact</h3>
        <p className="text-sm text-gray-400">Email: support@foodorderly.com</p>
        <p className="text-sm text-gray-400">Phone: +91 98765 43210</p>
      </div>
      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        © 2025 FoodOrderly. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
