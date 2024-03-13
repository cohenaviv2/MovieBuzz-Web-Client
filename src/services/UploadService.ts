import apiClient from "./api-client";

class UploadService {
  private path = "image/upload/";

  uploadImage(imageFile: File, targetFolder: "users" | "posts") {
    const controller = new AbortController();
    const formData = new FormData();
    formData.append("image", imageFile);
    const request = apiClient.post<{ imageUrl: string }>(this.path + targetFolder, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }
}

export default new UploadService();
