import { useState } from "react";
import useImageUpload, { ImageUploadResult } from "./useImageUpload";
import useAuthentication from "./useAuthentication";
import { IUser } from "../services/Types";
import { AxiosError } from "../services/AuthService";

interface RegistrationResult {
  error: string | null;
}

const useRegisteration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<boolean>(false);
  const { register, error: registerErr } = useAuthentication();
  const { uploadImage } = useImageUpload("users");

  const uploadImageAndRegister = async (user: IUser, imageFile: File): Promise<RegistrationResult> => {
    setLoading(true);
    try {
      const { imageUrl, error: uploadError }: ImageUploadResult = await uploadImage(imageFile);
      if (uploadError) {
        setError(uploadError.response?.data as string);
      }

      user.imageUrl = imageUrl; // Add the image URL to the user object

      register(user);
      if (registerErr) {
        setError(registerErr);
        return { error: registerErr };
      } else {
        setSuccess(true);
        return { error: null };
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data as string);
        return { error: err.response?.data as string };
      } else {
        console.log("Register err (not Axios): ", err);
        return { error: null };
      }
    } finally {
      setLoading(false);
    }
  };

  return { success, loading, error, uploadImageAndRegister };
};

export default useRegisteration;
