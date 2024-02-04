import { IPost } from "../../../services/CommonTypes";
import UserCard from "../../User/UserCard";
import { FaStar } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import styles from "./PostCard.module.scss";

interface PostCardProps {
  post: IPost;
}

function PostCard({ post }: PostCardProps) {
  return (
    <div className={styles.postCard}>
      <div className={styles.movieContainer}>
        <img src={post.tmdbImageUrl} alt={post.tmdbTitle} />
        {post.tmdbTitle}
      </div>
      <div className={styles.postContainer}>
        <UserCard userId={post.ownerId} fullName={post.ownerName!} imageUrl={post.ownerImageUrl!} />
        <div className={styles.postDetails}>{post.text}</div>
        <div className={styles.rateContainer}>
          <div className={styles.rateBox}>
            <FaStar className={styles.rateIcon} />
            {post.rating}
          </div>
          <div className={styles.commentsBox}>
            <FaCommentAlt className={styles.commentIcon} />
            {post.numOfComments}
          </div>
        </div>
      </div>
      <div className={styles.postImgContainer}>
        <img src={post.imageUrl} alt={post.ownerName} />
      </div>
    </div>
  );
}

export default PostCard;
