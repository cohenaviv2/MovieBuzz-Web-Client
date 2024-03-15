import { useParams, useLocation, Link } from "react-router-dom";
import { IPost } from "../services/Types";
import styles from "../components/Post/PostToolbar/PostToolbar.module.scss";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
import { useState } from "react";
import PostService, { AxiosError } from "../services/PostService";
import Grid from "../components/Grid/Grid";
import PostCard from "../components/Post/PostCard/PostCard";
import Error from "../components/Error/Error";
import Spinner from "../components/Spinner/Spinner";
import { DetailsType } from "../hooks/useMovieDetails";

function ViewPosts() {
  const [posts, setPosts] = useState<IPost[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const location = useLocation();
  const basePath = location.pathname.startsWith("/movie") ? "/movie" : "/tv";
  const { id } = useParams();
  const { movieDetails } = location.state;
  const movie = movieDetails as DetailsType;
  const movieId = id as string;

  useState(() => {
    setLoading(true);
    const { request, cancel } = PostService.searchPosts(movieId);
    request
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

    return () => cancel();
  });

  return (
    <div className="movie-posts">
      <div className={styles.viewPosts}>
        <div className={styles.postsContainer}>
          {loading ? (
            <Spinner />
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
          {error && <Error message={error.response ? (error.response.data as string) : error.message} />}
        </div>
        <div className={styles.viewPostsTitle}>
          <h5>Posts About</h5>
          <Link to={`${basePath}/${movie.id}`} key={movie.id}>
            <MovieCard movie={movie} />
          </Link>
          {/* <h6>Check out what others are saying about this movie!</h6> */}
        </div>
      </div>
    </div>
  );
}

export default ViewPosts;
