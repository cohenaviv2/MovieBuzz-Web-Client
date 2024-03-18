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

interface IOClient {
  _id: string;
  socketId: string;
  fullName: string;
}

function Chat({ auth }: ChatProps) {
  const [onlineUsers, setOnlineUsers] = useState<IUserChat[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState("");
  const [receiverUserChat, setReceiverUserChat] = useState<IUserChat | null>(null);
  const [senderUserChat, setSenderUserChat] = useState<IUserChat | null>(null);
  const socketRef = useRef<Socket>();
  const textRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auth) return;
    const userId = auth.user.userId;
    socketRef.current = io(import.meta.env.VITE_BASE_URL, {
      query: {
        userId: userId,
      },
    });
    socketRef.current.emit("connect_user", userId);

    socketRef.current.on("private_message_received", (data: { message: IMessage; sender: IOClient }) => {
      console.log("received message:");
      console.log(data);
      const { _id, fullName, socketId } = data.sender;
      setReceiverUserChat({ _id: _id, fullName: fullName, socketId: socketId, imageUrl: "" });
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    socketRef.current.on("userDisconnected", (data: { disconnectedUserId: string }) => {
      console.log("User disconnected:", data.disconnectedUserId);
    });

    return () => {
      socketRef.current!.disconnect();
    };
  }, [auth]);

  useEffect(() => {
    if (!auth) return;

    const timeoutId = setTimeout(refreshOnlineUsers, 2000);
    // refreshOnlineUsers();

    return () => clearTimeout(timeoutId);
  }, [auth, senderUserChat, receiverUserChat,message,onlineUsers]);

  function refreshOnlineUsers() {
    const { request } = UserService.getOnlineUsers(auth!.accessToken);
    request.then((response) => {
      const onlineUsers: IUserChat[] = response.data;
      const myId = auth!.user.userId;
      const senderId = senderUserChat?._id;
      const receiverId = receiverUserChat?._id;

      if (!senderId) {
        const myUserChat = onlineUsers.find((uc) => uc._id === myId)!;
        setSenderUserChat(myUserChat);
      }
      if (receiverId) {
        const newReceiverChat = onlineUsers.find((uc) => uc.fullName === receiverUserChat.fullName)!;
        if (receiverUserChat.socketId !== newReceiverChat.socketId) {
          setReceiverUserChat(newReceiverChat);
          console.log("receiver new details: ", newReceiverChat);
        }
      }

      const filteredOnlineUsers = response.data.filter((uc) => uc._id !== myId);
      setOnlineUsers(filteredOnlineUsers);

      console.log("users refreshed !");
    });
  }

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
    if (auth && socketRef && receiverUserChat && message && senderUserChat) {
      socketRef.current!.emit("send_private_message", senderUserChat, receiverUserChat, message);
      setMessage("");
      textRef.current!.value = "";

      // Append the sent message to the conversation
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderId: senderUserChat._id,
          receiverId: receiverUserChat._id,
          text: message,
        },
      ]);
    } else {
      console.log("no auth && socketRef && receiverUserChat && message && senderUserChat");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  function handleUserClick(userChat: IUserChat) {
    setReceiverUserChat(userChat);
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent default behavior of Enter key
      sendMessage(); // Call sendMessage function when Enter key is pressed
    }
  };

  if (!auth) {
    return (
      <div className="chat">
        <Error message="Please sign in" />
      </div>
    );
  }

  return (
    <div className="chat">
      <h2 style={{ margin: "0" }}>Chat</h2>
      <div className={styles.chatContainer}>
        <div className={styles.userCardContainer}>
          {onlineUsers &&
            (onlineUsers.length > 0 ? (
              onlineUsers.map((user, index) => (
                <div className={receiverUserChat && user._id == receiverUserChat._id ? styles.userCardSelected : styles.userCard} key={index} onClick={() => handleUserClick(user)}>
                  <FaCircle className={styles.userCardIcon} />
                  <UserCard userDetails={{ userId: user._id!, fullName: user.fullName, imageUrl: user.imageUrl }} size="small" />
                </div>
              ))
            ) : (
              <div className={styles.userErrContainer}>
                <Error message="no users online" />
              </div>
            ))}
        </div>
        <div className={styles.messageContainer}>
          <div className={styles.conversationContainer} ref={chatContainerRef}>
            {messages &&
              auth &&
              messages.map((msg, index) => (
                <div key={index} className={styles.msgBarContainer}>
                  {auth.user.userId === msg.senderId ? (
                    <>
                      <h3 className={styles.sentMsgBar}>{msg.text}</h3>
                      <img className={styles.imgMsgBar} src={senderUserChat?.imageUrl} alt="user" />
                    </>
                  ) : (
                    <>
                      <img className={styles.imgMsgBar} src={receiverUserChat?.imageUrl} alt="user" />
                      <h3 className={styles.receiveMsgBar}>{msg.text}</h3>
                    </>
                  )}
                </div>
              ))}
          </div>
          <div className={styles.sendMsgContainer}>
            <input type="text" className={styles.newMsgInput} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyPress} ref={textRef} placeholder="Type something..." />
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
