import React from "react";

const Banner = () => {
  return (
    // <div className="flex flex-row justify-center m-0">
    //   <img
    //     src="/src/assets/ChatGPT Image Nov 6, 2025, 03_33_15 PM.png"
    //     className="w-300 h-150 m-14 rounded-lg"
    //   />
    // </div>
    <div className="w-full h-60 bg-gradient-to-r from-[#FF6B00] to-[#FFA500] flex flex-col justify-center items-center rounded-lg my-8">
      <h1 className="text-4xl text-white font-bold mb-4">
        Welcome to FoodOrderly!{" "}
      </h1>
      <p className="text-lg text-white">
        Discover delicious recipes and order your favorite meals with ease.
      </p>
    </div>
  );
};

export default Banner;
