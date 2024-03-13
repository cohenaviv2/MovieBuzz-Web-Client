import { useState, useEffect } from "react";
import { tvShowsService, tvShowFilters, CanceledError, AxiosError } from "../services/MovieService";
import { ITvShow } from "../services/Types";

function useTvShowsByFilter() {
  const [tvShows, setTvShows] = useState<ITvShow[]>([]);
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(tvShowFilters[0]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = tvShowsService.get(selectedFilter, page);
    request
      .then((res) => {
        const tvShows = res.data as ITvShow[];
        setTvShows(tvShows);
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
    tvShows,
    error,
    loading,
    handleFilterSelection,
    page,
    handleNextPage,
    handlePrevPage,
  };
}

export default useTvShowsByFilter;
