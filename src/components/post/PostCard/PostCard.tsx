import { IPost } from "../../../services/CommonTypes";
import UserCard from "../../User/UserCard";
import { FaStar } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import styles from "./PostCard.module.scss"

interface PostCardProps {
  post: IPost;
}

function PostCard({ post }: PostCardProps) {
  return (
    <div className={styles.postCard}>   
      <div className={styles.movieContainer}>
        <div className={styles.movieImgContainer}>
          <img
            src={post.tmdbImageUrl}
            alt={post.tmdbTitle}
            className={styles.postImg}
          />
          {post.tmdbTitle}
        </div>
      </div>
      <div className={styles.postContainer}>
        <div className={styles.userContainer}>
          <UserCard
            userId={post.ownerId}
            fullName={post.ownerName as string}
            imageUrl={post.ownerImageUrl as string}
          />
        </div>
        <div className={styles.postDetails}>
          <div className={styles.detailsContainer}>
            <div className={styles.textContainer}>{post.text}</div>
            <div className={styles.rateContainer}>
              <div className={styles.rateBox}>
                <FaStar size="25px" className={styles.rateIcon} />
                {post.rating}
              </div>
              <div className={styles.commentsBox}>
                <FaCommentAlt size="20px" style={{ marginTop: "5px" }} />
                {post.numOfComments}
              </div>
            </div>
          </div>
          <div className={styles.postImgContainer}>
            <img
              src={post.imageUrl}
              alt={post.ownerName}
              className={styles.postImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
