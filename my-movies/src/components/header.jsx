import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, Bell, User } from "lucide-react";

export function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

  // Smooth scroll handler
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Fetch movies dynamically as the user types
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
          )}`
        );
        setResults(res.data.results.slice(0, 6)); // limit results
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };

    const delay = setTimeout(fetchResults, 400); // debounce typing
    return () => clearTimeout(delay);
  }, [query, API_KEY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-black/75">
      <div className="flex h-16 items-center justify-between px-6 relative">
        {/* ====== LOGO + NAVIGATION ====== */}
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="font-mono text-lg font-bold text-primary-foreground">M</span>
            </div>
            <span className="font-sans text-xl font-semibold tracking-tight text-foreground">
              MovieHub
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <button
              onClick={() => handleScroll("home")}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Home
            </button>
            <button
              onClick={() => handleScroll("categories")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Categories
            </button>
            <button
              onClick={() => handleScroll("upcoming")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Upcoming
            </button>
          </nav>
        </div>

        {/* ====== SEARCH + ACTIONS ====== */}
        <div className="flex items-center gap-4" ref={searchRef}>
          {/* Search Input */}
          <div className="relative hidden lg:block w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search movies..."
              value={query}
              onFocus={() => setShowResults(true)}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 w-full bg-secondary/60 border border-border pl-9 pr-3 text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/* Search Results Dropdown */}
            {showResults && results.length > 0 && (
              <div className="absolute top-10 left-0 w-full bg-black/90 border border-border rounded-md overflow-hidden shadow-lg z-50">
                {results.map((movie) => (
                  <a
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    className="flex items-center gap-3 p-2 hover:bg-primary/20 transition"
                    onClick={() => setShowResults(false)}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
                          : "https://via.placeholder.com/50x75?text=No+Image"
                      }
                      alt={movie.title}
                      className="w-10 h-14 object-cover rounded-md"
                    />
                    <span className="text-sm text-white line-clamp-2">
                      {movie.title}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Search Icon */}
          <button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setShowResults((prev) => !prev)}
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-5 w-5" />
          </button>

          {/* User Profile */}
          <button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
