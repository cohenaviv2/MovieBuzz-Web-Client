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
  imageUrl: z.string().url(),
});

userSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof userSchema>;

function SignUpForm() {
  const [imgSrc, setImgSrc] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<FormData>({ resolver: zodResolver(userSchema) });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Image changed");
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageUrl = event.target?.result as string;
        setImgSrc(imageUrl);
      };
      reader.readAsDataURL(file);
    }
    // TODO
    setValue("imageUrl", "...");
  };

  function onSubmit(data: FieldValues) {
    console.log("onSubmit");
    console.log(data);
  }

  const handleInputClick = (fieldName: "email" | "password" | "fullName" | "imageUrl" | "confirmPassword") => {
    setValue(fieldName, "");
    clearErrors(fieldName);
  };

  return (
    <>
      <h3>Sign Up</h3>
      <div className={styles.signupContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.detailsContainer}>
            <div className={styles.submitContainer}>
              <div className={styles.imgNameContainer}>
                <div className={styles.imgContainer}>
                  <label htmlFor="image" className={styles.customFileInput} style={{ backgroundImage: `url(${imgSrc})` }}>
                    {imgSrc == null && <MdOutlineAddAPhoto className={styles.imgIcon} />}
                  </label>
                  <input id="image" type="file" accept="image/*" className={styles.inputFile} onChange={handleImageChange} />
                </div>
                <div className={styles.nameContainer}>
                  <label htmlFor="fullName">Full Name</label>
                  <input {...register("fullName")} id="fullName" type="text" className={styles.nameInput} onClick={() => errors.fullName && handleInputClick("fullName")} />
                  {errors.fullName && <div className={styles.error}>{errors.fullName.message}</div>}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formContainer}>
            <label htmlFor="email">Email Address</label>
            <input {...register("email")} id="email" type="email" autoComplete="username" onClick={() => errors.email && handleInputClick("email")} />
            {errors.email && <div className={styles.error}>{errors.email.message}</div>}
            <label htmlFor="password">Password</label>
            <input {...register("password")} id="password" type="password" autoComplete="new-password" onClick={() => errors.password && handleInputClick("password")} />
            {errors.password && <div className={styles.error}>{errors.password.message}</div>}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input {...register("confirmPassword")} id="confirmPassword" type="password" autoComplete="new-password" onClick={() => errors.confirmPassword && handleInputClick("confirmPassword")} />
            {!errors.password && <h6>Password must contains at least 8 characters, including letters and numbers.</h6>}
            {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword.message}</div>}
            <label htmlFor="favorite" style={{textAlign:"center", marginTop:"1rem"}}>Favorite Movie or TV Show</label>
            <input id="favorite" type="text" className={styles.favInput} />
            <button className={styles.signupBtn}>Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUpForm;
