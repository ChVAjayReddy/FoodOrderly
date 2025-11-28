// import React, { useEffect, useState } from "react";
// import { PRICES } from "../assets/Data";
// import { IoMdAdd } from "react-icons/io";
// import { RiSubtractFill } from "react-icons/ri";
// import { FaRupeeSign } from "react-icons/fa";
// import { ShimmerCircularImage } from "react-shimmer-effects";
// import { ShimmerThumbnail } from "react-shimmer-effects";

// import { useCart } from "../data/CartContext";
// const RecipeList = () => {
//   const { finalcart, carting } = useCart();

//   const [list, setlist] = useState([]);
//   const [category, setcategory] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [recipeloading, setrecipeloading] = useState(false);
//   const [categoryloading, setcategoryloading] = useState(false);

//   useEffect(() => {
//     fetchdata();
//   }, [selectedCategory]);
//   const fetchdata = async () => {
//     const data = await fetch(
//       "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
//         `${selectedCategory}`
//     );

//     const json = await data.json();
//     setrecipeloading(true);
//     setlist(json.meals);
//   };
//   useEffect(() => {
//     fetchdcategory();
//   }, []);
//   const fetchdcategory = async () => {
//     const datac = await fetch(
//       "https://www.themealdb.com/api/json/v1/1/categories.php"
//     );

//     const json = await datac.json();
//     setcategoryloading(true);
//     setcategory(json.categories);
//   };
//   function setcategoryname(event) {
//     event === selectedCategory
//       ? setSelectedCategory("")
//       : setSelectedCategory(event);
//     console.log(event);
//   }

//   return (
//     <div>
//       <div className="w-full overflow-x-auto whitespace-nowrap px-3 sm:px-4 py-4 scrollbar-hide">
//         <div className="flex gap-4 sm:gap-6">
//           {categoryloading ? (
//             category.map((cat, index) => (
//               <div
//                 key={index}
//                 onClick={() => setcategoryname(cat.strCategory)}
//                 className={`
//           flex flex-col items-center min-w-[70px] sm:min-w-[90px] cursor-pointer
//           transition duration-200
//           ${cat.strCategory === selectedCategory ? "scale-105" : ""}
//         `}
//               >
//                 <img
//                   src={cat.strCategoryThumb}
//                   alt={cat.strCategory}
//                   className={`
//             rounded-full object-cover
//             w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20
//             border-4 transition
//             ${
//               cat.strCategory === selectedCategory
//                 ? "border-[#FF6B00]"
//                 : "border-transparent"
//             }
//           `}
//                 />

//                 <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-gray-700 text-center">
//                   {cat.strCategory}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <div
//               className="flex flex-row items-center min-w-[70px] sm:min-w-[90px] cursor-pointer
//           transition duration-200"
//             >
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//             </div>
//           )}
//         </div>
//       </div>

//       {recipeloading ? (
//         list == null ? (
//           <div className="h-40 align-middle flex justify-center items-center ">
//             <p className="text-center text-2xl ">
//               {" "}
//               🍽️ No recipes found. Try searching for something else!
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
//             {list.map((recipe, index) => (
//               <div
//                 key={index}
//                 className="relative flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
//               >
//                 {/* Recipe Image */}
//                 <img
//                   src={recipe.strMealThumb}
//                   className="rounded-t-xl h-36 w-full object-cover"
//                   alt=""
//                 />

//                 {/* Cart Buttons */}
//                 {finalcart.filter((c) => c.id === recipe.idMeal).length ===
//                 1 ? (
//                   <div className="absolute top-3 right-3 bg-white flex items-center gap-2 py-1 px-2 rounded-full shadow-md">
//                     <button
//                       onClick={() => {
//                         carting(
//                           recipe.idMeal,
//                           recipe.strMeal,
//                           recipe.strMealThumb,
//                           PRICES[index],
//                           "sub"
//                         );
//                       }}
//                       className="w-6 h-6 bg-red-300 rounded-full flex items-center justify-center"
//                     >
//                       <RiSubtractFill />
//                     </button>

