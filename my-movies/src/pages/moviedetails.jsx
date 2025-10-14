import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "../result";
import { Star, Tv, Info } from "lucide-react";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_IMG = "https://image.tmdb.org/t/p/original";
  const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();

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
    const fetchMovieDetails = async () => {
      try {
        const [movieRes, videoRes, recRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`)
        ]);

        setMovie(movieRes.data);
        setRecommendations(recRes.data.results || []);

        const officialTrailer = videoRes.data.results.find(
          (v) =>
            v.type === "Trailer" &&
            v.site === "YouTube" &&
            (v.name.toLowerCase().includes("official") ||
              v.name.toLowerCase().includes("trailer"))
        );

        if (officialTrailer) {
          setTrailerKey(officialTrailer.key);
        } else {
          const fallback = videoRes.data.results.find((v) => v.site === "YouTube");
          if (fallback) setTrailerKey(fallback.key);
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id, API_KEY]);

  if (!movie)
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );

  const genreList =
    movie.genres?.map((g) => g.name) ||
    movie.genre_ids?.map((id) => genreMap[id]) ||
    [];

  return (
    <Layout>
      {/* ====== HERO SECTION ====== */}

      {/* 🖥️ DESKTOP HERO */}
      <div className="hidden md:block relative w-full h-[70vh] overflow-hidden rounded-tr-3xl rounded-bl-3xl">
        <motion.img
          src={`${TMDB_IMG}${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

        <motion.div
          className="absolute bottom-10 left-6 rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-lg border border-white/20"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={`${TMDB_IMG}${movie.poster_path}`}
            alt={movie.title}
            className="w-40 md:w-56 h-auto object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute bottom-10 right-6 text-right text-white z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-bold drop-shadow-lg mb-3">
            {movie.title}
          </h1>
          <div className="flex items-center justify-end gap-2 text-yellow-400">
            <Star className="w-5 h-5 fill-yellow-400" />
            <span className="text-lg font-semibold">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>
        </motion.div>
      </div>

      {/* 📱 MOBILE HERO */}
      <div
        className="block md:hidden relative w-full h-[30rem]  border border-border bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${TMDB_IMAGE_BASE}${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />

        <div className="absolute bottom-0 z-10 text-center px-4 pb-8 w-full text-white">
          <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
          <div className="flex justify-center gap-2 mb-2">
            {genreList.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 mb-4 text-yellow-400">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="text-sm font-semibold">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>

         
        </div>
      </div>

      {/* ====== REST OF DETAILS SECTION ====== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 px-6">
        <div className="space-y-4">
          <h1 className="text-white font-bold text-2xl">Movie Trailer</h1>

          {trailerKey ? (
            <motion.iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-tr-3xl rounded-bl-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          ) : (
            <p className="text-gray-400">
              Trailer not available. Try searching YouTube:
              <br />
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                  movie.title + " official trailer"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                Watch on YouTube
              </a>
            </p>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-white font-bold text-2xl">Overview</h1>
          <p className="text-gray-300 text-justify">{movie.overview}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div>
              <h1 className="text-white font-bold text-2xl">Release Date</h1>
              <p className="text-gray-300">{movie.release_date}</p>
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl">Runtime</h1>
              <p className="text-gray-300">{movie.runtime} minutes</p>
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl">Status</h1>
              <p className="text-gray-300">{movie.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ====== RECOMMENDATIONS SECTION ====== */}
      <div className="mt-12 px-6">
        <h1 className="font-bold text-3xl text-white mb-6">You May Also Like</h1>

        <div className="flex gap-6 hide-scrollbar overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 scroll-smooth py-4">
          {recommendations.length > 0 ? (
            recommendations.map((m, index) => (
              <motion.div
                key={m.id}
                onClick={() => navigate(`/moviedetails/${m.id}`)}
                className="flex-shrink-0 rounded-lg shadow text-white 
                   transform transition-transform duration-500 ease-out 
                   hover:scale-105 hover:shadow-2xl hover:brightness-110 w-78 md:w-95"
                whileHover={{ y: -5 }}
              >
                <div
                  className="relative flex flex-row gap-3 items-center bg-secondary/20 border-border border-2 border p-4 
                     rounded-tr-3xl rounded-bl-3xl justify-between overflow-hidden group"
                >
                  <h1
                    className="text-[100px] font-extrabold text-transparent stroke-text 
                        transform translate-y-10 group-hover:translate-y-0 
                       transition-all duration-700 ease-in-out md:text-[150px]"
                  >
                    {index + 1}
                  </h1>

                  <img
                    src={
                      m.poster_path
                        ? `${TMDB_IMAGE_BASE}${m.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={m.title || m.name}
                    className="w-48 h-64 object-cover rounded-tr-3xl rounded-bl-3xl 
                               transition-transform duration-500 ease-in-out 
                               group-hover:scale-110 group-hover:brightness-125"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">No recommendations available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
