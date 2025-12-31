"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function SearchSuggestions({ query }: { query: string }) {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const run = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from("games")
                .select("id, title, genres, cover_image_url, downloads")
                .ilike("title", `%${query}%`)
                .order("downloads", { ascending: false })
                .limit(7);

            if (!error) setResults(data ?? []);
            setLoading(false);
        };

        const debounce = setTimeout(run, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    if (!query) return null;

    return (
        <div
            className="
        absolute top-full mt-2 w-full rounded-xl overflow-hidden 
        border border-slate-700 bg-slate-900/95 backdrop-blur
      "
        >
            {loading && (
                <div className="p-3 text-sm text-slate-400">Searching…</div>
            )}

            {!loading && results.length === 0 && (
                <div className="p-3 text-sm text-slate-400">No games found</div>
            )}

            {!loading &&
  results.map((g) => (
    <div
      key={g.id}
      className="
        flex items-center px-3 py-2
        hover:bg-slate-800 cursor-pointer transition
      "
    >
      {g.cover_image_url && (
        <img
          src={g.cover_image_url}
          className="w-11 h-11 object-cover rounded-xl flex-shrink-0"
          alt={g.title}
        />
      )}

      <div className="ml-6 flex flex-col leading-snug">
        <div className="font-semibold text-white text-sm">
          {g.title}
        </div>

        <div className="text-xs text-slate-400 mt-1">
          {Array.isArray(g.genres) ? g.genres.join(', ') : g.genres}
        </div>
      </div>
    </div>
  ))}


        </div>
    );
}
