"use client";

import { useState } from "react";
import Link from "next/link";

export default function PantryClient({ grouped }) {
  const [selected, setSelected] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  function toggleIngredient(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
    setSearched(false);
  }

  async function findMeals() {
    if (selected.length === 0) return;
    setLoading(true);
    const res = await fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredientIds: selected }),
    });
    const data = await res.json();
    setMeals(data.meals);
    setSearched(true);
    setLoading(false);
  }

  function clearAll() {
    setSelected([]);
    setMeals([]);
    setSearched(false);
  }

  return (
    <div>
      {selected.length > 0 && (
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">
              Selected ({selected.length})
            </p>
            <button
              onClick={clearAll}
              className="text-sm text-red-500 hover:underline"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selected.map((id) => {
              const ing = Object.values(grouped)
                .flat()
                .find((i) => i.id === id);
              return (
                <span
                  key={id}
                  onClick={() => toggleIngredient(id)}
                  className="bg-amber-500 text-white text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-amber-600"
                >
                  {ing?.name} ✕
                </span>
              );
            })}
          </div>
        </div>
      )}

      {Object.entries(grouped).map(([type, ingredients]) => (
        <div key={type} className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            {type}
          </h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing) => {
              const isSelected = selected.includes(ing.id);
              return (
                <button
                  key={ing.id}
                  onClick={() => toggleIngredient(ing.id)}
                  className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                    isSelected
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-white text-gray-700 border-gray-300 hover:border-amber-400"
                  }`}
                >
                  {ing.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={findMeals}
        disabled={selected.length === 0 || loading}
        className={`mt-4 px-6 py-3 rounded-lg font-medium text-white ${
          selected.length === 0
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-600"
        }`}
      >
        {loading
          ? "Searching..."
          : `Find meals (${selected.length} ingredient${
              selected.length !== 1 ? "s" : ""
            })`}
      </button>

      {searched && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            {meals.length > 0
              ? `${meals.length} meal${meals.length !== 1 ? "s" : ""} you can make`
              : "No meals found with those ingredients"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meals.map((meal) => (
              <Link
                key={meal.id}
                href={`/meals/${meal.id}`}
                className="block border rounded-lg p-4 hover:border-amber-400 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{meal.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {meal.description}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {meal.difficulty}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      Number(meal.matched_ingredients) ===
                      Number(meal.total_ingredients)
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {meal.matched_ingredients}/{meal.total_ingredients}{" "}
                    ingredients
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
