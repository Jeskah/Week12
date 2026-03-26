"use client";

import { useState } from "react";

export default function EditBio({ initialBio, userId }) {
const [bio, setBio] = useState(initialBio || "");
const [editing, setEditing] = useState(false);
const [loading, setLoading] = useState(false);

const saveBio = async () => {
    setLoading(true);
    try {
    const res = await fetch("/api/update-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bio }),
    });
    if (!res.ok) throw new Error("Failed to update bio");
    setEditing(false);
    } catch (err) {
    console.error(err);
    alert("Could not update bio");
    }
    setLoading(false);
};

const deleteBio = async () => {
    if (!confirm("Are you sure you want to delete your bio?")) return;
    setLoading(true);
    try {
    const res = await fetch("/api/update-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bio: "" }),
    });
    if (!res.ok) throw new Error("Failed to delete bio");
    setBio("");
    setEditing(false);
    } catch (err) {
    console.error(err);
    alert("Could not delete bio");
    }
    setLoading(false);
};

return (
    <div className="border-amber-500 border p-5">
    {!editing ? (
        <div>
        <p>{bio || "No bio yet."}</p>
        <div className="flex gap-2 mt-2">
            <button
            onClick={() => setEditing(true)}
            className="bg-amber-400 px-3 py-1 rounded text-sm"
            >
            Edit
            </button>
            {bio && (
            <button
                onClick={deleteBio}
                className="bg-red-400 px-3 py-1 rounded text-sm"
            >
                Delete
            </button>
            )}
        </div>
        </div>
    ) : (
        <div className="flex flex-col gap-2">
        <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="border p-2 rounded text-sm"
        />
        <div className="flex gap-2">
            <button
            onClick={saveBio}
            disabled={loading}
            className="bg-green-400 px-3 py-1 rounded text-sm"
            >
            Save
            </button>
            <button
            onClick={() => setEditing(false)}
            disabled={loading}
            className="bg-gray-400 px-3 py-1 rounded text-sm"
            >
            Cancel
            </button>
        </div>
        </div>
    )}
    </div>
);
}