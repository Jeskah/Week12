import Image from "next/image";
import Navbar from "./components/Navbar";
import db from '@/utils/db/db'

export async function allMeals () {
  const result = await db.query(
    `SELECT * FROM meals`);
    return result.rows;
}
import { getMeals } from "@/utils/queries";

export default async function Home() {
  const meals = await getMeals();

  return (
    <div>
      {meals.map(meal => (
        <div key={meal.id}>{meal.name}</div>
      ))}
    </div>
  );
}