//                     <p className="font-semibold">
//                       {
//                         finalcart.filter((c) => c.id === recipe.idMeal)[0]
//                           .quantity
//                       }
//                     </p>

//                     <button
//                       onClick={() =>
//                         carting(
//                           recipe.idMeal,
//                           recipe.strMeal,
//                           recipe.strMealThumb,
//                           PRICES[index],
//                           "add"
//                         )
//                       }
//                       className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center"
//                     >
//                       <IoMdAdd />
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() =>
//                       carting(
//                         recipe.idMeal,
//                         recipe.strMeal,
//                         recipe.strMealThumb,
//                         PRICES[index],
//                         "new"
//                       )
//                     }
//                     className="absolute top-3 right-3 w-8 h-8 bg-[#FF6B00] text-white rounded-full flex items-center justify-center hover:bg-[#e65c00] transition"
//                   >
//                     <IoMdAdd />
//                   </button>
//                 )}

//                 <div className="p-3">
//                   <div className="flex justify-between">
//                     <p className="text-lg font-semibold truncate">
//                       {recipe.strMeal}
//                     </p>
//                     <p className="hidden md:block lg:block">
//                       {index % 2 === 0 ? "⭐⭐⭐⭐⭐" : "⭐⭐⭐⭐"}
//                     </p>
//                   </div>

//                   <p className="text-gray-600 text-sm mt-1">
//                     Ingredients: {recipe.strIngredient1},{" "}
//                     {recipe.strIngredient2}, {recipe.strIngredient3},{" "}
//                     {recipe.strIngredient4}
//                   </p>

//                   <div className="text-[#FF6B00] font-bold text-xl mt-3 flex items-center">
//                     <FaRupeeSign />
//                     {PRICES[index]}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
//           <ShimmerThumbnail height={250} rounded />
//           <ShimmerThumbnail height={250} rounded />
//           <ShimmerThumbnail height={250} rounded />
//           <ShimmerThumbnail height={250} rounded />
//           <ShimmerThumbnail height={250} rounded />
//           <ShimmerThumbnail height={250} rounded />
//           <ShimmerThumbnail height={250} rounded />
//           <ShimmerThumbnail height={250} rounded />
//           <ShimmerThumbnail height={250} rounded />
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeList;
// import React, { useEffect, useState } from "react";
// import { PRICES } from "../assets/Data";
// import { IoMdAdd } from "react-icons/io";
// import { RiSubtractFill } from "react-icons/ri";
// import { FaRupeeSign } from "react-icons/fa";
// import { ShimmerCircularImage, ShimmerThumbnail } from "react-shimmer-effects";

// import { useCart } from "../data/CartContext";

// const RecipeList = () => {
//   const { finalcart, carting } = useCart();

//   const [list, setlist] = useState([]);
//   const [category, setcategory] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [recipeloading, setrecipeloading] = useState(false);
//   const [categoryloading, setcategoryloading] = useState(false);

//   useEffect(() => {
//     fetchdata();
//   }, [selectedCategory]);

//   const fetchdata = async () => {
//     // Set loading state to false right before fetching data
//     setrecipeloading(false);
//     const data = await fetch(
//       "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
//         `${selectedCategory}`
//     );

//     const json = await data.json();
//     setlist(json.meals);
//     // Set loading state to true after data is fetched
//     setrecipeloading(true);
//   };

//   useEffect(() => {
//     fetchdcategory();
//   }, []);

//   const fetchdcategory = async () => {
//     // Set loading state to false right before fetching data
//     setcategoryloading(false);
//     const datac = await fetch(
//       "https://www.themealdb.com/api/json/v1/1/categories.php"
//     );

//     const json = await datac.json();
//     setcategory(json.categories);
//     // Set loading state to true after data is fetched
//     setcategoryloading(true);
//   };

//   function setcategoryname(event) {
//     event === selectedCategory
//       ? setSelectedCategory("")
//       : setSelectedCategory(event);
//     console.log(event);
//   }

