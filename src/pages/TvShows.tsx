import Grid from "../components/Grid";
import MovieCard from "../components/movie/MovieCard";
import { TvShowsData } from "../components/movie/TvShowsData";
import MovieToolbar from "../components/movie/MovieToolbar";
import { Link } from "react-router-dom";

function TvShows() {
  return (
    <div className="tv-shows">
      <MovieToolbar type="tv" />
      <Grid
        type="movie"
        items={TvShowsData}
        renderItem={(tvShow) => (
          <Link to={`/tv/${tvShow.id}`} key={tvShow.id}>
            <MovieCard movie={tvShow} />
          </Link>
        )}
      />
    </div>
  );
}

export default TvShows;
