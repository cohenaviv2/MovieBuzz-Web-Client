import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import { IAuth, IComment, IPost } from "../../../services/Types";
import styles from "./PostDetails.module.scss";
import Error from "../../Error/Error";
import Spinner from "../../Spinner/Spinner";
import { IoClose } from "react-icons/io5";
import PostService from "../../../services/PostService";
import UserCard from "../../User/UserCard/UserCard";
import { FaCaretDown, FaCaretUp, FaPen, FaStar } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import NewCommentForm from "../../Comment/NewCommentForm/NewCommentForm";
import Comment from "../../Comment/Comment/Comment";
import CommentService from "../../../services/CommentService";
import noImageAvailable from "../../../assets/no-img-availbale.png";
import { MdDelete, MdOutlineAddAPhoto } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import UploadService from "../../../services/UploadService";

interface PostDetailsProps {
  auth: IAuth | null;
}

export interface IPostUpdate {
  newText: string;
  newImageUrl: string;
  newRating: string;
}

function PostDetails({ auth }: PostDetailsProps) {
  const [post, setPost] = useState<IPost>();
  const [postError, setPostError] = useState<AxiosError | null>(null);
  const [postLoading, setPostLoading] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentError, setCommentError] = useState<AxiosError | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentChange, setCommentChange] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newRating, setNewRating] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imgSrcUrl, setImgSrcUrl] = useState<string>();
  const [newText, setNewText] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = id!;

  useEffect(() => {
    setPostLoading(true);
    const { request } = PostService.getById(postId);
    request
      .then((response) => {
        setPost(response.data);
        setImgSrcUrl(response.data.imageUrl === "no-img" ? noImageAvailable : response.data.imageUrl);
        setNewRating(response.data.rating);
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

  function handleDeletePost() {
    if (!auth || !post) return;
    setPostLoading(true);
    const { request } = PostService.deleteById(auth.accessToken, post._id!);
    request
      .then((response) => {
        if (response.status == 204) {
          navigate("/");
        }
      })
      .catch((err) => {
        setPostError(err);
      })
      .finally(() => setPostLoading(false));
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files?.[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageUrl = event.target?.result as string;
        setImgSrcUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleRatingUp() {
    if (newRating != 10) {
      setNewRating((prev) => prev + 1);
    }
  }

  function handleRatingDown() {
    if (newRating != 1) {
      setNewRating((prev) => prev - 1);
    }
  }

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(event.target.value);
  };

  async function handleEditPost() {
    if (auth && post) {
      setPostLoading(true);
      let newImageUrl = null;
      if (imageFile) {
        const { request } = UploadService.uploadImage(imageFile, "posts");
        try {
          const response = await request;
          newImageUrl = response.data.imageUrl;
        } catch (err) {
          if (err instanceof AxiosError) {
            setPostError(err);
            setPostLoading(false);
            return;
          }
        }
      }
      const newImg = newImageUrl ? newImageUrl : imgSrcUrl!;
      const postUpdate: IPostUpdate = {
        newText: newText ? newText : post.text,
        newRating: newRating.toString(),
        newImageUrl: newImg,
      };

      const { request } = PostService.updateById(auth!.accessToken, post._id!, postUpdate);
      request
        .then((response) => {
          const newPost = response.data;
          setPost(newPost);
        })
        .catch((err) => setPostError(err))
        .finally(() => {
          setEdit(false);
          setPostLoading(false);
        });
    }
  }

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
                <div className={styles.postDetails}>{edit ? <textarea className={styles.textArea} defaultValue={post.text} ref={textRef} onChange={handleTextareaChange}></textarea> : post.text}</div>
                <div className={styles.rateContainer}>
                  <div className={styles.rateBox}>
                    {edit && (
                      <div className={styles.rateBtnContainer}>
                        <button className={styles.rateBtn} onClick={handleRatingUp}>
                          <FaCaretUp />
                        </button>
                        <button className={styles.rateBtn} onClick={handleRatingDown}>
                          <FaCaretDown />
                        </button>
                      </div>
                    )}
                    <FaStar className={styles.rateIcon} />
                    <h3 className={styles.rateLabel}>{!edit ? post.rating : newRating}</h3>
                  </div>
                  <div className={styles.commentsBox}>
                    <FaCommentAlt className={styles.commentIcon} />
                    {post.numOfComments}
                  </div>
                  {auth &&
                    auth.user.userId == post.ownerId &&
                    (!edit ? (
                      <>
                        <button className={styles.editBtn} onClick={() => setEdit(true)}>
                          <FaPen />
                        </button>
                        <button className={styles.deleteBtn} onClick={handleDeletePost}>
                          <MdDelete />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className={styles.closeEditBtn} onClick={() => setEdit(false)}>
                          <IoMdClose />
                        </button>
                        <button className={styles.saveBtn} onClick={handleEditPost}>
                          save
                        </button>
                      </>
                    ))}
                </div>
              </div>
              <div className={styles.postImgContainer}>
                {/* <img src={post.imageUrl === "no-img" ? noImageAvailable : post.imageUrl} alt={post.ownerName} /> */}
                <label htmlFor="image" className={styles.customFileInput} style={{ backgroundImage: `url(${imgSrcUrl})` }}>
                  {edit && <MdOutlineAddAPhoto className={styles.imgIcon} />}
                </label>
                <input id="image" type="file" accept="image/jpeg, image/png, image/gif" disabled={!edit} className={styles.inputFile} onChange={handleImageChange} />
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
