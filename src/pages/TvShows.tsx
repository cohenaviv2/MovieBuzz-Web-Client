import { useState } from "react";
import Grid from "../components/Grid/Grid";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
import { TvShowsData } from "../components/Movie/TvShowsData.ts";
import MovieToolbar from "../components/Movie/MovieToolbar/MovieToolbar";
import { Link } from "react-router-dom";
import { ITvShow } from "../services/Types.ts";

function TvShows() {
  const [tvShows, setTvShows] = useState<ITvShow[]>([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("on-the-air");
  const [page, setPage] = useState(1);

  function handleFilterSelection(filter: string) {
    setSelectedFilter(filter);
  }

  return (
    <div className="tv-shows">
      <MovieToolbar type="tv" handleFilterSelection={handleFilterSelection} />
      <Grid
        type="movie"
        items={TvShowsData}
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
