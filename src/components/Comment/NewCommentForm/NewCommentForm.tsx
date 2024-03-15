import { useRef, useState } from "react";
import { IAuth, IComment } from "../../../services/Types";
import UserCard from "../../User/UserCard/UserCard";
import styles from "./NewCommentForm.module.scss";
import { IoSend } from "react-icons/io5";
import { AxiosError } from "axios";
import CommentService from "../../../services/CommentService";
import Spinner from "../../Spinner/Spinner";
import Error from "../../Error/Error";
import Success from "../../Success/Success";

interface NewCommentFormProps {
  auth: IAuth | null;
  postId: string;
  setCommentChange: (value: React.SetStateAction<boolean>) => void;
}

function NewCommentForm({ auth, postId, setCommentChange }: NewCommentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [success, setSuccess] = useState(false);
  const textRef = useRef<HTMLInputElement>(null);

  function handleCreateComment() {
    setLoading(true);

    const newComment: IComment = {
      ownerId: auth!.user.userId,
      postId: postId,
      text: textRef.current!.value,
    };

    const { request } = CommentService.createComment(newComment, auth!.accessToken);
    request
      .then((response) => {
        if (response.status === 201) {
          setLoading(false);
          setSuccess(true);
          setTimeout(() => {
            textRef.current!.value = "";
            setSuccess(false);
            setCommentChange(true);
          }, 1000);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }

  return (
    <div className={styles.newCommentContainer}>
      <UserCard userDetails={{ userId: auth!.user.userId, fullName: auth!.user.fullName, imageUrl: auth!.user.imageUrl }} size="small" />
      <input type="text" className={styles.newCommentInput} ref={textRef} />
      <div className={styles.btnContainer}>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Error message={error.response ? (error.response.data as string) : error.message} />
        ) : success ? (
          <Success message="" />
        ) : (
          <button className={styles.newCommentBtn} onClick={handleCreateComment}>
            <IoSend className={styles.newCommentBtnIcon} />
          </button>
        )}
      </div>
    </div>
  );
}

export default NewCommentForm;
