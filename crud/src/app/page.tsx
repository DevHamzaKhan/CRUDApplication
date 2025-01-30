import Link from "next/link";
import supabase from "../config/supabaseClient";
export default function Home() {
  console.log(supabase)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-semibold">Recipes</h1>
        <Link href="/">Home</Link>
        <Link href="/create">Create Recipe</Link>
      </main>
    </div>
  );
}