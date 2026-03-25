"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results);
      setIsOpen(true);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div ref={ref} className="relative w-full max-w-xs">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search meals or ingredients..."
        className="w-full px-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-amber-400"
      />

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {loading && <p className="p-3 text-sm text-gray-400">Searching...</p>}

          {!loading && results.length === 0 && (
            <p className="p-3 text-sm text-gray-400">No results found</p>
          )}

          {!loading &&
            results.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={item.type === "meal" ? `/meals/${item.id}` : `/pantry`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm text-gray-700">{item.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    item.type === "meal"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.type}
                </span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
