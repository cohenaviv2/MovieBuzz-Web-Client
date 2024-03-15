import { IPost } from "../../../services/Types";
import UserCard from "../../User/UserCard/UserCard";
import { FaStar } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import noImageAvailable from "../../../assets/no-img-availbale.png";
import styles from "./PostCard.module.scss";

interface PostCardProps {
  post: IPost;
}

function PostCard({ post }: PostCardProps) {
  return (
    <div className={styles.postCard}>
      <div className={styles.movieContainer}>
        <img src={post.tmdbImageUrl} alt={post.tmdbTitle} />
        <h3>{post.tmdbTitle}</h3>
      </div>
      <div className={styles.lineContainer} />
      <div className={styles.postContainer}>
        <div className={styles.userContainer}>
          <UserCard userDetails={{ userId: post.ownerId, fullName: post.ownerName!, imageUrl: post.ownerImageUrl! }} size="small" />
        </div>
        <div className={styles.postDetails}>{post.text}</div>
        <div className={styles.rateContainer}>
          <div className={styles.rateBox}>
            <FaStar className={styles.rateIcon} />
            <h3 className={styles.rateLabel}>{post.rating}</h3>
          </div>
          <div className={styles.commentsBox}>
            <FaCommentAlt className={styles.commentIcon} />
            {post.numOfComments}
          </div>
        </div>
      </div>
      <div className={styles.postImgContainer}>
        <img src={post.imageUrl === "no-img" ? noImageAvailable : post.imageUrl} alt={post.ownerName} />
      </div>
    </div>
  );
}

export default PostCard;
