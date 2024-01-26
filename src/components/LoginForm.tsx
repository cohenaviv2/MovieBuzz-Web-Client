import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
// import { HiMiniPencilSquare } from "react-icons/hi2";
import "../styles/LoginForm.css";
import { Link } from "react-router-dom";

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
    setValue,
    clearErrors,
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  function onSubmit(data: FieldValues) {
    console.log(data);
  }

  const handleInputClick = (fieldName: "email" | "password") => {
    setValue(fieldName, "");
    clearErrors(fieldName);
  };

  return (
    <div className="login-form">
      <h6>Don't have an account?</h6>
      <div className="signup-container">
        <Link to="/signup">
          <button className="signup-btn">
            {/* <HiMiniPencilSquare size="20px" style={{ margin: "0 5px" }} /> */}
            Sign Up
          </button>
        </Link>
        <button className="google-btn" type="button">
          Continue with
          <FcGoogle size="30px" style={{ margin: "0 10px" }} />
          Google
        </button>
      </div>
      <h6>or</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-container">
          <div className="login-header">Login</div>
          <label htmlFor="email">Email Address:</label>
          <input
            {...register("email")}
            id="email"
            type="text"
            className="login-input"
            onClick={() => handleInputClick("email")}
          />
          {errors.email && <div className="error">{errors.email.message}</div>}
          <label htmlFor="password">Password:</label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="login-input"
            onClick={() => handleInputClick("password")}
          />
          {errors.password && (
            <div className="error">{errors.password.message}</div>
          )}
          <button className="login-btn">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
