import { getMatchingMeals } from "@/utils/queries";

export async function POST(request) {
  const { ingredientIds } = await request.json();

  if (!ingredientIds || ingredientIds.length === 0) {
    return Response.json({ meals: [] });
  }

  const meals = await getMatchingMeals(ingredientIds);
  return Response.json({ meals });
}
