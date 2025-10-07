import React, { useEffect, useState } from "react";
import Layout from "../result";
import axios from "axios";
import { Star, Tv, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Slidesforhomp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

  // TMDB genre ID map
  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL);
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching movies data:", error);
      }
    };
    fetchMovies();
  }, [API_URL]);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) return <div>Loading...</div>;

  const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";
  const currentMovie = movies[currentIndex];

  // Get genre names for the current movie
  const genres =
    currentMovie?.genre_ids?.map((id) => genreMap[id]).filter(Boolean) || [];

  return (
    <div className="relative overflow-hidden rounded-tr-3xl rounded-bl-3xl h-120">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 flex h-120 shadow text-white bg-cover bg-center"
          style={{
            backgroundImage: `url(${TMDB_IMAGE_BASE}${
              currentMovie?.backdrop_path || ""
            })`,
            cursor: "pointer",
          }}
        >
          <div className="flex w-full h-full backdrop-blur-xs bg-gradient-to-r from-black/80 via-black/50 to-transparent rounded-tr-3xl rounded-bl-3xl">
            {/* LEFT SIDE CONTENT */}
            <div className="flex flex-col justify-center p-8 gap-3 w-full md:w-1/2 lg:w-1/3">
              <img
                src={`${TMDB_IMAGE_BASE}${currentMovie?.poster_path || ""}`}
                alt={currentMovie?.title || "Movie"}
                className="flex w-50 h-60 object-cover items-end-safe rounded-sm shadow-xl rounded-tr-3xl rounded-bl-3xl"
              />
              <h1 className="flex w-100 text-4xl font-bold">
                {currentMovie?.title}
              </h1>
            </div>

            {/* TOP-RIGHT RATING + GENRES */}
            <div className="absolute top-6 right-6 flex flex-col items-end text-right gap-2">
                {/* Genres */}
              <div className="flex flex-wrap justify-end gap-2 max-w-xs">
                {genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="bg-white/10 px-3 py-1 rounded-full text-sm border border-white/20"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              {/* Rating */}
              <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-gray-500">
                <Star className="w-4 h-4 text-yellow-400" fill="yellow" />
                <span className="text-lg font-semibold">
                  {Math.round(currentMovie?.vote_average * 10) / 10}
                </span>
              </div>

              
            </div>

            {/* BOTTOM-RIGHT BUTTONS */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute bottom-8 right-8 flex gap-4 z-10"
              >
                {/* Play Button */}
                <button
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl 
                             bg-white text-gray-900 font-semibold shadow-md 
                             hover:bg-gray-200 hover:scale-105 transition-transform duration-300 
                             border border-transparent"
                >
                  <Tv strokeWidth={1.25} className="w-5 h-5" />
                  Play
                </button>

                {/* More Info Button */}
                <button
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl 
                             bg-transparent text-white font-semibold border border-white 
                             hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  <Info strokeWidth={1.75} className="w-5 h-5" />
                  More Info
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Slidesforhomp;
