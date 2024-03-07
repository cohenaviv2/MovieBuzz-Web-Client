import { useState, useEffect } from "react";
import { moviesService, movieFilters, CanceledError, AxiosError } from "../services/MovieService";
import { IMovie } from "../services/Types";

function useMovies() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(movieFilters[0]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = moviesService.get(selectedFilter, page);
    request
      .then((res) => {
        const movies = res.data as IMovie[];
        setMovies(movies);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err instanceof CanceledError) return;
        setError(err);
        console.log(err);
      });

    return () => cancel();
  }, [selectedFilter, page]);

  const handleFilterSelection = (filter: string) => {
    setSelectedFilter(filter);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return {
    movies,
    error,
    loading,
    handleFilterSelection,
    page,
    handleNextPage,
    handlePrevPage,
  };
}

export default useMovies;
