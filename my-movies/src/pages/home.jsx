import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// If you have a Layout or Slidesforhomp component, import them. Otherwise remove these imports.
import Layout from "../result";
import Slidesforhomp from "../components/slidesforhomp";
import Moviefilter from "../components/moviefilter";

const MovieSlideShow = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  // Correct TMDB endpoint for popular movies
  const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;

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

  if (!movies || movies.length === 0) return <div>Loading...</div>;

 

  const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  return (
<Layout className="w-full min-h-screen ">
  <div id="home" className="px-6 py-6">
    <Slidesforhomp />
  </div>

  <div id="categories" className="px-0 py-0 md:px-6 py-6">
    <Moviefilter />
  </div>

  <div id="upcoming" className="px-0 py-0 md:px-6 py-6">
    <h1 className="text-3xl font font-bold px-6">Coming Soon</h1>

    <div className="flex gap-6 hide-scrollbar overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 scroll-smooth px-6 py-6">
      {movies.map((m) => (
        <div
          key={m.id}
            onClick={() => navigate(`/moviedetails/${m.id}`)}
          className="flex-shrink-0 rounded-lg shadow text-white transform transition-transform duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:brightness-110 w-78 md:w-95"
        >
          <div className="relative flex flex-row gap-3 items-center bg-secondary/20 border-border border-2 border p-4 rounded-tr-3xl rounded-bl-3xl justify-between overflow-hidden group">
            <h1 className="text-[100px] font-extrabold text-transparent stroke-text transform translate-y-10 group-hover:translate-y-0 transition-all duration-700 ease-in-out md:text-[150px]">
              {movies.indexOf(m) + 1}
            </h1>
            <img
              src={m.poster_path ? `${TMDB_IMAGE_BASE}${m.poster_path}` : ""}
              alt={m.title || m.name || "Movie Poster"}
              className="w-40 h-50 object-cover rounded-tr-3xl rounded-bl-3xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-125 md:w-50 h-60"
              loading="lazy"
               onClick={() => navigate(`/moviedetails/${m.id}`)}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</Layout>

  );
};

export default MovieSlideShow;
