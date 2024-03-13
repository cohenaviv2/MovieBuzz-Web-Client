import Error from "../components/Error/Error";
import NewPostForm from "../components/Post/NewPostForm/NewPostForm";
import { IAuth } from "../services/Types";

export interface NewPostProps {
  auth: IAuth | null;
}

function NewPost({ auth }: NewPostProps) {
  return <div className="new-post">{auth ? <NewPostForm newPostProps={{ auth }} /> : <Error message="Please sign in" />}</div>;
}

export default NewPost;
