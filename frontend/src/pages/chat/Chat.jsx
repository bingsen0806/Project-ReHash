import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import TopBar from "../../components/topbar/TopBar";
import "./chat.css";
import axios from "axios";
import { format } from "timeago.js";

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentChatWith, setCurrentChatWith] = useState(null);
  const [currentChatWithLastActive, setCurrentChatWithLastActive] =
    useState("");

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const scrollRef = useRef();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getConversations = async () => {
      try {
        //need to change this and add another API when search function is implemented
        const res = await axios.get("/conversations/" + user._id);
        await setConversations(res.data);
        console.log(conversations);
        // console.log(user);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id, messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const friendId = currentChat?.members.find((m) => m !== user._id);

    const getCurrentChatWith = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        await setCurrentChatWith(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentChatWith();
  }, [user, currentChat]);

  useEffect(() => {
    const updateLastActive = () => {
      const timeago = format(currentChatWith?.lastActive);
      if (timeago.includes("second") || timeago.includes("now")) {
        setCurrentChatWithLastActive("Online");
      } else {
        setCurrentChatWithLastActive("Active " + timeago);
      }
    };

    updateLastActive();
    const interval = setInterval(() => {
      if (currentChatWithLastActive !== format(currentChatWith?.lastActive)) {
        updateLastActive();
      }
      // console.log("This will run every second!");
    }, 60000);
    return () => clearInterval(interval);
  }, [currentChatWith]);

  //handles the event that the "send" button is clicked
  const handleSendMessage = async (e) => {
    if (newMessage !== "") {
      e.preventDefault();
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };
      try {
        const res = await axios.post("/messages", message);

        const lastMessageText = res.data.text;
        const lastMessageTime = res.data.createdAt;
        const updateRes = await axios.put(
          "/conversations/" + currentChat._id + "/lastmessage",
          { lastMessageText: lastMessageText, lastMessageTime: lastMessageTime }
        );
        console.log(updateRes);
        console.log("currentChat is: ", currentChat);
        await setMessages([...messages, res.data]);
        console.log(
          "updated messages. the new messaged sent is: ",
          res.data.text
        );
        await setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);
  return (
    <div>
      <TopBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search for users"
              className="chatMenuInput"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
            {conversations.map((c) => {
              const userId = c.members.find((m) => m !== user._id);
              console.log("userId", userId);
              return (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation
                    online={true}
                    lastMessageText={c.lastMessageText}
                    lastMessageTime={c.lastMessageTime}
                    userId={userId}
                    active={currentChat ? c._id === currentChat._id : false}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxHeader">
                  <div className="chatBoxHeaderLeft">
                    <img
                      src={
                        currentChatWith?.profilePicture
                          ? PF + currentChatWith.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                      className="chatBoxHeaderImg"
                    />
                    <div className="chatBoxHeaderContent">
                      <div className="chatBoxHeaderName">
                        {currentChatWith?.username}
                      </div>
                      <div className="chatBoxHeaderStatus">
                        {currentChatWithLastActive}
                      </div>
                    </div>
                  </div>
                  <button className="chatBoxViewProfileButton">
                    View Profile
                  </button>
                </div>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        message={m}
                        own={m.sender === user._id}
                        pictureLink={
                          m.sender === user._id
                            ? user?.profilePicture
                              ? PF + user.profilePicture
                              : PF + "person/noAvatar.png"
                            : currentChatWith?.profilePicture
                            ? PF + currentChatWith.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write a message ..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
