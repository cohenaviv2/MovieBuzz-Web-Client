import { useState } from "react";
import useImageUpload from "./useImageUpload";
import useAuthentication from "./useAuthentication";
import { IUser } from "../services/Types";
import { AxiosError } from "../services/AuthService";

interface ImageUploadResult {
  imageUrl: string;
  error: string | null;
}

interface RegistrationResult {
  userId: string | null;
  error: string | null;
}

const useRegisteration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const {register, error: registerErr, userId } = useAuthentication();
  const { uploadImage } = useImageUpload("users");

  const uploadImageAndRegister = async (user: IUser, imageFile: File): Promise<RegistrationResult> => {
    setLoading(true);
    try {
      const { imageUrl, error: uploadError }: ImageUploadResult = await uploadImage(imageFile);
      if (uploadError) {
        console.log("uploadError"+uploadError);
        setError(uploadError);
        throw new Error(uploadError);
      }

      user.imageUrl = imageUrl; // Add the image URL to the user object
      await register(user);
      setLoading(false);
      if (registerErr && !userId) {
        console.log("registerErr"+registerErr.message);
        setError(registerErr.message);
        return { userId: null, error: error };
      } else {
        setSuccess(true);
        return { userId: userId as string | null, error: null };
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message || "Failed to upload image and register.");
      }
      setLoading(false);
      return { userId: null, error: error };
    }
  };

  return { success,loading, error, uploadImageAndRegister };
};

export default useRegisteration;
