import React, { useEffect, useState } from "react";
import { PRICES } from "../assets/Data";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { ShimmerCircularImage } from "react-shimmer-effects";
import { useContext } from "react";

import { useCart } from "../data/CartContext";
const RecipeList = () => {
  const { cartitems, cartindex, handleCart, handlelocalcart, addcart } =
    useCart();

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
      <div className="flex flex-row">
        {category.map((category, index) => (
          <div
            onClick={() => setcategoryname(category.strCategory)}
            key={index}
            className="flex flex-col gap-2 cursor-pointer items-center justify-center m-4"
          >
            <img
              className=" rounded-full object-cover m-4 cursor-pointer hover:scale-105 transition-transform duration-300"
              style={
                category.strCategory === selectedCategory
                  ? { border: "4px solid #FF6B00" }
                  : {}
              }
              src={category.strCategoryThumb}
            ></img>
            <p className="text-center">{category.strCategory}</p>
          </div>
        ))}
      </div>
      {list == null ? (
        <div className="h-40 align-middle flex justify-center items-center ">
          <p className="text-center text-2xl ">
            {" "}
            🍽️ No recipes found. Try searching for something else!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ">
          {list.map((recipe, index) => (
            <div
              key={index}
              className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
            >
              <img src={recipe.strMealThumb} className="rounded"></img>
              {cartitems.filter((cart) => cart.id === recipe.idMeal).length ===
              1 ? (
                <div className="flex flex-row absolute left-60 bottom-40 bg-white rounded-full w-20 h-8 items-center justify-center gap-2 shadow-md">
                  <button
                    className="rounded-full cursor-pointer w-6 h-6 bg-red-300 flex items-center justify-center"
                    onClick={() => {
                      handlelocalcart(recipe.idMeal, "sub");
                      cartitems.filter((cart) => cart.id === recipe.idMeal)[0]
                        .quantity === 1 && addcart(recipe.idMeal);
                    }}
                  >
                    <RiSubtractFill />
                  </button>

                  <p>
                    {
                      cartitems.filter((cart) => cart.id === recipe.idMeal)[0]
                        .quantity
                    }
                  </p>
                  <button
                    className="rounded-full cursor-pointer w-6 h-6 bg-green-300 flex items-center justify-center"
                    onClick={() => handlelocalcart(recipe.idMeal, "add")}
                  >
                    <IoMdAdd />
                  </button>
                </div>
              ) : (
                <button
                  className="bg-[#FF6B00] cursor-pointer absolute left-70 bottom-40 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#e65c00] transition-colors duration-300"
                  onClick={() => {
                    addcart(recipe.idMeal);
                    handleCart(recipe.idMeal, recipe.strMeal, PRICES[index]);
                  }}
                >
                  <IoMdAdd />
                </button>
              )}

              <div className="h-10 flex flex-row justify-between">
                <p className="text-xl font-semibold text-gray-800 truncate">
                  {recipe.strMeal}
                </p>
                {index % 2 === 0 ? <p>⭐⭐⭐⭐⭐</p> : <p>⭐⭐⭐⭐</p>}
              </div>
              <p>
                Ingradietns:{recipe.strIngredient1},{recipe.strIngredient2},
                {recipe.strIngredient3},{recipe.strIngredient4}
              </p>

              <div className="text-[#FF6B00] font-bold text-2xl mt-2 flex items-center">
                <FaRupeeSign />.{PRICES[index]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
