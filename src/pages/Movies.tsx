import MovieToolbar from "../components/Movie/MovieToolbar/MovieToolbar";
import Grid from "../components/Grid/Grid";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
import { Link } from "react-router-dom";
import useMoviesByFilter from "../hooks/useMoviesByFilter";
import Pagination from "../components/Pagination/Pagination";
import Error from "../components/Error/Error";

function Movies() {
  const { movies, error, loading, handleFilterSelection, page, handleNextPage, handlePrevPage } = useMoviesByFilter();

  return (
    <div className="movies">
      <MovieToolbar type="movies" handleFilterSelection={handleFilterSelection} loading={loading} />
      {error ? (
        <Error message={error.message} />
      ) : (
        <>
          <Grid
            type="movie"
            items={movies}
            renderItem={(movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} />
              </Link>
            )}
          />
          <Pagination page={page} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} loading={loading} />
        </>
      )}
    </div>
  );
}

export default Movies;
