import { IPost } from "./Types";
import apiClient, { CanceledError, AxiosError } from "./api-client";
export { CanceledError, AxiosError };

export type PostFilter = "top-rated" | "recent" | "most-commented";

class PostService {
  private path = "posts/";

  get(filter: PostFilter, page: number = 1) {
    const controller = new AbortController();
    const request = apiClient.get<IPost[]>(this.path + filter, { params: { page }, signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  getById(id:string) {
    const controller = new AbortController();
    const request = apiClient.get<IPost>(this.path + id, { signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  createPost(postData: IPost, accessToken: string) {
    const controller = new AbortController();
    const request = apiClient.post<IPost>(this.path, postData, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getUserPosts(accessToken: string) {
    const controller = new AbortController();
    const request = apiClient.get<IPost[]>(this.path + "find", {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  searchPosts(query: string) {
    const controller = new AbortController();
    const request = apiClient.get<IPost[]>(this.path + `search?query=${query}`);
    return { request, cancel: () => controller.abort() };
  }
}

export default new PostService();
