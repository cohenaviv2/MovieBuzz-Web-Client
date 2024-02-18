import apiClient, { CanceledError } from "./api-client";
export { CanceledError };

export interface ITvShow {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  year: string;
  genre_ids: number[];
  language: string;
}

export type movieFilter = "on-the-air" | "popular" | "top-rated";

class TvShowsService {
  path = "tv/";

  getTvShows(filter: string, page: number = 1) {
    const controller = new AbortController();
    const request = apiClient.get<ITvShow[]>(this.path + filter, { params: { page }, signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  searchTvShows(query: string, page: number = 1) {
    const controller = new AbortController();
    const request = apiClient.get<ITvShow[]>(this.path + "search", { params: { query, page }, signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }
}

export default new TvShowsService();
