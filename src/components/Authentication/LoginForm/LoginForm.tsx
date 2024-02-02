import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.scss";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  function onSubmit(data: FieldValues) {
    console.log(data);
  }

  return (
    <div className={styles.loginForm}>
      <h6>Don't have an account?</h6>
      <div className={styles.signupContainer}>
        <Link to="/signup">
          <button className={styles.signupBtn}>
            {/* <HiMiniPencilSquare size="20px" style={{ margin: "0 5px" }} /> */}
            Sign Up
          </button>
        </Link>
        <button className={styles.googleBtn} type="button">
          Continue with
          <FcGoogle size="30px" style={{ margin: "0 10px" }} />
          Google
        </button>
      </div>
      <h6>or</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.loginContainer}>
          <div className={styles.loginHeader}>Login</div>
          <div className={styles.inputBox}>
            {/* <label htmlFor="email">Email Address</label> */}
            <input
              {...register("email")}
              id="email"
              type="text"
              placeholder="Email Address"
            />
            {errors.email && (
              <div className={styles.error}>{errors.email.message}</div>
            )}
          </div>
          <div className={styles.inputBox}>
            {/* <label htmlFor="password">Password</label> */}
            <input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <div className={styles.error}>{errors.password.message}</div>
            )}
          </div>
          <button className={styles.loginBtn}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
