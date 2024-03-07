import { useState } from "react";
import AuthService , { CanceledError, AxiosError} from "../services/AuthService";
import { IUser } from "../services/Types";

const authService = new AuthService();

const useRegistration = () => {
  const [user, setUser] = useState<IUser>({
    fullName:'',
    email: '',
    password: '',
    imageUrl: '',

  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [success, setSuccess] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const registerUser = async () => {
    try {
      setLoading(true);
      const { request, cancel } = authService.register(user);
      const response = await request;
      // Handle success
      setLoading(false);
      setSuccess(true);
      // Clear form or do any other necessary actions
    } catch (error) {
      // Handle error
      setLoading(false);
      setError(error.message || "Registration failed");
    }
  };

  return {
    user,
    loading,
    error,
    success,
    handleInputChange,
    registerUser,
  };
};

export default useRegistration;
