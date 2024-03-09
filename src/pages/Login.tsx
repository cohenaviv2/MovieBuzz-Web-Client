import LoginForm from "../components/Authentication/LoginForm/LoginForm";

export interface LoginProps {
  login: (email: string, password: string) => void;
  loggedIn:boolean;
  error: string | null;
  isLoading: boolean;
}

function Login({ login, loggedIn, error, isLoading }: LoginProps) {
  return (
    <div className="login">
      <LoginForm loginProps={{ login, loggedIn, error, isLoading }} />
    </div>
  );
}

export default Login;
