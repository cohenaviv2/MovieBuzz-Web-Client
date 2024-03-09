import styles from "../components/User/Profile/Profile.module.scss";
import PostCard from "../components/Post/PostCard/PostCard";
import { Link } from "react-router-dom";
import Grid from "../components/Grid/Grid";
import { useEffect, useState } from "react";
import { Auth, IPost, IUser } from "../services/Types";
import PostService, { AxiosError } from "../services/PostService";
import { FaSignOutAlt, FaPen } from "react-icons/fa";
import Spinner from "../components/Spinner/Spinner";
import Error from "../components/Error/Error";
import UserService from "../services/UserService";

interface ProfileProps {
  auth: Auth | null;
  logout: () => void;
}

function Profile({ auth, logout }: ProfileProps) {
  const [user, setUser] = useState<IUser>();
  const [posts, setPosts] = useState<IPost[]>();
  const [loading, setLoading] = useState(false);
  const [userError, setUserError] = useState<AxiosError>();
  const [postsError, setPostsError] = useState<AxiosError>();

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   return file;
  // };

  useEffect(() => {
    setLoading(true);
    const { accessToken } = auth!;
    const { request: requestUser, cancel: cancelUser } = UserService.getUserById(accessToken);
    const { request: requestPosts, cancel: cancelPosts } = PostService.getUserPosts(accessToken);

    requestUser.then((response) => setUser(response.data)).catch((err) => setUserError(err));
    requestPosts
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

  return (
    <div className="profile">
      <div className={styles.titleContainer}>
        <h5>My Profile</h5>
        <div className={styles.btnContainer}>
          <button className={styles.editBtn}>
            <FaPen /> Edit
          </button>
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
                  <h6>My Name:</h6>
                  <h5>{user.fullName}</h5>
                  <h6>My Email:</h6>
                  <h5>{user.email}</h5>
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
