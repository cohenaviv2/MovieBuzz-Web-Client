import { IUser } from "./Types";
import apiClient, { CanceledError, AxiosError } from "./api-client";
export { CanceledError, AxiosError}

class AuthService {
  path = "auth/";

  register(user:IUser) {
    const controller = new AbortController();
    const request = apiClient.post(this.path + "register", { user, signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  login(email: string, password: string) {
    const controller = new AbortController();
    const request = apiClient.post(this.path + "login", { email, password, signal:controller.signal});
    return { request, cancel: () => controller.abort() };
  }

  logout(refreshToken: string) {
    const controller = new AbortController();
    const request = apiClient.post(this.path + "logout", null, { headers: { Authorization: `JWT ${refreshToken}` }, signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  refreshTokens(refreshToken: string) {
    const controller = new AbortController();
    const request = apiClient.post(this.path + "refresh", { refreshToken, signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }
}

export default AuthService;
