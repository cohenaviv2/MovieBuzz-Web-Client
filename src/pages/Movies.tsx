import MovieToolbar from "../components/movie/MovieToolbar";
import Grid from "../components/Grid";
import MovieCard from "../components/movie/MovieCard";
import { MoviesData } from "../components/movie/MoviesData";
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
