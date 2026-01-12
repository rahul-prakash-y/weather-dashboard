import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationClick }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full py-3 pl-12 pr-12 text-slate-800 dark:text-white bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-full placeholder-slate-500 dark:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
        />
        <Search className="absolute left-4 w-5 h-5 text-slate-500 dark:text-white/70" />

        <button
          type="button"
          onClick={onLocationClick}
          className="absolute right-2 p-2 text-slate-500 dark:text-white/70 hover:text-blue-600 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/10 rounded-full transition-colors"
          title="Use current location"
        >
          <MapPin className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
