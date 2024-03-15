import { IComment } from "./Types";
import apiClient, { CanceledError, AxiosError } from "./api-client";
export { CanceledError, AxiosError };

class PostService {
  private path = "comments/";

  getByPostId(postId: string) {
    const controller = new AbortController();
    const request = apiClient.get<IComment[]>(this.path + "post/" + postId, { signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  createComment(commentData: IComment, accessToken: string) {
    const controller = new AbortController();
    const request = apiClient.post<IComment>(this.path, commentData, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  updateComment(commentId:string,newCommentData:IComment, accessToken: string) {
    const controller = new AbortController();
    const request = apiClient.put<IComment>(this.path +commentId , newCommentData, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
      signal: controller.signal
    });
    return { request, cancel: () => controller.abort() };
  }

  deleteComment(commentId: string, accessToken: string) {
    const controller = new AbortController();
    const request = apiClient.delete(this.path + commentId, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default new PostService();