//   // --- Glassmorphism UI Implementation ---

//   return (
//     // Set a background that the glass effect can blur (Important for Glassmorphism)
//     <div className="min-h-screen p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
//       {/* Category Bar - Glassmorphism Effect */}
//       <div className="sticky top-0 z-10 w-full overflow-x-auto whitespace-nowrap px-3 sm:px-4 py-4 mb-4 backdrop-blur-sm bg-white/20 rounded-xl shadow-lg border border-white/30 scrollbar-hide">
//         <div className="flex gap-4 sm:gap-6">
//           {categoryloading ? (
//             category.map((cat, index) => (
//               <div
//                 key={index}
//                 onClick={() => setcategoryname(cat.strCategory)}
//                 className={`
//                   flex flex-col items-center min-w-[70px] sm:min-w-[90px] cursor-pointer
//                   transition duration-200
//                   ${
//                     cat.strCategory === selectedCategory
//                       ? "scale-105"
//                       : "hover:scale-105"
//                   }
//                 `}
//               >
//                 <img
//                   src={cat.strCategoryThumb}
//                   alt={cat.strCategory}
//                   className={`
//                     rounded-full object-cover
//                     w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20
//                     border-4 transition
//                     ${
//                       cat.strCategory === selectedCategory
//                         ? "border-orange-400 shadow-xl"
//                         : "border-white/50" // Subtle border for unselected categories
//                     }
//                   `}
//                 />

//                 <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-white text-center drop-shadow-md">
//                   {cat.strCategory}
//                 </p>
//               </div>
//             ))
//           ) : (
//             // Shimmer for categories during loading
//             <div
//               className="flex flex-row items-center min-w-[70px] sm:min-w-[90px] cursor-pointer
//             transition duration-200 gap-4 sm:gap-6"
//             >
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//               <ShimmerCircularImage size={80} />
//             </div>
//           )}
//         </div>
//       </div>
//       {/* --- Category Bar End --- */}

//       {/* Recipe List */}
//       {recipeloading ? (
//         list == null ? (
//           <div className="h-40 align-middle flex justify-center items-center backdrop-blur-md bg-white/10 rounded-xl shadow-lg border border-white/30 p-8 m-4">
//             <p className="text-center text-2xl text-white drop-shadow-md">
//               {" "}
//               🍽️ No recipes found. Try searching for something else!
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
//             {list.map((recipe, index) => (
//               // Recipe Card - Glassmorphism Effect
//               <div
//                 key={index}
//                 className="relative flex flex-col bg-white/10 backdrop-blur-md rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30"
//               >
//                 {/* Recipe Image */}
//                 <img
//                   src={recipe.strMealThumb}
//                   className="rounded-t-xl h-36 w-full object-cover"
//                   alt={recipe.strMeal}
//                 />

//                 {/* Cart Buttons (Keeping original color scheme for functionality contrast) */}
//                 {finalcart.filter((c) => c.id === recipe.idMeal).length ===
//                 1 ? (
//                   <div className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm flex items-center gap-2 py-1 px-2 rounded-full shadow-lg border border-white/50">
//                     <button
//                       onClick={() => {
//                         carting(
//                           recipe.idMeal,
//                           recipe.strMeal,
//                           recipe.strMealThumb,
//                           PRICES[index],
//                           "sub"
//                         );
//                       }}
//                       className="w-6 h-6 bg-red-500/80 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
//                     >
//                       <RiSubtractFill />
//                     </button>

//                     <p className="font-semibold text-gray-800">
//                       {
//                         finalcart.filter((c) => c.id === recipe.idMeal)[0]
//                           .quantity
//                       }
//                     </p>

