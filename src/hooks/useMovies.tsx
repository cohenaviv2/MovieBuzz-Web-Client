import { useState, useEffect } from "react";
import { movieService, movieFilters, CanceledError } from "../services/MovieService";
import { IMovie } from "../services/Types";

function useMovies(initialPage = 1) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(movieFilters[0]);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setIsLoading(true);
    console.log("filter changed: " + selectedFilter);

    const { request, cancel } = movieService.get(selectedFilter, page);
    request
      .then((res) => {
        const movies = res.data as IMovie[];
        setMovies(movies);
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

  return {
    movies,
    error,
    isLoading,
    setPage,
    setSelectedFilter,
  };
}

export default useMovies;
