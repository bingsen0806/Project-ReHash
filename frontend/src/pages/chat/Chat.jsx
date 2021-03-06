import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import TopBar from "../../components/topbar/TopBar";
import "./chat.css";
import axios from "axios";
import { format } from "timeago.js";
import { useHistory, useParams } from "react-router-dom";

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentChatWith, setCurrentChatWith] = useState(null);
  const [currentChatWithLastActive, setCurrentChatWithLastActive] =
    useState("");

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const NO_AVATAR = process.env.REACT_APP_PUBLIC_FOLDER_NOAVATAR;

  const scrollRef = useRef();
  const initialActiveConvoId = useParams().initialActiveConvoId;
  const { user, sockio } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const getInitialActiveConvo = async () => {
      if (initialActiveConvoId !== "0") {
        console.log("initialActiveConvoId is: " + initialActiveConvoId);
        const res = await axios.get(
          "/api/conversations/id/" + initialActiveConvoId
        );
        setCurrentChat(res.data);
      }
    };
    getInitialActiveConvo();
  }, [initialActiveConvoId]);

  useEffect(() => {
    console.log("socket is: ", sockio?.id);
    if (sockio) {
      sockio.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }
  }, [sockio]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (sockio && user) {
      sockio.on("getUsers", (users) => {
        console.log("getUser received on client side");
        console.log(users);
        // setOnlineUsers(
        //   user.chatFollow.filter((f) => users.some((u) => u.userId === f))
        // );
        setOnlineUsers(users.map((user) => user.userId));
      });
    }
  }, [user, sockio]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        if (searchText && searchText.length >= 3 && user) {
          const res = await axios.get(
            "/api/conversations/search/" +
              user._id +
              "/searchText?searchText=" +
              searchText
          );
          if (res.status === 200) {
            setConversations(res.data);
          }
        } else if (user) {
          const res = await axios.get(
            "/api/conversations/search/" + user._id + "/searchText"
          );
          if (res.status === 200) {
            setConversations(res.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user, messages, onlineUsers, searchText]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChatWith = async () => {
      if (currentChat) {
        try {
          const friendId = currentChat?.members.find((m) => m !== user._id);
          const res = await axios.get("/api/users?userId=" + friendId);
          await setCurrentChatWith(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getCurrentChatWith();
  }, [user, currentChat]);

  useEffect(() => {
    const updateLastActive = async () => {
      var timeago = "";
      try {
        if (currentChatWith) {
          const res = await axios.get(
            "/api/users?userId=" + currentChatWith?._id
          );
          const newLastActive = res.data.lastActive;
          console.log("newLastActive: ", newLastActive);
          timeago = format(newLastActive);
          console.log("LOOK AT ME: TIMEAGO ", timeago);
        }
      } catch (err) {
        timeago = format(currentChatWith?.lastActive);
        console.log(err);
      }
      setCurrentChatWithLastActive("Active " + timeago);
    };

    updateLastActive();
    const interval = setInterval(() => {
      updateLastActive();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentChatWith]);

  //handles the event that the "send" button is clicked
  const handleSendMessage = async (e) => {
    if (newMessage !== "") {
      e.preventDefault();
      await setNewMessage("");
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };

      try {
        const res = await axios.post("/api/messages", message);

        const lastMessageText = res.data.text;
        const lastMessageTime = res.data.createdAt;
        const updateRes = await axios.put(
          "/api/conversations/" + currentChat._id + "/lastmessage",
          { lastMessageText: lastMessageText, lastMessageTime: lastMessageTime }
        );
        console.log(updateRes);
        console.log("currentChat is: ", currentChat);
        await setMessages([...messages, res.data]);
        console.log(
          "updated messages. the new messaged sent is: ",
          res.data.text
        );

        const receiverId = currentChat.members.find(
          (member) => member !== user._id
        );
        // console.log("sockio id right before emitting: " + sockio.id);
        sockio.emit("sendMessage", {
          senderId: user._id,
          receiverId: receiverId,
          text: newMessage,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("new message when eneter is pressed: ", newMessage);
      setNewMessage(newMessage);
      if (newMessage !== "") {
        handleSendMessage(e);
        console.log("passing to handleSendMessage");
      }
    }
  };

  const handleViewProfile = () => {
    history.push("/profile/" + currentChatWith.username + "/listings");
  };

  const handleGenerateAgreement = async () => {
    console.log("generate agreement is clicked");
    const res = await axios.post("/api/agreements");
    if (res.data && res.data._id) {
      setNewMessage("Your agreement code has been generated: " + res.data._id);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        (searchText.match(/^\s*\n*\t*$/) || []).length > 0 ||
        searchText.length < 3
      ) {
        console.log("searchText is empty");
      } else if (user) {
        try {
          const res = await axios.get(
            "/api/conversations/search/" +
              user._id +
              "/searchText?searchText=" +
              searchText
          );
          if (res.status === 200) {
            setConversations(res.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <div>
      <TopBar currentUser={user} />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search for users (at least 3 characters)..."
              className="chatMenuInput"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearch}
              value={searchText}
            />
            {conversations.map((c) => {
              const userId = c.members.find((m) => m !== user._id);
              return (
                <div onClick={() => setCurrentChat(c)} key={c._id}>
                  <Conversation
                    key={c._id}
                    online={onlineUsers.includes(userId)}
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
                          : NO_AVATAR
                      }
                      alt=""
                      className="chatBoxHeaderImg"
                    />
                    <div className="chatBoxHeaderContent">
                      <div className="chatBoxHeaderName">
                        {currentChatWith?.username}
                      </div>
                      <div className="chatBoxHeaderStatus">
                        {onlineUsers.includes(currentChatWith?._id)
                          ? "Online now"
                          : currentChatWithLastActive}
                      </div>
                    </div>
                  </div>
                  <button
                    className="chatBoxViewProfileButton"
                    onClick={handleViewProfile}
                  >
                    View Profile
                  </button>
                </div>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message
                        message={m}
                        key={m._id}
                        own={m.sender === user?._id}
                        pictureLink={
                          m.sender === user?._id
                            ? user?.profilePicture
                              ? PF + user.profilePicture
                              : NO_AVATAR
                            : currentChatWith?.profilePicture
                            ? PF + currentChatWith.profilePicture
                            : NO_AVATAR
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
                    onKeyDown={handleKeyDown}
                  ></textarea>
                  <button
                    className="chatAgreementButton"
                    onClick={handleGenerateAgreement}
                  >
                    Generate Agreement
                  </button>
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
