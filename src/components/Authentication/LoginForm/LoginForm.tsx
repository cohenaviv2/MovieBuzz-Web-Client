import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import Error from "../../Error/Error";
import Spinner from "../../Spinner/Spinner";
import { LoginProps } from "../../../pages/Login";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

interface LoginFormProps {
  loginProps: LoginProps;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string(),
});
type FormData = z.infer<typeof loginSchema>;

function LoginForm({ loginProps }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });
  const { auth, login, googleSignin, error, isLoading } = loginProps;
  const navigate = useNavigate();

  function onSubmit(data: FieldValues) {
    const email = data.email;
    const password = data.password;
    login(email, password);
  }

  useEffect(() => {
    if (auth) {
      // Navigate to home page on successful login
      navigate("/");
    }
  }, [auth, navigate]);

  const handleInputClick = (fieldName: "email" | "password") => {
    setValue(fieldName, "");
    clearErrors(fieldName);
  };

  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    googleSignin(credentialResponse);
  };

  const onGoogleLoginFailure = () => {
    console.log("Google login failed");
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formContainer}>
            <h3>Login</h3>
            <input {...register("email")} id="email" type="email" placeholder="Email Address" autoComplete="email" onClick={() => errors.email && handleInputClick("email")} />
            <div className={styles.error}>{errors.email && errors.email.message}</div>
            <input {...register("password")} id="password" type="password" placeholder="Password" autoComplete="current-password" onClick={() => errors.password && handleInputClick("password")} />
            <div className={styles.error}>{errors.password && errors.password.message}</div>
            <button className={styles.loginBtn} disabled={isLoading}>
              Login
            </button>
          </div>
        </form>
        <div className={styles.statusContainer}>{isLoading ? <Spinner /> : error ? <Error message={error.response ? (error.response.data as string) : error.message} /> : null}</div>
      </div>
      <div className={styles.signupContainer}>
        <h6>Don't have an account?</h6>
        <Link to="/signup">
          <button className={styles.signupBtn}>Sign Up</button>
        </Link>
        {/* <button className={styles.googleBtn}>
          Continue with
          <FcGoogle size="25px" style={{ margin: "0 10px" }} />
          Google
        </button> */}
        <GoogleLogin theme="filled_black" locale="en" logo_alignment="center" text="continue_with" onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />
      </div>
    </>
  );
}

export default LoginForm;
