import { useState } from "react";
import apiClient from "../services/api-client";
import axios, { AxiosResponse } from "axios";

export interface ImageUploadResult {
  imageUrl: string;
  error: string | null;
}
const path = "image/upload/";

const useImageUpload = (targetFolder: "users" | "posts") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (imageFile: File): Promise<ImageUploadResult> => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response: AxiosResponse<{ imageUrl: string }> = await apiClient.post(path + targetFolder, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      return { imageUrl: response.data.imageUrl, error: null };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      }
      setLoading(false);
      return { imageUrl: "", error: error };
    }
  };

  return { loading, error, uploadImage };
};

export default useImageUpload;
