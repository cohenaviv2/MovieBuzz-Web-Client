import { IUser } from "./Types";
import apiClient from "./api-client";

class UserService {
  private path = "users/";

  getUserById(accessToken: string) {
    const controller = new AbortController();
    const request = apiClient.get<IUser>(this.path + "profile", {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  updateUserById(accessToken: string, userData: IUser) {
    const controller = new AbortController();
    const request = apiClient.put(this.path + "profile", userData, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getOnlineUsers(accessToken: string) {
    const controller = new AbortController();
    const request = apiClient.get<IUser[]>(this.path + "online", {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default new UserService();
