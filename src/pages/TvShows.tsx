import MovieToolbar from "../components/Movie/MovieToolbar/MovieToolbar";
import Grid from "../components/Grid/Grid";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
import { Link } from "react-router-dom";
import useTvShows from "../hooks/useTvShows.tsx";

function TvShows() {
  const { tvShows, error, isLoading, setPage, setSelectedFilter } = useTvShows();

  function handleFilterSelection(filter: string) {
    setSelectedFilter(filter);
  }

  return (
    <div className="tv-shows">
      <MovieToolbar type="tv" handleFilterSelection={handleFilterSelection} />
      <Grid
        type="movie"
        items={tvShows}
        renderItem={(tvShow) => (
          <Link to={`/tv/${tvShow.id}`} key={tvShow.id}>
            <MovieCard movie={tvShow} isLoading={isLoading} />
          </Link>
        )}
      />
    </div>
  );
}

export default TvShows;
