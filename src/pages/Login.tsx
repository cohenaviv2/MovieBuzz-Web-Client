import LoginForm, { LoginProps } from "../components/Authentication/LoginForm/LoginForm";


function Login({ setProfile }: LoginProps) {
  return (
    <div className="login">
      <LoginForm setProfile={setProfile} />
    </div>
  );
}

export default Login;
