import React, { useEffect, useState } from "react";

const RecipeList = () => {
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
    setSelectedCategory(event);
    console.log(event);
  }

  return (
    <div>
      <div className="flex flex-row">
        {category.map((category, index) => (
          <div key={index} className="flex flex-col gap-2">
            <img
              className="rounded-4xl border-8 border-white shadow-lg m-4 h-32 w-32"
              src={category.strCategoryThumb}
            ></img>
            <p
              onClick={() => setcategoryname(category.strCategory)}
              className="text-center"
            >
              {category.strCategory}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {list.map((recipe, index) => (
          <div
            key={index}
            className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img src={recipe.strMealThumb} className="rounded"></img>
            <p className="bg-white rounded-4xl">+</p>
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

            <p className="text-[#FF6B00]">
              Rs.{Math.floor(Math.random() * (250 - 100 + 1)) + 100}/-
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
