import { useState } from "react";
import MovieToolbar from "../components/movie/MovieToolbar";
import Grid from "../components/Grid";
import MovieCard from "../components/movie/MovieCard";
import MovieDetails from "../components/movie/MovieDetails";
import { IMovie } from "../services/CommonTypes";
import { MoviesData } from "../components/movie/MoviesData";

function Movies() {
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);

  const handleMovieClick = (movie: IMovie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="movies">
        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
        ) : (
          <>
            <MovieToolbar type="movies" />
            <Grid
              items={MoviesData}
              renderItem={(movie) => (
                <div onClick={() => handleMovieClick(movie)}>
                  <MovieCard movie={movie} />
                </div>
              )}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Movies;
