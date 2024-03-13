import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import PostService, { AxiosError } from "../services/PostService";
import { IAuth, IPost, IUser, IUserUpdate } from "../services/Types";
import Grid from "../components/Grid/Grid";
import PostCard from "../components/Post/PostCard/PostCard";
import Error from "../components/Error/Error";
import Spinner from "../components/Spinner/Spinner";
import styles from "../components/User/Profile/Profile.module.scss";
import { FaSignOutAlt, FaPen } from "react-icons/fa";

interface ProfileProps {
  auth: IAuth | null;
  logout: () => void;
}

function Profile({ auth, logout }: ProfileProps) {
  const [user, setUser] = useState<IUser>();
  const [posts, setPosts] = useState<IPost[]>();
  const [loading, setLoading] = useState(false);
  const [userError, setUserError] = useState<AxiosError>();
  const [postsError, setPostsError] = useState<AxiosError>();
  const [edit, setEdit] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLoading(true);
    const { accessToken } = auth!;
    const { request: requestUserDetails, cancel: cancelUser } = UserService.getUserById(accessToken);
    const { request: requestUserPosts, cancel: cancelPosts } = PostService.getUserPosts(accessToken);

    requestUserDetails.then((response) => setUser(response.data)).catch((err) => setUserError(err));
    requestUserPosts
      .then((response) => setPosts(response.data))
      .catch((err) => setPostsError(err))
      .finally(() => setLoading(false));

    return () => {
      cancelUser();
      cancelPosts();
    };
  }, []);

  function handleLogout() {
    logout();
  }

  function handleUpdateUser() {
    setLoading(true);
    const newName = nameRef.current;
    const newPassword = passwordRef.current;

    const userUpdate: IUserUpdate = {
      newFullName: newName!.value,
      newPassword: newPassword!.value,
      newImageUrl: user!.imageUrl,
    };

    const { request } = UserService.updateUserById(auth!.accessToken, userUpdate);
    request
      .then((response) => {
        const newUser = response.data;
        setUser(newUser);
      })
      .catch((err) => setUserError(err))
      .finally(() => {
        setEdit(false);
        setLoading(false);
      });
  }

  return (
    <div className="profile">
      <div className={styles.titleContainer}>
        <h5>My Profile</h5>
        <div className={styles.btnContainer}>
          {!edit && (
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
                <div className={styles.imgContainer} style={{ backgroundImage: `url(${user.imageUrl})` }}>
                  {/* <img src={user.imageUrl} alt="user" /> */}
                </div>
                <div className={styles.nameContainer}>
                  <h6>{edit ? "New Name:" : "My Name:"}</h6>
                  {edit ? <input type="text" defaultValue={user.fullName} ref={nameRef}></input> : <h5>{user.fullName}</h5>}
                  <h6>My Email:</h6>
                  <h5>{user.email}</h5>
                  {edit && (
                    <>
                      <h6>New Password</h6>
                      <input type="password" ref={passwordRef}></input>
                    </>
                  )}
                  <div className={styles.saveContainer}>
                    {edit && (
                      <button className={styles.saveBtn} onClick={handleUpdateUser}>
                        Save
                      </button>
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
                <Link to={`/movie/${post._id}`} key={post._id}>
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
