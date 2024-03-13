import MovieToolbar from "../components/Movie/MovieToolbar/MovieToolbar";
import Grid from "../components/Grid/Grid";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
import { Link } from "react-router-dom";
import useTvShowsByFilter from "../hooks/useTvShowsByFilter.tsx";
import Pagination from "../components/Pagination/Pagination.tsx";
import Error from "../components/Error/Error.tsx";

function TvShows() {
  const { tvShows, error, loading, handleFilterSelection, page, handleNextPage, handlePrevPage } = useTvShowsByFilter();

  return (
    <div className="tv-shows">
      <MovieToolbar type="tv" handleFilterSelection={handleFilterSelection} loading={loading} />
      {error ? (
        <Error message={error.message} />
      ) : (
        <>
          {error && <Error message={error} />}
          <Grid
            type="movie"
            items={tvShows}
            renderItem={(tvShow) => (
              <Link to={`/tv/${tvShow.id}`} key={tvShow.id}>
                <MovieCard movie={tvShow} />
              </Link>
            )}
          />
          <Pagination page={page} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} loading={loading} />
        </>
      )}
    </div>
  );
}

export default TvShows;
