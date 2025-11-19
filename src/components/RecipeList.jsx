import React, { useEffect, useState } from "react";
import { PRICES } from "../assets/Data";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { ShimmerCircularImage } from "react-shimmer-effects";

import { useCart } from "../data/CartContext";
const RecipeList = () => {
  const { finalcart, carting } = useCart();

  const [list, setlist] = useState([]);
  const [category, setcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchdata();
  }, [selectedCategory]);
  const fetchdata = async () => {
    const data = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
        `${selectedCategory}`
    );

    const json = await data.json();
    setlist(json.meals);
  };
  useEffect(() => {
    fetchdcategory();
  }, []);
  const fetchdcategory = async () => {
    const datac = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    const json = await datac.json();

    setcategory(json.categories);
  };
  function setcategoryname(event) {
    event === selectedCategory
      ? setSelectedCategory("")
      : setSelectedCategory(event);
    console.log(event);
  }

  return (
    <div>
      <div className="w-full overflow-x-auto whitespace-nowrap px-3 sm:px-4 py-4 scrollbar-hide">
        <div className="flex gap-4 sm:gap-6">
          {category.map((cat, index) => (
            <div
              key={index}
              onClick={() => setcategoryname(cat.strCategory)}
              className={`
          flex flex-col items-center min-w-[70px] sm:min-w-[90px] cursor-pointer 
          transition duration-200
          ${cat.strCategory === selectedCategory ? "scale-105" : ""}
        `}
            >
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                className={`
            rounded-full object-cover 
            w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 
            border-4 transition
            ${
              cat.strCategory === selectedCategory
                ? "border-[#FF6B00]"
                : "border-transparent"
            }
          `}
              />

              <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-gray-700 text-center">
                {cat.strCategory}
              </p>
            </div>
          ))}
        </div>
      </div>

      {list == null ? (
        <div className="h-40 align-middle flex justify-center items-center ">
          <p className="text-center text-2xl ">
            {" "}
            🍽️ No recipes found. Try searching for something else!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {list.map((recipe, index) => (
            <div
              key={index}
              className="relative flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Recipe Image */}
              <img
                src={recipe.strMealThumb}
                className="rounded-t-xl h-36 w-full object-cover"
                alt=""
              />

              {/* Cart Buttons */}
              {finalcart.filter((c) => c.id === recipe.idMeal).length === 1 ? (
                <div className="absolute top-3 right-3 bg-white flex items-center gap-2 py-1 px-2 rounded-full shadow-md">
                  <button
                    onClick={() => {
                      carting(
                        recipe.idMeal,
                        recipe.strMeal,
                        recipe.strMealThumb,
                        PRICES[index],
                        "sub"
                      );
                    }}
                    className="w-6 h-6 bg-red-300 rounded-full flex items-center justify-center"
                  >
                    <RiSubtractFill />
                  </button>

                  <p className="font-semibold">
                    {
                      finalcart.filter((c) => c.id === recipe.idMeal)[0]
                        .quantity
                    }
                  </p>

                  <button
                    onClick={() =>
                      carting(
                        recipe.idMeal,
                        recipe.strMeal,
                        recipe.strMealThumb,
                        PRICES[index],
                        "add"
                      )
                    }
                    className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center"
                  >
                    <IoMdAdd />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    carting(
                      recipe.idMeal,
                      recipe.strMeal,
                      recipe.strMealThumb,
                      PRICES[index],
                      "new"
                    )
                  }
                  className="absolute top-3 right-3 w-8 h-8 bg-[#FF6B00] text-white rounded-full flex items-center justify-center hover:bg-[#e65c00] transition"
                >
                  <IoMdAdd />
                </button>
              )}

              {/* Content Section */}
              <div className="p-3">
                <div className="flex justify-between">
                  <p className="text-lg font-semibold truncate">
                    {recipe.strMeal}
                  </p>
                  <p className="hidden md:block lg:block">
                    {index % 2 === 0 ? "⭐⭐⭐⭐⭐" : "⭐⭐⭐⭐"}
                  </p>
                </div>

                <p className="text-gray-600 text-sm mt-1">
                  Ingredients: {recipe.strIngredient1}, {recipe.strIngredient2},{" "}
                  {recipe.strIngredient3}, {recipe.strIngredient4}
                </p>

                <div className="text-[#FF6B00] font-bold text-xl mt-3 flex items-center">
                  <FaRupeeSign />
                  {PRICES[index]}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
