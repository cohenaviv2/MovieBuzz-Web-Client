import { useState } from "react";
import Grid from "../components/Grid";
import MovieCard from "../components/movie/MovieCard";
import { TvShowsData } from "../components/movie/TvShowsData";
import { ITvShow } from "../services/CommonTypes";
import MovieDetails from "../components/movie/MovieDetails";
import MovieToolbar from "../components/movie/MovieToolbar";

function TvShows() {
  const [selectedTvShow, setSelectedTvShow] = useState<ITvShow | null>(null);

  const handleMovieClick = (tvShow: ITvShow) => {
    setSelectedTvShow(tvShow);
  };

  const handleCloseDetails = () => {
    setSelectedTvShow(null);
  };

  return (
    <div className="tv-shows">
      {selectedTvShow ? (
        <MovieDetails movie={selectedTvShow} onClose={handleCloseDetails} />
      ) : (
        <>
          <MovieToolbar type="tv" />
          <Grid
            items={TvShowsData}
            renderItem={(tvShow) => (
              <div onClick={() => handleMovieClick(tvShow)}>
                <MovieCard movie={tvShow} />
              </div>
            )}
          />
        </>
      )}
    </div>
  );
}

export default TvShows;
