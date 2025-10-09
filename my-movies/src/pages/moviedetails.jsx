import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";




export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      setMovie(res.data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-white justify-items-center items-center ">Loading...</div>;

  return (
    <div className="text-white min-h-screen p-6 ">
      <div className="w-full flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-400 mb-4">
            {movie.release_date?.slice(0, 4)} • {movie.runtime} min
          </p>
          <div className="flex items-center gap-2 mb-3">
            <Star className="text-yellow-400 w-5 h-5" fill="yellow" />
            <span>{Math.round(movie.vote_average * 10) / 10}</span>
          </div>
          <p className="text-gray-300 mb-6">{movie.overview}</p>

          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((g) => (
              <span
                key={g.id}
                className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
