import Error from "../components/Error/Error";
import { Auth } from "../services/Types";

interface NewPostProps {
  auth:Auth|null;
}

function NewPost({auth}:NewPostProps) {
  return <div className="new-post">{auth ? <h3>New Post</h3> : <Error message="Please sign in" />}</div>;
}

export default NewPost