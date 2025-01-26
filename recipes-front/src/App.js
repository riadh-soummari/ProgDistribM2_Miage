import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipesBlog from "./pages/RecipesBlog";

const recipesData = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    cuisine: "Italian",
    image: "https://img.spoonacular.com/recipes/654005-556x370.jpg",
  },
  {
    id: 2,
    title: "Classic Pancakes",
    cuisine: "American",
    image: "https://img.spoonacular.com/recipes/644690-556x370.jpg",
  },
  {
    id: 3,
    title: "Chicken Alfredo",
    cuisine: "Italian",
    image: "https://img.spoonacular.com/recipes/638088-556x370.jpg",
  },
  {
    id: 4,
    title: "Vegetarian Tacos",
    cuisine: "Mexican",
    image: "https://img.spoonacular.com/recipes/511748-556x370.jpg",
  },
];

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<RecipesBlog recipes={recipesData} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
