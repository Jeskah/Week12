'use client'

import { useState } from "react";
import { Bookmark } from "lucide-react";

export default function SaveButton({ mealId}) {
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSave() {
        try {
        setLoading(true);

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
    } finally {
        setLoading(false);
        }
    }

         return (
            <button onClick={handleSave}
            disabled={loading}
            style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
      }}
            >
             <Bookmark
                size={22}
                color={saved ? "white" : "rgba(255,255,255,0.7)"}
                fill={saved ? "currentColor" : "none"}
            />   
            </button>
         );
    }  

    

