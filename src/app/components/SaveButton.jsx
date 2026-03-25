'use client'

import { useState } from "react";
import { Bookmark } from "lucide-react";

export default function SaveButton({ mealId}) {
    const [saved, setSaved] = useState(false);

    async function handleSave() {
        const response = await fetch("/api/save-meal", {
            headers: {
            "Content-Type" : "application/json"
        },
            method: "POST",
            body: JSON.stringify({
            userId: 1,
            mealId 
        }),
    });

    const data = await response.json();

    if (data.success) {
    setSaved(true);
        }
    }

         return (
            <button onClick={handleSave}>
             <Bookmark
                size={22}
                className={`transition ${
                    saved
                    ? "fill-white text-white"
                    : "text-white/70 hover:text-white"
                }`}
            />   
            </button>
         );
    }  

    

