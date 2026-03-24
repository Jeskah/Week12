import Header from "./components/Header";
import { getMeals } from "@/utils/queries";
import MealList from "./components/MealList";

export default async function Home() {
  const meals = await getMeals();

  return (
    <div className="w-full">
      <Header />
      <MealList meals={meals} />
    </div>
  );
}