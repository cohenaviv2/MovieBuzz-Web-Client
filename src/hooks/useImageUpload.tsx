import { useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError, AxiosResponse } from "axios";

export interface ImageUploadResult {
  imageUrl: string;
  error: AxiosError | null;
}
const path = "image/upload/";

const useImageUpload = (targetFolder: "users" | "posts") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();

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

      const {imageUrl} = response.data;
      return { imageUrl: imageUrl, error: null };

    } catch (err) {
       console.error("Upload Image Error:", err);
      if (err instanceof AxiosError) { // axios.isAxiosError(err))
        setError(err);
        return { imageUrl: "", error:err };
      } else return { imageUrl: "", error: null };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, uploadImage };
};

export default useImageUpload;
