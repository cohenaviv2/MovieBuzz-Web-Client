import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { NewPostProps } from "../../../pages/NewPost";
import styles from "./NewPostForm.module.scss";
import { TMDB_NULL_IMG_URL } from "../../Movie/MovieCard/MovieCard";
import noImageAvailable from "../../../assets/no-img-availbale.png";
import { DetailsType } from "../../../hooks/useMovieDetails";
import { IoClose } from "react-icons/io5";
import { IoCreate } from "react-icons/io5";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import Spinner from "../../Spinner/Spinner";
import UploadService from "../../../services/UploadService";
import PostService from "../../../services/PostService";
import { IPost } from "../../../services/Types";
import Error from "../../Error/Error";
import Success from "../../Success/Success";

interface NewPostFormProps {
  newPostProps: NewPostProps;
}

function NewPostForm({ newPostProps }: NewPostFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imgSrcUrl, setImgSrcUrl] = useState<string>();
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const rateRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = newPostProps;
  const { movieDetails } = location.state;
  const movie = movieDetails as DetailsType;

  const placeholders = ["What's the buzz?", "Share the buzz...", "Spread the buzz..."];
  const randomIndex = Math.floor(Math.random() * placeholders.length);

  const handleGoBack = () => {
    navigate(-1);
  };

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

  function handleCreatePost() {
    console.log("create post");
    setLoading(true);
    let imageUrl = "no-img";
    if (imageFile) {
      const { request } = UploadService.uploadImage(imageFile, "posts");
      request
        .then((response) => {
          imageUrl = response.data.imageUrl;
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
          return;
        });
    }

    const post: IPost = {
      ownerId: auth!.user.userId,
      ownerName: auth!.user.fullName,
      ownerImageUrl: auth!.user.imageUrl,
      text: textRef.current!.value,
      rating: rateRef.current!.valueAsNumber,
      imageUrl: imageUrl,
      tmdbId: movie.id.toString(),
      tmdbTitle: movie.title,
      tmdbImageUrl: movie.poster_path,
    };

    const { request } = PostService.createPost(post, auth!.accessToken);
    request
      .then((response) => {
        setLoading(false);
        setSuccess(true);
        const newPost = response.data;
        setTimeout(() => {
          console.log(newPost);
          navigate("/"); // TODO TODO TODO TODO TODO TODO TODO TODO
        }, 1000);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }

  return (
    <div className={styles.newPostContainer}>
      <div className={styles.movieContainer}>
        <img src={movie.poster_path === TMDB_NULL_IMG_URL ? noImageAvailable : movie.poster_path} alt={movie.title} />
        <h5>{movie.title}</h5>
        <div className={styles.rateInputContainer}>
          <FaStar className={styles.rateIcon} />
          <input className={styles.rateInput} type="number" id="rating" name="rating" min="1" max="10" defaultValue={1} ref={rateRef} />
        </div>
      </div>
      <div className={styles.postContainer}>
        <h3>New Post</h3>
        <textarea cols={3} rows={10} className={styles.textArea} placeholder={placeholders[randomIndex]} ref={textRef}></textarea>
        <div className={styles.errContainer}> {error && <Error message={error.response ? (error.response.data as string) : error.message} />}</div>
        <div className={styles.postBtnContainer}>
          <div className={styles.spinnerContainer}>{loading ? <Spinner /> : success ? <Success message="" /> : null}</div>
          <button className={styles.postBtn} onClick={handleCreatePost}>
            <IoCreate className={styles.postIcon} />
            Create Post
          </button>
        </div>
      </div>
      <div className={styles.rateContainer}>
        <label htmlFor="image" className={styles.customFileInput} style={{ backgroundImage: `url(${imgSrcUrl})` }}>
          {imgSrcUrl == null && <MdOutlineAddAPhoto className={styles.imgIcon} />}
        </label>
        <input id="image" type="file" accept="image/jpeg, image/png, image/gif" className={styles.inputFile} onChange={handleImageChange} />
      </div>
      <div className={styles.closeBtnContainer}>
        <button className={styles.closeBtn} onClick={handleGoBack}>
          <IoClose />
        </button>
      </div>
    </div>
  );
}

export default NewPostForm;