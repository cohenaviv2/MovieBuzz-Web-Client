import { useState, useEffect } from "react";
import { tvShowsService, tvShowFilters, CanceledError } from "../services/MovieService";
import { ITvShow } from "../services/Types";

function useTvShows(initialPage = 1) {
  const [tvShows, setTvShows] = useState<ITvShow[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(tvShowFilters[0]);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setIsLoading(true);
    console.log("filter changed: " + selectedFilter);

    const { request, cancel } = tvShowsService.get(selectedFilter, page);
    request
      .then((res) => {
        const tvShows = res.data as ITvShow[];
        setTvShows(tvShows);
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
    tvShows,
    error,
    isLoading,
    setPage,
    setSelectedFilter,
  };
}

export default useTvShows;
