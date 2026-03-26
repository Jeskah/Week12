import { getMeals } from "@/utils/queries";
import MealList from "./components/MealList";
// import { currentUser } from '@clerk/nextjs/server'

// const user = await currentUser()
// const clerkId = user.id

export default async function Home() {
  const meals = await getMeals();

  return <MealList meals={meals} />;
}