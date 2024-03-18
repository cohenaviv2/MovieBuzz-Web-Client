import { useState, useEffect } from "react";
import AuthService, { AxiosError } from "../services/AuthService";
import { IAuth } from "../services/Types";
import { IUser } from "../services/Types";
import { CredentialResponse } from "@react-oauth/google";

interface ExtendedAuth extends IAuth {
  expirationDate: Date;
}

// const calculateExpirationTime = (accessTokenExpirationTime: string): number => {
//   const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//   const [value, unit] = accessTokenExpirationTime.match(/\d+|[a-zA-Z]+/g)!; // Split value and unit
//   let expirationTime = currentTime;

//   if (unit === "s") {
//     expirationTime += parseInt(value);
//   } else if (unit === "m") {
//     expirationTime += parseInt(value) * 60;
//   } else if (unit === "h") {
//     expirationTime += parseInt(value) * 60 * 60;
//   } else if (unit === "d") {
//     expirationTime += parseInt(value) * 60 * 60 * 24;
//   }

//   return expirationTime;
// };

const calculateExpirationDate = (accessTokenExpirationTime: string): Date => {
  const [value, unit] = accessTokenExpirationTime.match(/\d+|[a-zA-Z]+/g)!; // Split value and unit

  // eslint-disable-next-line prefer-const
  let expirationDate = new Date();
  if (unit === "s") {
    expirationDate.setSeconds(expirationDate.getSeconds() + parseInt(value));
  } else if (unit === "m") {
    expirationDate.setMinutes(expirationDate.getMinutes() + parseInt(value));
  } else if (unit === "h") {
    expirationDate.setHours(expirationDate.getHours() + parseInt(value));
  } else if (unit === "d") {
    expirationDate.setDate(expirationDate.getDate() + parseInt(value));
  }

  return expirationDate;
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
          expirationDate: calculateExpirationDate(accessTokenExpirationTime),
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
          expirationDate: calculateExpirationDate(accessTokenExpirationTime),
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
          expirationDate: calculateExpirationDate(newAuth.accessTokenExpirationTime),
          user: newAuth.user,
        };

        console.log("New Auth: ", auth);
        console.log(auth.accessToken === newExtendedAuth.accessToken);
        console.log(auth.refreshToken === newExtendedAuth.refreshToken);
        setAuth(newExtendedAuth);
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
      const tokens = getAuth();
      if (tokens) {
        const expirationTime = new Date(tokens.expirationDate);
        const currentTime = new Date(); // Convert to seconds
        if (expirationTime < currentTime) {
          refreshToken(); // Refresh token if expired
        }
      }
    };

    if (auth) {
      const intervalId = setInterval(checkTokenExpiration, 60000*5); // Check expiration every 5 minute
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
