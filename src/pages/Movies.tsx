import MovieToolbar from "../components/movie/MovieToolbar/MovieToolbar.tsx";
import Grid from "../components/Grid/Grid.tsx";
import MovieCard from "../components/movie/MovieCard/MovieCard.tsx";
import { MoviesData } from "../components/movie/MoviesData.ts";
import { Link } from "react-router-dom";

function Movies() {

  return (
    <div className="movies">
      <MovieToolbar type="movies" />
      <Grid
        type="movie"
        items={MoviesData}
        renderItem={(movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <MovieCard movie={movie} />
          </Link>
        )}
      />
    </div>
  );
}

export default Movies;
