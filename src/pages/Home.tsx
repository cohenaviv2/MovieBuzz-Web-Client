import PostToolbar from "../components/Post/PostToolbar/PostToolbar";
import PostCard from "../components/Post/PostCard/PostCard";
import Grid from "../components/Grid/Grid";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import styles from "../components/Post/PostToolbar/PostToolbar.module.scss";
import usePostsByFilter from "../hooks/usePostsByFilter";
import Error from "../components/Error/Error";
import { IAuth } from "../services/Types";

interface HomeProps {
  auth:IAuth|null;
}

function Home({auth}:HomeProps) {
  const { posts, error, loading, selectedFilter, handleFilterSelection } = usePostsByFilter(); // ,page, handleNextPage, handlePrevPage

  return (
    <div className="home">
      <PostToolbar loading={loading} selectedFilter={selectedFilter} handleFilterSelection={handleFilterSelection} />
      {error ? (
        <Error message={error.message} />
      ) : (
        <>
          <Grid
            type="post"
            items={posts}
            renderItem={(post) => (
              <Link to={`/post/${post._id}`} key={post._id}>
                <PostCard post={post} />
              </Link>
            )}
          />
          <div className={styles.newPostBtnContainer}>
            {auth && (
              <Link to="/search">
                <button className={styles.newPostBtn}>
                  <FaPlus size="20px" />
                </button>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
