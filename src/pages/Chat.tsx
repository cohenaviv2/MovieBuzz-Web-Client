import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import Error from "../components/Error/Error";
import { IAuth, IMessage, IUserChat } from "../services/Types";
import UserService from "../services/UserService";
import UserCard from "../components/User/UserCard/UserCard";
import styles from "../components/User/Chat/Chat.module.scss";
import { FaCircle } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import MessageService from "../services/MessageService";

interface ChatProps {
  auth: IAuth | null;
}

function Chat({ auth }: ChatProps) {
  const [onlineUsers, setOnlineUsers] = useState<IUserChat[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState("");
  const [receiverUserChat, setReceiverUserChat] = useState<IUserChat | null>(null);
  const [senderUserChat, setSenderUserChat] = useState<IUserChat | null>(null);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket>();
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!auth) return;
    const userId = auth.user.userId;
    socketRef.current = io(import.meta.env.VITE_BASE_URL, {
      query: {
        userId: userId,
      },
    });
    socketRef.current.emit("connect_user", userId);

    socketRef.current.on("private_message_received", (data: { message: IMessage }) => {
      console.log("received message:");
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    socketRef.current.on("userDisconnected", (data: { disconnectedUserId: string }) => {
      console.log("User disconnected:", data.disconnectedUserId);
    });

    setConnected(true);

    return () => {
      socketRef.current?.disconnect();
    };
  }, [auth]);

  useEffect(() => {
    if (!auth) return;
    const { request } = UserService.getOnlineUsers(auth.accessToken);
    request.then((response) => {
      console.log(response.data);
      const myUserChat = response.data.find((uc) => uc._id === auth.user.userId)!;
      setSenderUserChat(myUserChat);
      console.log(senderUserChat);
      const filteredOnlineUsers = response.data.filter((uc) => uc._id !== auth.user.userId);
      setOnlineUsers(filteredOnlineUsers);
      console.log(receiverUserChat);
    });
  }, [auth]);

  useEffect(() => {
    if (!auth || !receiverUserChat) return;
    const { request, cancel } = MessageService.getConversation(auth.accessToken, receiverUserChat._id);
    request
      .then((response) => {
        console.log("conversation: ", response.data);
        setMessages(response.data);
      })
      .catch((err) => {
        console.log("fetch conversation err: ", err);
      });

    return () => cancel();
  }, [receiverUserChat]);

  const sendMessage = () => {
    if (auth && receiverUserChat) {
      if (message && receiverUserChat && connected) {
        socketRef.current!.emit("send_private_message", senderUserChat, receiverUserChat, message);
        setMessage("");
        textRef.current!.value = "";
      }
    }
  };

  function handleUserClick(userChat: IUserChat) {
    setReceiverUserChat(userChat);
  }

  if (!auth) {
    return (
      <div className="chat">
        <Error message="Please sign in" />
      </div>
    );
  }

  return (
    <div className="chat">
      <h2>Chat</h2>
      <div className={styles.chatContainer}>
        <div className={styles.userCardContainer}>
          {onlineUsers &&
            onlineUsers.map((user, index) => (
              <div className={styles.userCard} key={index} onClick={() => handleUserClick(user)}>
                <FaCircle className={styles.userCardIcon} />
                <UserCard userDetails={{ userId: user._id!, fullName: user.fullName, imageUrl: user.imageUrl }} size="small" />
              </div>
            ))}
        </div>
        <div className={styles.messageContainer}>
          <div className={styles.conversationContainer}>
            {messages &&
              auth &&
              messages.map((msg, index) => (
                <div key={index} className={auth.user.userId == msg.senderId ? styles.sentMsgBar : styles.receiveMsgBar}>
                  {msg.text}
                </div>
              ))}
          </div>
          <div className={styles.sendMsgContainer}>
            <input type="text" className={styles.newMsgInput} onChange={(e) => setMessage(e.target.value)} ref={textRef} placeholder="Type something..." />
            <button className={styles.newMsgBtn} onClick={sendMessage}>
              <IoSend className={styles.newMsgBtnIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