//                     <button
//                       onClick={() =>
//                         carting(
//                           recipe.idMeal,
//                           recipe.strMeal,
//                           recipe.strMealThumb,
//                           PRICES[index],
//                           "add"
//                         )
//                       }
//                       className="w-6 h-6 bg-green-500/80 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition"
//                     >
//                       <IoMdAdd />
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() =>
//                       carting(
//                         recipe.idMeal,
//                         recipe.strMeal,
//                         recipe.strMealThumb,
//                         PRICES[index],
//                         "new"
//                       )
//                     }
//                     // Adjusted add button appearance for glassmorphism
//                     className="absolute top-3 right-3 w-8 h-8 bg-orange-500/80 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition shadow-lg"
//                   >
//                     <IoMdAdd />
//                   </button>
//                 )}

//                 <div className="p-3">
//                   <div className="flex justify-between">
//                     <p className="text-lg font-semibold truncate text-white drop-shadow">
//                       {recipe.strMeal}
//                     </p>
//                     <p className="hidden md:block lg:block text-yellow-300 drop-shadow">
//                       {index % 2 === 0 ? "⭐⭐⭐⭐⭐" : "⭐⭐⭐⭐"}
//                     </p>
//                   </div>

//                   <p className="text-white/80 text-sm mt-1">
//                     Ingredients: {recipe.strIngredient1},{" "}
//                     {recipe.strIngredient2}, {recipe.strIngredient3},{" "}
//                     {recipe.strIngredient4}
//                   </p>

//                   <div className="text-orange-400 font-extrabold text-xl mt-3 flex items-center drop-shadow-lg">
//                     <FaRupeeSign />
//                     {PRICES[index]}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )
//       ) : (
//         // Shimmer for recipes during loading
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
//           <ShimmerThumbnail
//             height={250}
//             rounded
//             className="bg-white/10 border border-white/30 backdrop-blur-md"
//           />
//           <ShimmerThumbnail
//             height={250}
//             rounded
//             className="bg-white/10 border border-white/30 backdrop-blur-md"
//           />
//           <ShimmerThumbnail
//             height={250}
//             rounded
//             className="bg-white/10 border border-white/30 backdrop-blur-md"
//           />
//           <ShimmerThumbnail
//             height={250}
//             rounded
//             className="bg-white/10 border border-white/30 backdrop-blur-md"
//           />
//           <ShimmerThumbnail
//             height={250}
//             rounded
//             className="bg-white/10 border border-white/30 backdrop-blur-md"
//           />
//           <ShimmerThumbnail
//             height={250}
//             rounded
//             className="bg-white/10 border border-white/30 backdrop-blur-md"
//           />
//           <ShimmerThumbnail
//             height={250}
//             rounded
//             className="bg-white/10 border border-white/30 backdrop-blur-md"
//           />
//           <ShimmerThumbnail
//             height={250}
//             rounded
//             className="bg-white/10 border border-white/30 backdrop-blur-md"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeList;
import React, { useEffect, useState } from "react";
import { PRICES } from "../assets/Data";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { ShimmerCircularImage, ShimmerThumbnail } from "react-shimmer-effects";

import { useCart } from "../data/CartContext";

