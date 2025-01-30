"use client"; 
import { useParams } from "next/navigation";

export default function RecipePage() {
  const params = useParams(); 
  if (!params.id) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>ID: {params.id}</h1>
    </div>
  );
}