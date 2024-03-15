import { FaPen } from "react-icons/fa6";
import { IAuth, IComment } from "../../../services/Types";
import UserCard from "../../User/UserCard/UserCard";
import styles from "./Comment.module.scss";
import { useRef, useState } from "react";
import { AxiosError } from "axios";
import Spinner from "../../Spinner/Spinner";
import Error from "../../Error/Error";
import CommentService from "../../../services/CommentService";
import { MdDelete } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

interface CommentProps {
  comment: IComment;
  auth: IAuth | null;
  setCommentChange: (value: React.SetStateAction<boolean>) => void;
}

function Comment({ comment, auth, setCommentChange }: CommentProps) {
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);
  const textRef = useRef<HTMLInputElement>(null);

  function handleEditClick() {
    setEdit((prev) => !prev);
  }

  function handleEditComment() {
    setLoading(true);
    const editedComment: IComment = {
      ownerId: comment.ownerId,
      ownerName: comment.ownerName,
      ownerImageUrl: comment.ownerImageUrl,
      postId: comment.postId,
      text: textRef.current!.value,
    };
    const { request } = CommentService.updateComment(comment._id!, editedComment, auth!.accessToken);
    request
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setCommentChange(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }

  function handleDeleteComment() {
    setLoading(true);
    const { request } = CommentService.deleteComment(comment._id!, auth!.accessToken);
    request
      .then((response) => {
        if (response.status === 204) {
          setLoading(false);
          setCommentChange(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }

  return (
    <div className={styles.commentContainer}>
      <UserCard userDetails={{ userId: comment.ownerId, fullName: comment.ownerName!, imageUrl: comment.ownerImageUrl! }} size="small" />
      {/* <h5>:</h5> */}
      <div className={styles.commentText}>{!edit ? comment.text : <input type="text" className={styles.editInput} ref={textRef} defaultValue={comment.text} />}</div>
      {auth && (
        <div className={styles.btnContainer}>
          {!edit ? (
            <>
              <button className={styles.editBtn} onClick={handleEditClick}>
                <FaPen />
              </button>
              <button className={styles.deleteBtn} onClick={handleDeleteComment}>
                <MdDelete />
              </button>
            </>
          ) : (
            <>
              <button className={styles.saveBtn} onClick={handleEditComment}>
                Save
              </button>
              <button className={styles.closeBtn} onClick={handleEditClick}>
                <IoMdClose />
              </button>
            </>
          )}
          {loading ? <Spinner /> : error ? <Error message={error.response ? (error.response.data as string) : error.message} /> : null}
        </div>
      )}
    </div>
  );
}

export default Comment;
