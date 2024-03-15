import { IMessage } from "./Types";
import apiClient from "./api-client";

class MessageService {
  private path = "message/";

  getConversation(accessToken: string, receiverId: string) {
    const controller = new AbortController();
    const request = apiClient.post<IMessage[]>(
      this.path + "get-conversation",
      { receiverId: receiverId },
      {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }
}

export default new MessageService();
