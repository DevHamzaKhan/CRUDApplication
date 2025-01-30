"use client";
import Link from "next/link";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("rating"); 

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await supabase
        .from("recipes")
        .select()
        .order(sortCriteria, { ascending: sortCriteria !== "rating" }); 

      if (data) {
        setRecipes(data);
      }
    };
    fetchRecipes();
  }, [sortCriteria]); 

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-semibold">Recipes</h1>
        <Link href="/">Home</Link>
        <Link href="/create">Create Recipe</Link>

        {/* Sorting Controls */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setSortCriteria("rating")}
            className={`px-4 py-2 rounded ${sortCriteria === "rating" ? "bg-blue-500" : "bg-gray-300"}`}
          >
            Sort by Rating
          </button>
          <button
            onClick={() => setSortCriteria("created_at")}
            className={`px-4 py-2 rounded ${sortCriteria === "created_at" ? "bg-blue-500" : "bg-gray-300"}`}
          >
            Sort by Creator
          </button>
        </div>

        {recipes.length > 0 && (
          <div className="recipes w-full">
            <div className="recipes-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}