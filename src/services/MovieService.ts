import { genres } from "../components/Movie/genres";
import { IMovieDetails } from "./Types";
import apiClient, { CanceledError } from "./api-client";
export { CanceledError };

export interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  year: string;
  genre_ids: number[];
  language: string;
}

export type movieFilter = "popular" | "now-playing" | "upcoming";

class MovieService {
  path = "movies/";

  getMovies(filter: string, page: number = 1) {
    if (filter === "popular" || filter === "now-playing" || filter === "upcoming") {
      const controller = new AbortController();
      const request = apiClient.get<IMovie[]>(this.path + filter, { params: { page }, signal: controller.signal });
      return { request, cancel: () => controller.abort() };
    } else {
      return this.getMovieByGenreId(filter, page);
    }
  }

  searchMovies(query: string, page: number = 1) {
    const controller = new AbortController();
    const request = apiClient.get<IMovie[]>(this.path + "search", { params: { query, page }, signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  getMovieById(movieId: number, page: number = 1) {
    const controller = new AbortController();
    const request = apiClient.get<IMovieDetails>(this.path + `by-id/${movieId}`, { params: { page } });
    return { request, cancel: () => controller.abort() };
  }

  getMovieByGenreId(genreName: string, page: number = 1) {
    const controller = new AbortController();
    const genreId = genres.find((genre) => genre.name == genreName)!.id;
    console.log("genre Id: " + genreId);
    const request = apiClient.get<IMovie[]>(this.path + `by-genre/${genreId}`, { params: { page } });
    return { request, cancel: () => controller.abort() };
  }
}

export default new MovieService();
