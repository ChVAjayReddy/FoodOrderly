import React from "react";

const Banner = () => {
  return (
    <div
      className="
      w-full 
      h-48 sm:h-56 md:h-64 lg:h-72 
      bg-gradient-to-r from-[#FF6B00] to-[#FFA500] 
      flex flex-col justify-center items-center 
      rounded-lg my-6 sm:my-8 px-4 text-center
    "
    >
      <h1
        className="
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
        text-white font-bold mb-2 sm:mb-4 leading-snug
      "
      >
        Welcome to FoodOrderly!
      </h1>

      <p
        className="
        text-sm sm:text-base md:text-lg lg:text-xl 
        text-white max-w-xl
      "
      >
        Discover delicious recipes and order your favorite meals with ease.
      </p>
    </div>
  );
};

export default Banner;
