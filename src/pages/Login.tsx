import { AxiosError } from "axios";
import LoginForm from "../components/Authentication/LoginForm/LoginForm";
import { IAuth } from "../services/Types";
import { CredentialResponse } from "@react-oauth/google";

export interface LoginProps {
  login: (email: string, password: string) => void;
  googleSignin: (credentialResponse: CredentialResponse) => void;
  auth: IAuth | null;
  loggedIn: boolean;
  error: AxiosError | null;
  isLoading: boolean;
}

function Login({ login, googleSignin, auth, loggedIn, error, isLoading }: LoginProps) {
  return (
    <div className="login">
      <LoginForm loginProps={{ login, googleSignin, auth, loggedIn, error, isLoading }} />
    </div>
  );
}

export default Login;
