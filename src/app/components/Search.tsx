"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import ImageComponent from "./ImageComponent";
type SearchResults = {
  users: { id: string; displayName: string; username: string, avatar: string }[];
  posts: {
    id: string;
    desc: string;
    userId: string;
    user: {
      username: string;
    };
  }[];
};
export default function SearchBar() {

  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim() || query.length < 2) {
      setResults(null);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      {/* Input wrapper */}
      <div className="flex items-center gap-3 bg-inputGray border border-borderGray rounded-full px-4 py-2 focus-within:border-iconBlue transition-colors duration-200">
        {/* Search Icon */}
        <svg
          className="w-4 h-4 text-textGray shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="bg-transparent w-full text-sm text-textGrayLight placeholder-textGray focus:outline-none"
        />

        {/* Loading spinner */}
        {loading && (
          <svg
            className="w-4 h-4 text-iconBlue animate-spin shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
      </div>

      {/* Dropdown */}
      {results && !loading && (
        <div className="absolute z-10 mt-2 w-full bg-black border border-borderGray rounded-2xl shadow-lg overflow-hidden">

          {/* Users Section */}
          {results.users.length > 0 && (
            <div>
              <p className="px-4 pt-3 pb-1 text-xs font-bold text-textGray uppercase tracking-wider">
                Users
              </p>
              {results.users.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-inputGray cursor-pointer transition-colors duration-150"
                  onClick={() => router.push(`/${u.username}`)}
                >
                  {/* Avatar placeholder */}
                  <div className="w-9 h-9 rounded-full bg-borderGray flex items-center justify-center shrink-0">
                    <ImageComponent src={u.avatar} width={100} height={100} alt="" tr={true} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-textGrayLight truncate">
                      {u.displayName}
                    </span>
                    <span className="text-xs text-textGray truncate">
                      {u.username}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Divider */}
          {results.users.length > 0 && results.posts.length > 0 && (
            <div className="border-t border-borderGray" />
          )}

          {/* Posts Section */}
          {results.posts.length > 0 && (
            <div>
              <p className="px-4 pt-3 pb-1 text-xs font-bold text-textGray uppercase tracking-wider">
                Posts
              </p>
              {results.posts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-inputGray cursor-pointer transition-colors duration-150"
                  onClick={() => router.push(`/${p.user.username}/status/${p.id}`)}
                >
                  {/* Post icon */}
                  <div className="w-9 h-9 rounded-full bg-borderGray flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-textGray"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20v-8H7v8M7 4v4h8" />
                    </svg>
                  </div>
                  <span className="text-sm text-textGrayLight truncate">
                    {p.desc}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {results.users.length === 0 && results.posts.length === 0 && (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-textGray">
                No results for{" "}
                <span className="text-textGrayLight font-semibold">
                  "{query}"
                </span>
              </p>
              <p className="text-xs text-textGray mt-1">
                Try searching for something else.
              </p>
            </div>
          )}

          {/* Footer hint */}
          <div className="border-t border-borderGray px-4 py-3">
            <p className="text-xs text-iconBlue hover:underline cursor-pointer">
              Search for "{query}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}