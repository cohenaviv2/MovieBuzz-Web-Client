import PostToolbar from "../components/post/PostToolbar";
import PostCard from "../components/post/PostCard";
import Grid from "../components/Grid";
import { Link } from "react-router-dom";
import { frozenPostsSearchRes } from "../components/movie/MoviesData";

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
    </div>
  );
}

export default Home;
