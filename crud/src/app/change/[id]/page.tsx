"use client"; 
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import supabase from "../../../config/supabaseClient";
import { useRouter } from "next/navigation";

export default function RecipePage() {
  const router = useRouter();
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);
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
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      const { data } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setRecipeData(data);
        setTitle(data.title);
        setRecipe(data.recipe);
        setRating(data.rating);
        setIngredients(data.ingredients.ingredients || []);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await supabase
      .from("recipes")
      .update({
        title,
        recipe,
        rating,
        ingredients: { ingredients },
      })
      .eq("id", id);

    router.push('/')
  };

  if (!recipeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-semibold">Edit Recipe of ID: {id}</h1>

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
            placeholder="Rating (1-5)"
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
            Update Recipe
          </button>
        </form>
      </main>
    </div>
  );
}