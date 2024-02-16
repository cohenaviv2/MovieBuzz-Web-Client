import Grid from "../components/Grid/Grid";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
import { TvShowsData } from "../components/Movie/TvShowsData.ts";
import MovieToolbar from "../components/Movie/MovieToolbar/MovieToolbar";
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
