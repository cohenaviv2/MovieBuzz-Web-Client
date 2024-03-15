import { useState, useEffect } from "react";
import AuthService, { AxiosError } from "../services/AuthService";
import { IAuth } from "../services/Types";
import { IUser } from "../services/Types";
import { CredentialResponse } from "@react-oauth/google";

interface ExtendedAuth extends IAuth {
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
  const [auth, setAuth] = useState<IAuth | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedTokens = getAuth();
    if (storedTokens) {
      setAuth(storedTokens);
      // console.log("Stored auth!");
      // console.log("stored: ",storedTokens);
      // console.log("auth state: ", auth);
    }
  }, []);

  function getAuth(): ExtendedAuth | null {
    const storedTokens = localStorage.getItem("auth");
    if (storedTokens) {
      const parsedTokens: ExtendedAuth = JSON.parse(storedTokens);
      return parsedTokens;
    } else return null;
  }

  function register(user: IUser) {
    setIsLoading(true);
    setError(null);
    const { request } = AuthService.register(user);
    request
      .then(() => {})
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }

  function login(email: string, password: string) {
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
        setAuth(receivedAuth);
        console.log("Auth: ", receivedAuth);
        // Store auth in local storage
        localStorage.setItem("auth", JSON.stringify(receivedAuth));
      })
      .catch((err) => {
        setError(err);
        console.error("Login error:", err.response.data);
      })
      .finally(() => setIsLoading(false));
  }

  function googleSignin(credentialResponse: CredentialResponse) {
    setIsLoading(true);
    setError(null);
    const { request } = AuthService.googleSignin(credentialResponse);
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
        setAuth(receivedAuth);
        console.log("Auth: ", receivedAuth);
        // Store auth in local storage
        localStorage.setItem("auth", JSON.stringify(receivedAuth));
      })
      .catch((err) => {
        setError(err);
        console.error("Login error:", err.response.data);
      })
      .finally(() => setIsLoading(false));
  }

  function logout() {
    setIsLoading(true);
    const { request } = AuthService.logout(auth!.refreshToken);
    request
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("auth");
          setLoggedIn(false);
          setAuth(null);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }

  function refreshToken() {
    setIsLoading(true);
    setError(null);
    if (!auth || !auth.refreshToken) return;
    const refreshToken = auth.refreshToken;

    const { request } = AuthService.refreshTokens(refreshToken);
    request
      .then((response) => {
        const newAuth: IAuth = response.data;
        const newExtendedAuth: ExtendedAuth = {
          accessToken: newAuth.accessToken,
          refreshToken: newAuth.refreshToken,
          accessTokenExpirationTime: newAuth.accessTokenExpirationTime,
          expirationNumber: calculateExpirationTime(newAuth.accessTokenExpirationTime),
          user: newAuth.user,
        };

        setAuth(newExtendedAuth);
        console.log("New Auth: ", auth);
        // Store auth in local storage
        localStorage.removeItem("auth");
        localStorage.setItem("auth", JSON.stringify(newExtendedAuth));
      })
      .catch((err) => {
        console.error("Refresh error:", err.response.data);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }

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

    if (auth) {
      const intervalId = setInterval(checkTokenExpiration, 60000 * 3); // Check expiration every 3 minute
      checkTokenExpiration(); // Check immediately when component mounts

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [auth]);

  return {
    auth,
    isLoading,
    error,
    loggedIn,
    getAuth,
    register,
    login,
    googleSignin,
    logout,
    refreshToken,
  };
};

export default useAuthentication;
