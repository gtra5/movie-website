import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Moviefilter() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(28); // 🎬 Default to Action
  const [movies, setMovies] = useState([]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
  const MOVIES_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

  // 🟢 Fetch genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(GENRE_URL);
        setGenres(response.data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, [GENRE_URL]);

  // 🎬 Fetch movies when a genre is selected
  useEffect(() => {
    if (!selectedGenre) return;
    const fetchMoviesByGenre = async () => {
      try {
        const response = await axios.get(`${MOVIES_URL}&with_genres=${selectedGenre}`);
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMoviesByGenre();
  }, [selectedGenre]);

  const renderStars = (rating = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating / 2) ? "text-yellow-400" : "text-gray-200"
        }`}
        fill={i < Math.floor(rating / 2) ? "currentColor" : "none"}
      />
    ));
  };

  const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="w-full px-6 py-6 text-white">
  {/* Header */}
  <h2 className="text-2xl font-bold mb-4">Categories</h2>

  {/* Genre Buttons */}
  <div
    className="
      flex gap-3 mb-6 
      overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 
      sm:flex-wrap sm:overflow-x-visible
      hide-scrollbar scroll-smooth
    "
  >
    {genres.map((genre) => (
      <button
        key={genre.id}
        onClick={() => setSelectedGenre(genre.id)}
        className={`flex-shrink-0 px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300
          ${
            selectedGenre === genre.id
              ? "bg-white text-gray-900 border-transparent scale-105 shadow-md"
              : "bg-transparent border border-white/40 text-white hover:bg-white/10 hover:scale-105"
          }`}
      >
        {genre.name}
      </button>
    ))}
  </div>

  {/* Movies Grid with Animation */}
  <AnimatePresence mode="wait">
    <motion.div
      key={selectedGenre}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
    >
      {movies.length === 0 && selectedGenre ? (
        <p className="text-gray-400 col-span-full">Loading movies...</p>
      ) : (
        movies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-lg overflow-hidden cursor-pointer transform hover:shadow-xl transition duration-300"
          >
            <img
              src={
                movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : ""
              }
              alt={movie.title || movie.name || "Movie Poster"}
              className="w-full h-60 object-cover rounded-tr-3xl rounded-bl-3xl"
              loading="lazy"
            />

            <div className="p-2 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-sm font-semibold">
                  {movie.title || movie.name}
                </h2>
                <span className="text-xs text-gray-400">
                  ({movie.release_date ? movie.release_date.slice(0, 4) : "N/A"})
                </span>
              </div>
              <div className="flex">{renderStars(movie.vote_average)}</div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <p className="text-xs text-gray-300 line-clamp-2">
                {movie.overview || "No description available."}
              </p>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  </AnimatePresence>
</div>

 
  );
}

export default Moviefilter;
