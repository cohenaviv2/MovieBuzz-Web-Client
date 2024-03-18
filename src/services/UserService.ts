import { IUser, IUserChat } from "./Types";
import apiClient from "./api-client";

export interface IUserUpdate {
  newFullName:string;
  newPassword:string;
  newImageUrl:string;
}

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

  updateUserById(accessToken: string, userUpdate: IUserUpdate) {
    const controller = new AbortController();
    const request = apiClient.put<IUser>(this.path + "profile", userUpdate, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getOnlineUsers(accessToken: string) {
    const controller = new AbortController();
    const request = apiClient.get<IUserChat[]>(this.path + "online", {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default new UserService();
