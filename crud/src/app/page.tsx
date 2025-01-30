"use client";
import Link from "next/link";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  console.log(supabase);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await supabase.from("recipes").select();

      if (data) {
        setRecipes(data);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-semibold">Recipes</h1>
        <Link href="/">Home</Link>
        <Link href="/create">Create Recipe</Link>
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