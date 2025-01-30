"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../config/supabaseClient";
import Link from "next/link";

export default function CreateRecipe() {
    const router = useRouter();
  const [title, setTitle] = useState("");
  const [recipe, setRecipe] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [ingredients, setIngredients] = useState<{ name: string; quantity: string }[]>([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");

  const addIngredient = () => {
    if (ingredientName && ingredientQuantity) {
      setIngredients([...ingredients, { name: ingredientName, quantity: ingredientQuantity }]);
      setIngredientName("");
      setIngredientQuantity("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await supabase
    .from("recipes")
    .insert([{title, recipe, rating, ingredients:{ingredients}}]);
    
    setIngredients([]);
    setTitle("");
    setRecipe("");
    setRating("");
    router.push("/");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-semibold">New Recipe!</h1>
        <Link href="/">Home</Link>
        <Link href="/create">Create Recipe</Link>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />

          <textarea
            placeholder="Recipe"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Rating (1-10)"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 rounded"
          />

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ingredient Name"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ingredientQuantity}
              onChange={(e) => setIngredientQuantity(e.target.value)}
              className="border p-2 rounded"
            />
            <button type="button" onClick={addIngredient} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>

          <ul className="list-disc list-inside text-sm text-gray-600">
            {ingredients.map((item, index) => (
              <li key={index}>
                {item.quantity} of {item.name}
              </li>
            ))}
          </ul>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Submit Recipe
          </button>
        </form>
      </main>
    </div>
  );
}