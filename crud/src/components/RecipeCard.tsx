import React from "react";
import Link from "next/link";
import supabase from "../config/supabaseClient";
export default function RecipeCard({ recipe }: { recipe: any }) {
  const handleDelete = async (id: string) => {
    await supabase
      .from("recipes")
      .delete()
      .eq("id", id);
    
      alert("Recipe deleted!");
  };

  return (
    <div className="border rounded-lg p-4 shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
      <p className="text-white-700 mb-4">Recipe: {recipe.recipe}</p>
      
      <p className="text-yellow-500 font-semibold">
        Rating: {recipe.rating ?? "No rating yet"}
      </p>

      <h3 className="text-lg font-semibold mb-2 mt-2">Ingredients:</h3>
      <ul className="list-disc list-inside">
        {recipe.ingredients?.ingredients?.map((item: any, index: number) => (
          <li key={index}>
            {item.quantity} of {item.name}
          </li>
        ))}
      </ul>
      <div className="flex gap-4 mt-4">
        <Link href={`/change/${recipe.id}`} className="text-blue-500">Change</Link>
        <button
          onClick={() => handleDelete(recipe.id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}