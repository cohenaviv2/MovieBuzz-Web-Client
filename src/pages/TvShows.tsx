import MovieToolbar from "../components/Movie/MovieToolbar/MovieToolbar";
import Grid from "../components/Grid/Grid";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
import { Link } from "react-router-dom";
import useTvShows from "../hooks/useTvShows.tsx";
import Pagination from "../components/Pagination/Pagination.tsx";
import Error from "../components/Error/Error.tsx";

function TvShows() {
  const { tvShows, error, isLoading, handleFilterSelection, page, handleNextPage, handlePrevPage } = useTvShows();

  return (
    <div className="tv-shows">
      <MovieToolbar type="tv" handleFilterSelection={handleFilterSelection} loading={isLoading} />
      {error ? (
        <Error error={error} />
      ) : (
        <>
          {error && <Error error={error} />}
          <Grid
            type="movie"
            items={tvShows}
            renderItem={(tvShow) => (
              <Link to={`/tv/${tvShow.id}`} key={tvShow.id}>
                <MovieCard movie={tvShow}/>
              </Link>
            )}
          />
          <Pagination page={page} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} loading={isLoading} />
        </>
      )}
    </div>
  );
}

export default TvShows;
