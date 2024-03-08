import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { useState } from "react";
import styles from "./SignUpForm.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { TbSquareAsteriskFilled } from "react-icons/tb";
import { IUser } from "../../../services/Types";
import Spinner from "../../Spinner/Spinner";
import Error from "../../Error/Error";
import useRegisteration from "../../../hooks/useRegisteration";
import Success from "../../Success/Success";

const userSchema = z.object({
  fullName: z.string().nonempty({ message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string({ required_error: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string({ required_error: "Please confirm password" }).nonempty({ message: "Please confirm password" }),
});

userSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof userSchema>;

function SignUpForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imgSrcUrl, setImgSrcUrl] = useState<string>();
  const { success, loading, error, uploadImageAndRegister } = useRegisteration();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<FormData>({ resolver: zodResolver(userSchema) });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files?.[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageUrl = event.target?.result as string;
        setImgSrcUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: FieldValues) {
    if (imageFile) {
      const user: IUser = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        imageUrl: "",
      };
      await uploadImageAndRegister(user, imageFile);
    }
  }

  const handleInputClick = (fieldName: "email" | "password" | "fullName" | "confirmPassword") => {
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
                  <label htmlFor="image" className={styles.customFileInput} style={{ backgroundImage: `url(${imgSrcUrl})` }}>
                    {imgSrcUrl == null && <MdOutlineAddAPhoto className={styles.imgIcon} />}
                  </label>
                  {!imageFile && (
                    <div className={styles.imgError}>
                      <TbSquareAsteriskFilled />
                    </div>
                  )}
                  <input id="image" type="file" accept="image/jpeg, image/png, image/gif" className={styles.inputFile} onChange={handleImageChange} />
                </div>
                <div className={styles.nameContainer}>
                  <label htmlFor="fullName">Full Name</label>
                  <input {...register("fullName")} id="fullName" type="text" className={styles.nameInput} onClick={() => errors.fullName && handleInputClick("fullName")} />
                  <div className={styles.error}>{errors.fullName && errors.fullName.message}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formContainer}>
            <label htmlFor="email">Email Address</label>
            <input {...register("email")} id="email" type="email" autoComplete="username" onClick={() => errors.email && handleInputClick("email")} />
            <div className={styles.error}>{errors.email && errors.email.message}</div>
            <label htmlFor="password">Password</label>
            <input {...register("password")} id="password" type="password" autoComplete="new-password" onClick={() => errors.password && handleInputClick("password")} />
            <div className={styles.error}>{errors.password && errors.password.message}</div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input {...register("confirmPassword")} id="confirmPassword" type="password" autoComplete="new-password" onClick={() => errors.confirmPassword && handleInputClick("confirmPassword")} />
            {<h6>Password must contains at least 8 characters, including letters and numbers.</h6>}
            <div className={styles.error}>{errors.confirmPassword && errors.confirmPassword.message}</div>
            <label htmlFor="favorite" >
              Favorite Movie or TV Show
            </label>
            <input id="favorite" type="text" className={styles.favInput} />
            <div className={styles.errorContainer}>{error && <Error message={error} />}</div>
            <div className={styles.btnContainer}>
              <div className={styles.spinnerContainer}>{loading && <Spinner />}</div>
              <button type="submit" className={styles.signupBtn} disabled={loading} hidden={success}>
                Sign Up
              </button>
            </div>
            {success && <Success message="" />}
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUpForm;
