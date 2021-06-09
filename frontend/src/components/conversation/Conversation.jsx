import { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";
import { format } from "timeago.js";

export default function Conversation({
  active,
  userId,
  lastMessageText,
  lastMessageTime,
  online,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [displayTimeAgo, setDisplayTimeAgo] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(
      "lastMessageText updated. the new message is: ",
      lastMessageText
    );
  }, [lastMessageText]);

  useEffect(() => {
    if (lastMessageTime) {
      setDisplayTimeAgo(format(lastMessageTime));
    }
    const interval = setInterval(() => {
      if (lastMessageTime) {
        if (displayTimeAgo !== format(lastMessageTime)) {
          setDisplayTimeAgo(format(lastMessageTime));
        }
      }

      // console.log("This will run every second!");
    }, 60000);
    return () => clearInterval(interval);
  }, [lastMessageTime]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + userId);
        await setUser(res.data);
        console.log("successfully got user");
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userId]);

  return (
    <div
      className={active ? "conversation conversationActive" : "conversation"}
    >
      <div className="conversationLeft">
        <img
          src={
            user?.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
          className="conversationImg"
        />
        {online ? <div className="conversationBadge"></div> : <></>}
      </div>

      <div className="conversationRight">
        <div className="conversationRightTop">
          <div className="conversationName">{user?.username}</div>
          <div className="conversationStatus">{displayTimeAgo}</div>
        </div>

        <span className="conversationLastMsg">{lastMessageText}</span>
      </div>
    </div>
  );
}
