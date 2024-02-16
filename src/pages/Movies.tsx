import MovieToolbar from "../components/Movie/MovieToolbar/MovieToolbar";
import Grid from "../components/Grid/Grid";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
// import { MoviesData } from "../components/Movie/MoviesData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMovie } from "../services/Types";
import MovieService, { CanceledError } from "../services/MovieService";

function Movies() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("popular");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    console.log("filter changed: " + selectedFilter);

    const { request, cancel } = MovieService.getMovies(selectedFilter, page);
    request
      .then((res) => {
        setMovies(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err instanceof CanceledError) return;
        setError(err);
        console.log(err);
      });

    return () => cancel();
  }, [selectedFilter, page]);

  function handleFilterSelection(filter: string) {
    setSelectedFilter(filter);
  }

  return (
    <div className="movies">
      <MovieToolbar type="movies" handleFilterSelection={handleFilterSelection} />
      <Grid
        type="movie"
        items={movies}
        renderItem={(movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <MovieCard movie={movie} isLoading={isLoading} />
          </Link>
        )}
      />
    </div>
  );
}

export default Movies;
