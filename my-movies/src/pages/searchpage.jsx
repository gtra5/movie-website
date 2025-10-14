import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Layout from "../result";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const query = searchParams.get("query") || "";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
          )}`
        );
        setResults(res.data.results || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, API_KEY]);

  return (
    <Layout>
        <div className="min-h-screen  text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for:{" "}
        <span className="text-primary">“{query || "..." }”</span>
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400">Loading...</p>
        </div>
      ) : results.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {results.map((movie) => (
            <motion.div
              key={movie.id}
              onClick={() => navigate(`/moviedetails/${movie.id}`)}
              className="rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <img
                src={
                  movie.poster_path
                    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-72 object-cover"
                loading="lazy"
              />
              <div className="p-3 space-y-2">
                <h2 className="text-base font-semibold line-clamp-2">
                  {movie.title}
                </h2>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
                </div>
                <p className="text-xs text-gray-400">
                  {movie.release_date?.slice(0, 4) || "N/A"}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-400 mt-10">No results found for "{query}".</p>
      )}
    </div>
    </Layout>
  );
}
