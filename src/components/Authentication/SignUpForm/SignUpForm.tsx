import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { useState } from "react";
import styles from "./SignUpForm.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaAsterisk } from "react-icons/fa";
import { IUser } from "../../../services/Types";
import Spinner from "../../Spinner/Spinner";
import Error from "../../Error/Error";
import Success from "../../Success/Success";
import { SingUpProps } from "../../../pages/SignUp";
import { AxiosError } from "axios";
import UploadService from "../../../services/UploadService";

interface SingUpFormProps {
  signupProps: SingUpProps;
}

const userSchema = z
  .object({
    fullName: z.string({ required_error: "Full name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string({ required_error: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string({ required_error: "Please confirm password" }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof userSchema>;

function SignUpForm({ signupProps }: SingUpFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imgSrcUrl, setImgSrcUrl] = useState<string>();
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register: userRegister, error: regError } = signupProps;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<FormData>({ resolver: zodResolver(userSchema) });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setError(null);
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
      setLoading(true);
      const { request } = UploadService.uploadImage(imageFile, "users");
      request
        .then((response) => {
          const imageUrl = response.data.imageUrl;

          const user: IUser = {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            imageUrl: imageUrl,
          };

          userRegister(user);

          if (!regError) {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => navigate("/profile"), 1000);
          } else {
            setError(regError);
            setLoading(false);
          }
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      setError(new AxiosError("Please select image"));
    }
  }

  const handleInputClick = (fieldName: "email" | "password" | "fullName" | "confirmPassword") => {
    setValue(fieldName, "");
    clearErrors(fieldName);
  };

  return (
    <>
      <div className={styles.signupContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.detailsContainer}>
            <div className={styles.submitContainer}>
              <div className={styles.imgNameContainer}>
                <div className={styles.imgContainer}>
                  {!imageFile && (
                    <div className={styles.imgError}>
                      <FaAsterisk />
                    </div>
                  )}
                  <label htmlFor="image" className={styles.customFileInput} style={{ backgroundImage: `url(${imgSrcUrl})` }}>
                    {imgSrcUrl == null && <MdOutlineAddAPhoto className={styles.imgIcon} />}
                  </label>
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
            <div className={styles.error}>{errors.confirmPassword && errors.confirmPassword.message}</div>
            {<h6>Password must contains at least 8 characters, including letters and numbers.</h6>}
            <label htmlFor="favorite">Favorite Movie or TV Show</label>
            <input id="favorite" type="text" className={styles.favInput} />
            <div className={styles.errorContainer}>{error && <Error message={error.response ? (error.response.data as string) : error.message} />}</div>
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
