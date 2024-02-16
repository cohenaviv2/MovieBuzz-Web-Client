import { IUser } from "../services/CommonTypes";
import { profile } from "../components/Post/PostsData";
import { frozenPostsSearchRes } from "../components/Movie/MoviesData";
import styles from "../components/Authentication/SignUpForm/SignUpForm.module.scss";
import PostCard from "../components/Post/PostCard/PostCard";
import { Link } from "react-router-dom";
import List from "../components/List/List";
 
interface ProfileProps {
  user: IUser;
}

function Profile({user}:ProfileProps) {
    
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    return file;
  };
    
  return (
    <div className="profile">
      <h3>My Profile</h3>
      <div className={styles.signupContainer}>
        <div className={styles.imgNameContainer}>
          <div className={styles.imgContainer}>
            <label htmlFor="image" className={styles.customFileInput} style={{ backgroundImage: `url(${profile.imageUrl})` }}></label>
            <input id="image" type="file" accept="image/*" className={styles.inputFile} onChange={(event) => handleImageChange(event)} />
          </div>
          <div className={styles.nameContainer}>
            <label htmlFor="fullName">My Name</label>
            <input id="fullName" type="text" className={styles.nameInput} />
          </div>
        </div>
        <h6>My Email Address:</h6>
        <h6>{profile.email}</h6>
        <h6>My favorite Movie/Tv Show:</h6>
      </div>
      {/* <h4>My Posts</h4> */}
      <List
        type="post"
        items={frozenPostsSearchRes}
        renderItem={(post) => (
          <Link to={`/movie/${post._id}`} key={post._id}>
            <PostCard post={post} />
          </Link>
        )}
      />
    </div>
  );
}

export default Profile;
