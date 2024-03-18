import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import PostService, { AxiosError } from "../services/PostService";
import { IAuth, IPost, IUser } from "../services/Types";
import Grid from "../components/Grid/Grid";
import PostCard from "../components/Post/PostCard/PostCard";
import Error from "../components/Error/Error";
import Spinner from "../components/Spinner/Spinner";
import styles from "../components/User/Profile/Profile.module.scss";
import { FaSignOutAlt, FaPen } from "react-icons/fa";
import { MdOutlineAddAPhoto } from "react-icons/md";
import UploadService from "../services/UploadService";

interface ProfileProps {
  auth: IAuth | null;
  isLoading: boolean;
  logout: () => void;
  refreshToken: (refreshToken: string) => void;
}

export interface IUserUpdate {
  newFullName: string;
  newPassword: string;
  newImageUrl: string;
}

function Profile({ auth, isLoading, logout, refreshToken: refreshTokens }: ProfileProps) {
  const [user, setUser] = useState<IUser>();
  const [posts, setPosts] = useState<IPost[]>();
  const [loading, setLoading] = useState(false);
  const [userError, setUserError] = useState<AxiosError>();
  const [postsError, setPostsError] = useState<AxiosError>();
  const [edit, setEdit] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imgSrcUrl, setImgSrcUrl] = useState<string>();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    const { accessToken } = auth;
    if (!accessToken) return; // Return early if accessToken is null

    const { request: requestUserDetails, cancel: cancelUser } = UserService.getUserById(accessToken);
    const { request: requestUserPosts, cancel: cancelPosts } = PostService.getUserPosts(accessToken);

    requestUserDetails.then((response) => setUser(response.data)).catch((err) => setUserError(err));
    requestUserPosts
      .then((response) => setPosts(response.data))
      .catch((err) => setPostsError(err))
      .finally(() => setLoading(false));

    setImgSrcUrl(auth.user.imageUrl);

    return () => {
      cancelUser();
      cancelPosts();
    };
  }, [auth]);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  function handleLogout() {
    logout();
  }

  async function handleUpdateUser() {
    if (auth) {
      setLoading(true);

      let newImageUrl = null;
      if (imageFile) {
        const { request } = UploadService.uploadImage(imageFile, "users");
        try {
          const response = await request;
          newImageUrl = response.data.imageUrl;
        } catch (err) {
          if (err instanceof AxiosError) {
            setUserError(err);
            setLoading(false);
            return;
          }
        }
      }
      const newName = nameRef.current;
      const newPassword = passwordRef.current;
      const newImg = newImageUrl ? newImageUrl : auth.user.imageUrl;
      console.log(newImageUrl);
      const userUpdate: IUserUpdate = {
        newFullName: newName?.value ? newName.value : auth.user.fullName ,
        newPassword: newPassword?.value ? newPassword.value : auth.user.imageUrl,
        newImageUrl: newImg
      };

      const { request } = UserService.updateUserById(auth!.accessToken, userUpdate);
      request
        .then((response) => {
          const newUser = response.data;
          setUser(newUser);
          refreshTokens(auth?.refreshToken);
        })
        .catch((err) => setUserError(err))
        .finally(() => {
          setEdit(false);
          setLoading(false);
        });
    }
  }

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

  if (!auth) return <Error message="No Auth!" />;

  return (
    <div className="profile">
      <div className={styles.titleContainer}>
        <h5>My Profile</h5>
        <div className={styles.btnContainer}>
          <div className={styles.spinnerContainer}>{isLoading && <Spinner />}</div>
          {!edit && !auth.user.googleId && (
            <button className={styles.editBtn} onClick={() => setEdit(true)}>
              <FaPen /> Edit
            </button>
          )}
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.detailsContainer}>
          {loading ? (
            <Spinner />
          ) : userError ? (
            <Error message={userError.message} />
          ) : (
            user && (
              <>
                {/* <div className={styles.imgContainer} style={{ backgroundImage: `url(${imgSrcUrl})` }} /> */}
                <label htmlFor="image" className={styles.customFileInput} style={{ backgroundImage: `url(${imgSrcUrl})` }}>
                  {edit && <MdOutlineAddAPhoto className={styles.imgIcon} />}
                </label>
                <input id="image" type="file" accept="image/jpeg, image/png, image/gif" disabled={!edit} className={styles.inputFile} onChange={handleImageChange} />
                <div className={styles.nameContainer}>
                  <h6>{edit ? "New Name:" : "My Name:"}</h6>
                  {edit ? <input type="text" defaultValue={user.fullName} ref={nameRef}></input> : <h5>{user.fullName}</h5>}
                  <h6>My Email:</h6>
                  <h5>{user.email}</h5>
                  {edit && (
                    <>
                      <h6>New Password:</h6>
                      <input type="password" ref={passwordRef}></input>
                    </>
                  )}
                  <div className={styles.saveContainer}>
                    {edit && (
                      <div className={styles.saveBtnContainer}>
                        <button className={styles.saveBtn} onClick={handleUpdateUser}>
                          Save
                        </button>
                        <button className={styles.cancelBtn} onClick={() => setEdit(false)}>
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>

      <h5>My Posts</h5>
      <div className={styles.postsContainer}>
        {loading ? (
          <Spinner />
        ) : postsError ? (
          <Error message={postsError.response ? (postsError.response.data as string) : postsError.message} />
        ) : (
          posts && (
            <Grid
              type="post"
              items={posts}
              renderItem={(post) => (
                <Link to={`/post/${post._id}`} key={post._id}>
                  <PostCard post={post} />
                </Link>
              )}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Profile;
