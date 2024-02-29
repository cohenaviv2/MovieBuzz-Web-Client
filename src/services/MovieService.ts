import { genres } from "../components/Movie/genres";
import { IMovieDetails, IMovie, ITvShow } from "./Types";
import apiClient, { CanceledError } from "./api-client";
export { CanceledError };

export type ServicePath = "movies/" | "tv/";
export const movieFilters = ["popular", "now-playing", "upcoming"];
export const tvShowFilters = ["on-the-air", "popular", "top-rated"];
export type movieFilter = "popular" | "now-playing" | "upcoming";

class MovieService {
  path: ServicePath;
  constructor(servicePath: ServicePath) {
    this.path = servicePath;
  }

  get(filter: string, page: number = 1) {
    if (movieFilters.includes(filter) || tvShowFilters.includes(filter)) {
      const controller = new AbortController();
      const request = apiClient.get<IMovie[] | ITvShow[]>(this.path + filter, { params: { page }, signal: controller.signal });
      return { request, cancel: () => controller.abort() };
    } else {
      return this.getByGenreId(filter, page);
    }
  }

  search(query: string, page: number = 1) {
    const controller = new AbortController();
    const request = apiClient.get<IMovie[] | ITvShow[]>(this.path + "search", { params: { query, page }, signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  getById(movieId: number, page: number = 1) {
    const controller = new AbortController();
    const request = apiClient.get<IMovieDetails>(this.path + `by-id/${movieId}`, { params: { page } });
    return { request, cancel: () => controller.abort() };
  }

  getByGenreId(genreName: string, page: number = 1) {
    const controller = new AbortController();
    const genreId = genres.find((genre) => genre.name === genreName)!.id;
    console.log("genre Name: " + genreName);
    const request = apiClient.get<IMovie[] | ITvShow[]>(this.path + `by-genre/${genreId}`, { params: { page } });
    return { request, cancel: () => controller.abort() };
  }
}

export const movieService = new MovieService("movies/");
export const tvShowsService = new MovieService("tv/");

