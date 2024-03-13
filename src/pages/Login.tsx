import { AxiosError } from "axios";
import LoginForm from "../components/Authentication/LoginForm/LoginForm";
import { IAuth } from "../services/Types";

export interface LoginProps {
  login: (email: string, password: string) => void;
  auth: IAuth | null;
  loggedIn: boolean;
  error: AxiosError | null;
  isLoading: boolean;
}

function Login({ login,auth, loggedIn, error, isLoading }: LoginProps) {
  return (
    <div className="login">
      <LoginForm loginProps={{ login,auth, loggedIn, error, isLoading }} />
    </div>
  );
}

export default Login;
