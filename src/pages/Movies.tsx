import MovieToolbar from "../components/Movie/MovieToolbar/MovieToolbar";
import Grid from "../components/Grid/Grid";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
import { MoviesData } from "../components/Movie/MoviesData";
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
