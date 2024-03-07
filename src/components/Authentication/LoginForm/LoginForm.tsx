import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import { IUser } from "../../../services/Types";
import { profile as tempProfile } from "../../Post/PostsData";

export interface LoginProps {
  setProfile: (value: React.SetStateAction<IUser | null>) => void;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof loginSchema>;

function LoginForm({ setProfile }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  function onSubmit(data: FieldValues) {
    console.log("onSubmit")
    console.log(data);
    setProfile(tempProfile);
  }

  return (
    <>
      <div className={styles.loginContainer}>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formContainer}>
            <input {...register("email")} id="email" type="email" placeholder="Email Address" autoComplete="email" />
            {errors.email && <div className={styles.error}>{errors.email.message}</div>}
            <input {...register("password")} id="password" type="password" placeholder="Password" autoComplete="current-password" />
            {errors.password && <div className={styles.error}>{errors.password.message}</div>}
            <button className={styles.loginBtn}>Login</button>
          </div>
        </form>
      </div>
      <h6>Don't have an account?</h6>
      <div className={styles.signupContainer}>
        <Link to="/signup">
          <button className={styles.signupBtn}>Sign Up</button>
        </Link>
        <button className={styles.googleBtn}>
          Continue with
          <FcGoogle size="25px" style={{ margin: "0 10px" }} />
          Google
        </button>
      </div>
    </>
  );
}

export default LoginForm;
