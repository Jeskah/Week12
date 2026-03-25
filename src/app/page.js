import { getMeals } from "@/utils/queries";
import MealList from "./components/MealList";

export default async function Home() {
  const meals = await getMeals();

  return <MealList meals={meals} />;
}