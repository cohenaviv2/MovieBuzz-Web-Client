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
    const controller = new AbortController();
    const request = apiClient.get<IMovie[]>(this.path + filter, { params: { page }, signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }
}

export default new MovieService();
