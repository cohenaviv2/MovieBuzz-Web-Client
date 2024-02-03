import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useState } from "react";
import styles from "./SignUpForm.module.scss";

const userSchema = z.object({
  fullName: z.string().nonempty({ message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string({ required_error: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string({ required_error: "Please confirm password" }).nonempty({ message: "Please confirm password" }),
  image: z.string().url(),
});

userSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof userSchema>;

function SignUpForm() {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<FormData>({ resolver: zodResolver(userSchema) });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageUrl = event.target?.result as string;
        setSelectedImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(data: FieldValues) {
    console.log(data);
  }

  const handleInputClick = (fieldName: "email" | "password" | "fullName" | "image" | "confirmPassword") => {
    setValue(fieldName, "");
    clearErrors(fieldName);
  };

  return (
    <>
      <h3>Sign Up</h3>
      <div className={styles.signupContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formContainer}>
            <div className={styles.imgNameContainer}>
              <div className={styles.imgContainer}>
                <label htmlFor="image" className={styles.customFileInput} style={{ backgroundImage: `url(${selectedImageUrl})` }}>
                  {selectedImageUrl == null && <MdOutlineAddAPhoto className={styles.imgIcon} />}
                </label>
                <input id="image" type="file" accept="image/*" className={styles.inputFile} onChange={(event) => handleImageChange(event)} />
              </div>
              <div className={styles.nameContainer}>
                <label htmlFor="fullName">Full Name</label>
                <input {...register("fullName")} id="fullName" type="text" className={styles.nameInput} onClick={() => handleInputClick("fullName")} />
                {errors.fullName && <div className={styles.error}>{errors.fullName.message}</div>}
              </div>
            </div>
            <label htmlFor="email">Email Address</label>
            <input {...register("email")} id="email" type="email" onClick={() => handleInputClick("email")} />
            {errors.email && <div className={styles.error}>{errors.email.message}</div>}
            <label htmlFor="password">Password</label>
            <input {...register("password")} id="password" type="password" onClick={() => handleInputClick("password")} />
            {errors.password && <div className={styles.error}>{errors.password.message}</div>}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input {...register("confirmPassword")} id="confirmPassword" type="password" onClick={() => handleInputClick("confirmPassword")} />
            {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword.message}</div>}
            <label className={styles.favTitle} htmlFor="favorite">
              What is your favorite Movie/TV Show?
            </label>
            <input id="favorite" type="text" className={styles.favInput} />
            <button className={styles.signupBtn}>Sign Me Up</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUpForm;
