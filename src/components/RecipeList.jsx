import React, { useEffect, useState } from "react";
import { PRICES } from "../assets/Data";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { ShimmerCircularImage } from "react-shimmer-effects";
import { useContext } from "react";

import { useCart } from "../data/CartContext";
const RecipeList = () => {
  const {
    cartitems,
    cartindex,
    handleCart,
    handlelocalcart,
    addcart,
    emptycart,
  } = useCart();

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
      {/* <div className="flex flex-row">
        {category.map((category, index) => (
          <div
            onClick={() => setcategoryname(category.strCategory)}
            key={index}
            className="w-full overflow-x-auto whitespace-nowrap px-4 py-4 scrollbar-hide cursor-pointer"
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
      </div> */}
      {/* <div className="w-full overflow-x-auto whitespace-nowrap px-4 py-4 scrollbar-hide">
        <div className="flex gap-6">
          {category.map((category, index) => (
            <div
              className="flex flex-col items-center min-w-[80px]"
              onClick={() => setcategoryname(category.strCategory)}
              key={index}
            >
              <img
                src={category.strCategoryThumb}
                className="w-16 h-16 rounded-full object-cover"
                style={
                  category.strCategory === selectedCategory
                    ? { border: "4px solid #FF6B00" }
                    : {}
                }
              />
              <p className="mt-2 text-sm font-semibold text-gray-700">
                {category.strCategory}
              </p>
            </div>
          ))}

      
        </div>
      </div> */}
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
        // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ">
        //   {list.map((recipe, index) => (
        //     <div
        //       key={index}
        //       className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
        //     >
        //       <img src={recipe.strMealThumb} className="rounded"></img>
        //       {cartitems.filter((cart) => cart.id === recipe.idMeal).length ===
        //       1 ? (
        //         <div className="flex flex-row absolute left-60 bottom-40 bg-white rounded-full w-22 h-8 items-center justify-center gap-2 shadow-md">
        //           <button
        //             className="rounded-full cursor-pointer w-6 h-6 bg-red-300 flex items-center justify-center"
        //             onClick={() => {
        //               handlelocalcart(recipe.idMeal, "sub");
        //               cartitems.filter((cart) => cart.id === recipe.idMeal)[0]
        //                 .quantity === 1 && addcart(recipe.idMeal);
        //             }}
        //           >
        //             <RiSubtractFill />
        //           </button>

        //           <p>
        //             {
        //               cartitems.filter((cart) => cart.id === recipe.idMeal)[0]
        //                 .quantity
        //             }
        //           </p>
        //           <button
        //             className="rounded-full cursor-pointer w-6 h-6 bg-green-300 flex items-center justify-center"
        //             onClick={() => handlelocalcart(recipe.idMeal, "add")}
        //           >
        //             <IoMdAdd />
        //           </button>
        //         </div>
        //       ) : (
        //         <button
        //           className="bg-[#FF6B00] cursor-pointer absolute left-70 bottom-40 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#e65c00] transition-colors duration-300"
        //           onClick={() => {
        //             addcart(recipe.idMeal);
        //             handleCart(recipe.idMeal, recipe.strMeal, PRICES[index]);
        //           }}
        //         >
        //           <IoMdAdd />
        //         </button>
        //       )}

        //       <div className="h-10 flex flex-row justify-between">
        //         <p className="text-xl font-semibold text-gray-800 truncate">
        //           {recipe.strMeal}
        //         </p>
        //         {index % 2 === 0 ? <p>⭐⭐⭐⭐⭐</p> : <p>⭐⭐⭐⭐</p>}
        //       </div>
        //       <p>
        //         Ingradietns:{recipe.strIngredient1},{recipe.strIngredient2},
        //         {recipe.strIngredient3},{recipe.strIngredient4}
        //       </p>

        //       <div className="text-[#FF6B00] font-bold text-2xl mt-2 flex items-center">
        //         <FaRupeeSign />
        //         {PRICES[index]}
        //       </div>
        //     </div>
        //   ))}
        // </div>
        // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 sm:p-6">
        //   {list.map((recipe, index) => (
        //     <div
        //       key={index}
        //       className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative"
        //     >
        //       {/* Image */}
        //       <div className="relative">
        //         <img
        //           src={recipe.strMealThumb}
        //           alt={recipe.strMeal}
        //           className="w-full h-48 sm:h-52 object-cover"
        //         />

        //         {/* Add / Quantity Box */}
        //         {cartitems.some((cart) => cart.id === recipe.idMeal) ? (
        //           <div className="absolute bottom-4 right-4 bg-white shadow-lg rounded-full flex items-center gap-3 px-3 py-1">
        //             {/* Subtract */}
        //             <button
        //               className="w-7 h-7 rounded-full bg-red-300 flex items-center justify-center text-white"
        //               onClick={() => {
        //                 handlelocalcart(recipe.idMeal, "sub");
        //                 const item = cartitems.find(
        //                   (c) => c.id === recipe.idMeal
        //                 );
        //                 if (item.quantity === 1) addcart(recipe.idMeal);
        //               }}
        //             >
        //               <RiSubtractFill size={16} />
        //             </button>

        //             {/* Quantity */}
        //             <p className="font-semibold">
        //               {
        //                 cartitems.find((cart) => cart.id === recipe.idMeal)
        //                   ?.quantity
        //               }
        //             </p>

        //             {/* Add */}
        //             <button
        //               className="w-7 h-7 rounded-full bg-green-400 flex items-center justify-center text-white"
        //               onClick={() => handlelocalcart(recipe.idMeal, "add")}
        //             >
        //               <IoMdAdd size={16} />
        //             </button>
        //           </div>
        //         ) : (
        //           <button
        //             className="absolute bottom-4 right-4 bg-gradient-to-r from-[#FF6B00] to-[#ffa034] w-10 h-10 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        //             onClick={() => {
        //               addcart(recipe.idMeal);
        //               handleCart(recipe.idMeal, recipe.strMeal, PRICES[index]);
        //             }}
        //           >
        //             <IoMdAdd size={22} />
        //           </button>
        //         )}
        //       </div>

        //       {/* Content Section */}
        //       <div className="p-4">
        //         {/* Title + Ratings */}
        //         <div className="flex justify-between items-center">
        //           <p className="text-lg font-bold text-gray-800 truncate">
        //             {recipe.strMeal}
        //           </p>
        //           <p className="text-sm">
        //             {index % 2 === 0 ? "⭐⭐⭐⭐⭐" : "⭐⭐⭐⭐"}
        //           </p>
        //         </div>

        //         {/* Ingredients */}
        //         <p className="text-sm text-gray-600 mt-2">
        //           Ingredients: {recipe.strIngredient1}, {recipe.strIngredient2},{" "}
        //           {recipe.strIngredient3}
        //         </p>

        //         {/* Price */}
        //         <div className="flex items-center text-[#FF6B00] font-bold text-2xl mt-3">
        //           <FaRupeeSign />
        //           {PRICES[index]}
        //         </div>
        //       </div>
        //     </div>
        //   ))}
        // </div>
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
              {cartitems.filter((c) => c.id === recipe.idMeal).length === 1 ? (
                <div className="absolute top-3 right-3 bg-white flex items-center gap-2 py-1 px-2 rounded-full shadow-md">
                  <button
                    onClick={() => {
                      handlelocalcart(recipe.idMeal, "sub");
                      cartitems.filter((c) => c.id === recipe.idMeal)[0]
                        .quantity === 1 && addcart(recipe.idMeal);
                    }}
                    className="w-6 h-6 bg-red-300 rounded-full flex items-center justify-center"
                  >
                    <RiSubtractFill />
                  </button>

                  <p className="font-semibold">
                    {
                      cartitems.filter((c) => c.id === recipe.idMeal)[0]
                        .quantity
                    }
                  </p>

                  <button
                    onClick={() => handlelocalcart(recipe.idMeal, "add")}
                    className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center"
                  >
                    <IoMdAdd />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    addcart(recipe.idMeal);
                    handleCart(
                      recipe.idMeal,
                      recipe.strMeal,
                      PRICES[index],
                      recipe.strMealThumb
                    );
                  }}
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
