import { useState, useEffect } from "react";
import { moviesService, tvShowsService, AxiosError, CanceledError } from "../services/MovieService";
import { IMovieDetails, ITvShowDetails } from "../services/Types";

// Define a generic type for the details
type DetailsType = IMovieDetails | ITvShowDetails;

function useMovieDetails<T extends DetailsType>(id: string, path: string) {
  const [movieDetails, setMovieDetails] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    setIsLoading(true);
    if (path.startsWith("/movie")) {
      const { request, cancel } = moviesService.getById(id);
      request
        .then((res) => {
          const details = res.data as T;
          setMovieDetails(details);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err instanceof CanceledError) return;
          setError(err);
          console.log(err);
        });

      return () => cancel();
    } else {
      const { request, cancel } = tvShowsService.getById(id);
      request
        .then((res) => {
          const details = res.data as T;
          console.log(details);
          setMovieDetails(details);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err instanceof CanceledError) return;
          setError(err);
          console.log(err);
        });

      return () => cancel();
    }
  }, [id, path]);

  return { movieDetails, isLoading, error };
}

export default useMovieDetails;
