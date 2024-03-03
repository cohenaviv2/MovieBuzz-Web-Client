import MovieToolbar from "../components/Movie/MovieToolbar/MovieToolbar";
import Grid from "../components/Grid/Grid";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
import { Link } from "react-router-dom";
import useMovies from "../hooks/useMovies";
import Pagination from "../components/Pagination/Pagination";
import Error from "../components/Error/Error";

function Movies() {
  const { movies, error, isLoading, handleFilterSelection, page, handleNextPage, handlePrevPage } = useMovies();

  return (
    <div className="movies">
      <MovieToolbar type="movies" handleFilterSelection={handleFilterSelection} loading={isLoading} />
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <Grid
            type="movie"
            items={movies}
            renderItem={(movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie}  />
              </Link>
            )}
          />
          <Pagination page={page} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} loading={isLoading} />
        </>
      )}
    </div>
  );
}

export default Movies;
