import Error from "../components/Error/Error";
import { IAuth } from "../services/Types";

interface ChatProps {
  auth: IAuth | null;
}
function Chat({ auth }: ChatProps) {
  return <div className="chat">{auth ? <h3>Chat</h3> : <Error message="Please sign in" />}</div>;
}

export default Chat;
