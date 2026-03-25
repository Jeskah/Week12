import { getIngredients } from "@/utils/queries";
import PantryClient from "@/app/components/PantryClient";

export default async function PantryPage() {
  const ingredients = await getIngredients();

  const grouped = {};
  ingredients.forEach((ing) => {
    const type = ing.type || "Other";
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(ing);
  });

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-2">My pantry</h1>
      <p className="text-gray-500 mb-6">
        Select the ingredients you have, then find meals you can make.
      </p>
      <PantryClient grouped={grouped} />
    </div>
  );
}
