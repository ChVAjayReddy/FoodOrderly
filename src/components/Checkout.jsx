import React from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
        <div className="text-green-500 text-6xl mb-4">✔</div>

        <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>

        <p className="text-gray-600 mb-6">
          Thank you for ordering with{" "}
          <span className="font-semibold text-orange-500">FoodOrderly</span>.
          Your delicious food is on the way! 🚀🍽️
        </p>

        <Link
          to="/"
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
