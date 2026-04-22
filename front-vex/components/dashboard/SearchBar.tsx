"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

//   useEffect(() => {
//     onSearch(query);
//   }, [query, onSearch]);

  return (
    <div className="w-full relative flex items-center justify-start text-black">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari pameran..."
        className="w-full p-2 pl-[50px] bg-white rounded-full text-sm flex-1 border-2 border-transparent shadow-xl/20 focus:outline-none focus:border-main-blue transition-all"
      />
      
      <FaSearch className="absolute left-4 opacity-80 text-[22px] pointer-events-none" />
    </div>
  );
}