const RecipeList = () => {
  const { finalcart, carting } = useCart();

  const [list, setlist] = useState([]);
  const [category, setcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [recipeloading, setrecipeloading] = useState(false);
  const [categoryloading, setcategoryloading] = useState(false);

  useEffect(() => {
    fetchdata();
  }, [selectedCategory]);

  const fetchdata = async () => {
    setrecipeloading(false);
    const data = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
        `${selectedCategory}`
    );

    const json = await data.json();
    setlist(json.meals);

    setrecipeloading(true);
  };

  useEffect(() => {
    fetchdcategory();
  }, []);

  const fetchdcategory = async () => {
    setcategoryloading(false);
    const datac = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    const json = await datac.json();
    setcategory(json.categories);

    setcategoryloading(true);
  };

  function setcategoryname(event) {
    event === selectedCategory
      ? setSelectedCategory("")
      : setSelectedCategory(event);
    console.log(event);
  }

  return (
    <div className="min-h-screen p-4 bg-white">
      <div className=" top-0 z-10 w-full overflow-x-auto whitespace-nowrap px-3 sm:px-4 py-4 mb-4 bg-white rounded-xl shadow-lg border border-gray-100 scrollbar-hide">
        <div className="flex gap-4 sm:gap-6">
          {categoryloading ? (
            category.map((cat, index) => (
              <div
                key={index}
                onClick={() => setcategoryname(cat.strCategory)}
                className={`
                  flex flex-col items-center min-w-[70px] sm:min-w-[90px] cursor-pointer 
                  transition duration-200
                  ${
                    cat.strCategory === selectedCategory
                      ? "scale-105"
                      : "hover:scale-105"
                  }
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
                        ? "border-orange-500 shadow-md"
                        : "border-gray-200"
                    }
                  `}
                />

                <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-gray-800 text-center">
                  {cat.strCategory}
                </p>
              </div>
            ))
          ) : (
            <div
              className="flex flex-row items-center min-w-[70px] sm:min-w-[90px] cursor-pointer 
            transition duration-200 gap-4 sm:gap-6"
            >
              <ShimmerCircularImage size={80} />
              <ShimmerCircularImage size={80} />
              <ShimmerCircularImage size={80} />
              <ShimmerCircularImage size={80} />
              <ShimmerCircularImage size={80} />
              <ShimmerCircularImage size={80} />
            </div>
          )}
        </div>
      </div>

      {recipeloading ? (
        list == null ? (
          <div className="h-40 align-middle flex justify-center items-center bg-gray-50 rounded-xl shadow-md border border-gray-200 p-8 m-4">
            <p className="text-center text-2xl text-gray-800">
              {" "}
              🍽️ No recipes found. Try searching for something else!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
            {list.map((recipe, index) => (
              <div
                key={index}
                className="relative flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <img
                  src={recipe.strMealThumb}
                  className="rounded-t-xl h-36 w-full object-cover"
                  alt={recipe.strMeal}
                />

                {finalcart.filter((c) => c.id === recipe.idMeal).length ===
                1 ? (
                  <div className="absolute top-3 right-3 bg-white flex items-center gap-2 py-1 px-2 rounded-full shadow-md border border-gray-200">
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
                      className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                    >
                      <RiSubtractFill />
                    </button>

                    <p className="font-semibold text-gray-800">
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
                      className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition"
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
                    className="absolute top-3 right-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition shadow-md"
                  >
                    <IoMdAdd />
                  </button>
                )}

                <div className="p-3">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold truncate text-gray-800">
                      {recipe.strMeal}
                    </p>

                    <p className="hidden md:block lg:block text-yellow-500">
                      {index % 2 === 0 ? "⭐⭐⭐⭐⭐" : "⭐⭐⭐⭐"}
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm mt-1">
                    Ingredients: {recipe.strIngredient1},{" "}
                    {recipe.strIngredient2}, {recipe.strIngredient3},{" "}
                    {recipe.strIngredient4}
                  </p>

                  <div className="text-orange-500 font-bold text-xl mt-3 flex items-center">
                    <FaRupeeSign />
                    {PRICES[index]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          <ShimmerThumbnail
            height={250}
            rounded
            className="bg-white border border-gray-200"
          />
          <ShimmerThumbnail
            height={250}
            rounded
            className="bg-white border border-gray-200"
          />
          <ShimmerThumbnail
            height={250}
            rounded
            className="bg-white border border-gray-200"
          />
          <ShimmerThumbnail
            height={250}
            rounded
            className="bg-white border border-gray-200"
          />
          <ShimmerThumbnail
            height={250}
            rounded
            className="bg-white border border-gray-200"
          />
          <ShimmerThumbnail
            height={250}
            rounded
            className="bg-white border border-gray-200"
          />
          <ShimmerThumbnail
            height={250}
            rounded
            className="bg-white border border-gray-200"
          />
          <ShimmerThumbnail
            height={250}
            rounded
            className="bg-white border border-gray-200"
          />
        </div>
      )}
    </div>
  );
};

export default RecipeList;
