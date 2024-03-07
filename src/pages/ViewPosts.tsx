import { useParams } from "react-router-dom";

function ViewPosts() {
  const { id } = useParams();
  const movieId = id!;

  return <div className="movie-posts">View {movieId} Posts</div>;
}

export default ViewPosts;
