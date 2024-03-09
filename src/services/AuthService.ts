import { IUser } from "./Types";
import apiClient, { CanceledError, AxiosError } from "./api-client";
export { CanceledError, AxiosError}
import { Auth, UserId } from "./Types";

class AuthService {
  private path = "auth/";

  register(user:IUser) {
    const controller = new AbortController();
    const request = apiClient.post<UserId>(this.path + "register",  user , { signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  login(email: string, password: string) {
    const controller = new AbortController();
    const request = apiClient.post<Auth>(this.path + "login", { email, password }, { signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  logout(refreshToken: string) {
    const controller = new AbortController();
    const request = apiClient.get(this.path + "logout", { headers: { Authorization: `JWT ${refreshToken}` }, signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  refreshTokens(refreshToken: string) {
    const controller = new AbortController();
    const request = apiClient.get<Auth>(this.path + "refresh", { headers: { Authorization: `JWT ${refreshToken}` }, signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }
}

export default new AuthService();
