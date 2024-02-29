import MovieToolbar from "../components/Movie/MovieToolbar/MovieToolbar";
import Grid from "../components/Grid/Grid";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
import { Link } from "react-router-dom";
import useMovies from "../hooks/useMovies";

function Movies() {
  const { movies, error, isLoading, setPage, setSelectedFilter } = useMovies();

  function handleFilterSelection(filter: string) {
    setSelectedFilter(filter);
  }

  return (
    <div className="movies">
      <MovieToolbar type="movies" handleFilterSelection={handleFilterSelection} />
      <Grid
        type="movie"
        items={movies}
        renderItem={(movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <MovieCard movie={movie} isLoading={isLoading} />
          </Link>
        )}
      />
    </div>
  );
}

export default Movies;
