import { IPost } from "../../services/CommonTypes";
import UserCard from "../user/UserCard";
import { FaStar } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import "../../styles/post/PostCard.css";

interface PostCardProps {
  post: IPost;
}

function PostCard({ post }: PostCardProps) {
  return (
    <div className="post-card">
      <div className="movie-container">
        <div className="movie-img-container">
          <img
            src={post.tmdbImageUrl}
            alt={post.tmdbTitle}
            className="post-img"
          />
          {post.tmdbTitle}
        </div>
      </div>
      <div className="post-container">
        <div className="user-container">
          <UserCard
            userId={post.ownerId}
            fullName={post.ownerName as string}
            imageUrl={post.ownerImageUrl as string}
          />
        </div>
        <div className="post-details">
          <div className="details-container">
            <div className="text-container">{post.text}</div>
            <div className="rate-container">
              <div className="rate-box">
                <FaStar size="25px" className="rate-icon" />
                {post.rating}
              </div>
              <div className="comments-box">
                <FaCommentAlt size="20px" style={{ marginTop: "5px" }} />
                {post.numOfComments}
              </div>
            </div>
          </div>
          <div className="post-img-container">
            <img
              src={post.imageUrl}
              alt={post.ownerName}
              className="post-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
