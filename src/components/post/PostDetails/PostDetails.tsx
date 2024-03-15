import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { IAuth, IComment, IPost } from "../../../services/Types";
import styles from "./PostDetails.module.scss";
import Error from "../../Error/Error";
import Spinner from "../../Spinner/Spinner";
import { IoClose } from "react-icons/io5";
import PostService from "../../../services/PostService";
import UserCard from "../../User/UserCard/UserCard";
import { FaStar } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import NewCommentForm from "../../Comment/NewCommentForm/NewCommentForm";
import Comment from "../../Comment/Comment/Comment";
import CommentService from "../../../services/CommentService";
import noImageAvailable from "../../../assets/no-img-availbale.png";

interface PostDetailsProps {
  auth: IAuth | null;
}

function PostDetails({ auth }: PostDetailsProps) {
  const [post, setPost] = useState<IPost>();
  const [postError, setPostError] = useState<AxiosError | null>(null);
  const [postLoading, setPostLoading] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentError, setCommentError] = useState<AxiosError | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentChange, setCommentChange] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = id!;

  useEffect(() => {
    setPostLoading(true);
    const { request } = PostService.getById(postId);
    request
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => setPostError(err))
      .finally(() => setPostLoading(false));

    // return () => cancel();
  }, [commentChange]);

  useEffect(() => {
    setCommentLoading(true);
    setCommentError(null);
    const { request } = CommentService.getByPostId(postId);
    request
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => {
        setCommentError(err);
      })
      .finally(() => {
        setCommentLoading(false);
        if (commentChange) setCommentChange(false);
      });
  }, [commentChange]);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="post-details">
      {postLoading ? (
        <Spinner />
      ) : postError ? (
        <Error message={postError.message} />
      ) : (
        post && (
          <>
            <div className={styles.postCard}>
              <div className={styles.movieContainer}>
                <img src={post.tmdbImageUrl} alt={post.tmdbTitle} />
                <h3>{post.tmdbTitle}</h3>
              </div>
              <div className={styles.lineContainer} />
              <div className={styles.postContainer}>
                <div className={styles.userContainer}>
                  <UserCard userDetails={{ userId: post.ownerId, fullName: post.ownerName!, imageUrl: post.ownerImageUrl! }} size="big" />
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
              <div className={styles.closeBtnContainer}>
                <button className={styles.closeBtn} onClick={handleGoBack}>
                  <IoClose />
                </button>
              </div>
            </div>
            <div className={styles.commentsContainer}>
              {commentError ? (
                <Error message={commentError.response ? (commentError.response.data as { error: string }).error : commentError.message} />
              ) : commentLoading ? (
                <Spinner />
              ) : (
                comments?.map((comment, index) => {
                  return <Comment key={index} comment={comment} auth={auth} setCommentChange={setCommentChange} />;
                })
              )}
            </div>
            <NewCommentForm auth={auth} postId={postId} setCommentChange={setCommentChange} />
          </>
        )
      )}
    </div>
  );
}

export default PostDetails;
