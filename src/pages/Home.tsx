import PostToolbar from "../components/Post/PostToolbar/PostToolbar";
import PostCard from "../components/Post/PostCard/PostCard";
import Grid from "../components/Grid/Grid";
import { Link } from "react-router-dom";
import { frozenPostsSearchRes } from "../components/Movie/MoviesData";
import { FaPlus } from "react-icons/fa";
import styles from "../components/Post/PostToolbar/PostToolbar.module.scss";

function Home() {
  return (
    <div className="home">
      <PostToolbar />
      <Grid
        type="post"
        items={frozenPostsSearchRes}
        renderItem={(post) => (
          <Link to={`/movie/${post._id}`} key={post._id}>
            <PostCard post={post} />
          </Link>
        )}
      />
      <Link to="/search">
        <button className={styles.newPostBtn}>
          <FaPlus size="20px" />
        </button>
      </Link>
    </div>
  );
}

export default Home;
