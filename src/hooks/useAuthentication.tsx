import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { Auth } from "../services/Types";
import { IUser } from "../services/Types";

interface ExtendedAuth extends Auth {
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
  const [auth, setAuth] = useState<Auth | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedTokens = localStorage.getItem("auth");
    if (storedTokens) {
      console.log("Stored auth!");
      setAuth(getAuth());
    }
  }, []);

  function getAuth(): ExtendedAuth | null {
    const storedTokens = localStorage.getItem("auth");
    if (storedTokens) {
      const parsedTokens: ExtendedAuth = JSON.parse(storedTokens);
      return parsedTokens;
    } else return null;
  }
  const register = (user: IUser) => {
    setIsLoading(true);
    setError(null);
    const { request } = AuthService.register(user);
    request
      .then(() => {})
      .catch((err) => {
        setError(err.response ? err.response.data : err.message);
      })
      .finally(() => setIsLoading(false));
  };

  const login = (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const { request } = AuthService.login(email, password);
    request
      .then((response) => {
        const { accessToken, refreshToken, accessTokenExpirationTime, user } = response.data;
        const receivedAuth: ExtendedAuth = {
          accessToken: accessToken,
          refreshToken: refreshToken,
          accessTokenExpirationTime: accessTokenExpirationTime,
          expirationNumber: calculateExpirationTime(accessTokenExpirationTime),
          user: user,
        };
        setLoggedIn(true);
        console.log(receivedAuth);
        setAuth(receivedAuth);
        console.log("Auth: ", receivedAuth);
        // Store auth in local storage
        localStorage.setItem("auth", JSON.stringify(receivedAuth));
      })
      .catch((err) => {
        console.error("Login error:", err.response.data);
        setError(err.response.data);
      })
      .finally(() => setIsLoading(false));
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setLoggedIn(false);
    setAuth(null);
  };

  const refreshToken = async () => {
    setIsLoading(true);
    setError(null);
    if (!auth || !auth.refreshToken) return;
    const refreshToken = auth.refreshToken;

    const { request } = AuthService.refreshTokens(refreshToken);
    request
      .then((response) => {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken, accessTokenExpirationTime: newAccessTokenExpirationTime, user } = response.data;
        const newAuth: ExtendedAuth = {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          accessTokenExpirationTime: newAccessTokenExpirationTime,
          expirationNumber: calculateExpirationTime(newAccessTokenExpirationTime),
          user: user,
        };

        setAuth(newAuth);
        console.log(newAuth);
        // Store auth in local storage
        localStorage.removeItem("auth");
        localStorage.setItem("auth", JSON.stringify(newAuth));
      })
      .catch((err) => {
        console.error("Refresh error:", err.response.data);
        setError(err.response.data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      console.log("Check token expiration...");
      const auth = getAuth();
      if (auth) {
        const expirationTime = auth.expirationNumber;
        const currentTime = new Date().getTime() / 1000; // Convert to seconds
        if (expirationTime && expirationTime < currentTime) {
          console.log("Refreshing tokens...");
          refreshToken(); // Refresh token if expired
        }
      }
    };

    if (loggedIn) {
      const intervalId = setInterval(checkTokenExpiration, 60000 * 3); // Check expiration every 3 minute
      checkTokenExpiration(); // Check immediately when component mounts

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [loggedIn]);

  return {
    auth,
    isLoading,
    error,
    loggedIn,
    getAuth,
    register,
    login,
    logout,
    refreshToken,
  };
};

export default useAuthentication;
