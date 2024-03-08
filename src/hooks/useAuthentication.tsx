import { useState, useEffect } from "react";
import AuthService, { AxiosError } from "../services/AuthService";
import { Tokens, UserId } from "../services/Types";
import { IUser } from "../services/Types";

interface AuthError {
  message: string;
}

interface ExtendedTokens extends Tokens {
  expirationNumber: number;
}

const calculateExpirationTime = (accessTokenExpirationTime: string): number => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const [value, unit] = accessTokenExpirationTime.match(/\d+|[a-zA-Z]+/g)!; // Split value and unit
  let expirationTime = currentTime;

  if (unit === "s") {
    expirationTime += parseInt(value);
  } else if (unit === "m") {
    expirationTime += parseInt(value) * 60;
  } else if (unit === "h") {
    expirationTime += parseInt(value) * 60 * 60;
  } else if (unit === "d") {
    expirationTime += parseInt(value) * 60 * 60 * 24;
  }

  return expirationTime;
};

const useAuthentication = () => {
  const [tokens, setTokens] = useState<ExtendedTokens>();
  const [profile,setProfile] = useState<IUser>({
    fullName: "",
    email:"",
    password:"",
    imageUrl:"",
  });
  const [userId, setUserId] = useState<UserId | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    const storedTokens = localStorage.getItem("tokens");
    if (storedTokens) {
      setTokens(JSON.parse(storedTokens));
    }
  }, []);

  const register = async (user: IUser) => {
    setIsLoading(true);
    try {
      const { request } = AuthService.register(user);
      const response = await request;
      setProfile((prevProfile)=>({
        ...prevProfile,
        _id: response.data._id
      }));
    } catch (err) {
      if (err instanceof AxiosError) {
        setError({ message: err.response?.data });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { request } = AuthService.login(email, password);
      const response = await request;
      const expirationNumber = calculateExpirationTime(response.data.accessTokenExpirationTime); // Assuming the expiration is 1 hour
      setTokens({ ...response.data, expirationNumber: expirationNumber });
      // Store tokens in local storage
      localStorage.setItem("tokens", JSON.stringify({ ...response.data, expirationNumber: expirationNumber }));
      
    } catch (err) {
      if (err instanceof AxiosError) {
        setError({ message: err.response?.data });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("tokens");
    setTokens(null);
    setUserId(null);
  };

  const refreshToken = async () => {
    setIsLoading(true);
    try {
      const refreshToken = tokens?.refreshToken;
      if (!refreshToken) return;

      const { request } = AuthService.refreshTokens(refreshToken);
      const response = await request;
      const expirationNumber = calculateExpirationTime(response.data.accessTokenExpirationTime); // Assuming the expiration is 1 hour
      setTokens({ ...response.data, expirationNumber: expirationNumber });
      // Update tokens in local storage
      localStorage.setItem("tokens", JSON.stringify({ ...response.data, expirationNumber: expirationNumber }));
    } catch (error) {
      // Handle error
      console.error("Refresh token error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedTokens = localStorage.getItem("tokens");
    if (storedTokens) {
      const parsedTokens: ExtendedTokens = JSON.parse(storedTokens);
      setTokens(parsedTokens);
      // Check if access token has expired and refresh it if needed
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      if (parsedTokens.expirationNumber <= currentTime) {
        refreshToken();
      }
    }
  }, []);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expirationTime = tokens?.expirationNumber;
      const currentTime = new Date().getTime() / 1000; // Convert to seconds
      if (expirationTime && expirationTime < currentTime) {
        refreshToken(); // Refresh token if expired
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 60000*3); // Check expiration every 3 minute
    checkTokenExpiration(); // Check immediately when component mounts

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [tokens]);

  return {
    tokens,
    userId,
    isLoading,
    error,
    register,
    login,
    logout,
    refreshToken,
  };
};

export default useAuthentication;
