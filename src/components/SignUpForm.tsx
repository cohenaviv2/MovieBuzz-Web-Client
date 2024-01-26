import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../styles/SignUpForm.css";

const userSchema = z.object({
  fullName: z.string(),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  image: z.string().url(),
});

type FormData = z.infer<typeof userSchema>;

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<FormData>({ resolver: zodResolver(userSchema) });

  function onSubmit(data: FieldValues) {
    console.log(data);
  }

  const handleInputClick = (
    fieldName: "email" | "password" | "fullName" | "image"
  ) => {
    setValue(fieldName, "");
    clearErrors(fieldName);
  };

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; // Get the selected file
    if (file) {
      // You can perform actions with the selected file here
      console.log("Selected image:", file);
      // For example, you can display a preview of the selected image
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageUrl = event.target?.result as string;
        console.log("Image URL:", imageUrl);
        // You can set the image URL in state or use it directly for preview
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="login-form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-container">
          <div className="login-header">Login</div>
          <label htmlFor="image">Image:</label>
          <input
            id="image"
            type="file"
            accept="image/*" // Specify accepted file types (optional)
            className="login-input"
            onChange={(event) => handleImageChange(event)}
          />
          {/* {errors.email && <div className="error">{errors.email.message}</div>} */}
          <label htmlFor="fullName">Full Name:</label>
          <input
            {...register("fullName")}
            id="fullName"
            type="text"
            className="login-input"
            onClick={() => handleInputClick("fullName")}
          />
          {/* {errors.email && <div className="error">{errors.email.message}</div>} */}
          <label htmlFor="email">Email Address:</label>
          <input
            {...register("email")}
            id="email"
            type="text"
            className="login-input"
            onClick={() => handleInputClick("email")}
          />
          {/* {errors.email && <div className="error">{errors.email.message}</div>} */}
          <label htmlFor="password">Password:</label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="login-input"
            onClick={() => handleInputClick("password")}
          />
          {/* {errors.password && (<div className="error">{errors.password.message}</div>)} */}
          <button className="login-btn">Login</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
