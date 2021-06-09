import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";

export default function Message({ message, own, pictureLink }) {
  const [displayTimeAgo, setDisplayTimeAgo] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (message) {
      setDisplayTimeAgo(format(message.createdAt));
    }
    const interval = setInterval(() => {
      if (displayTimeAgo !== format(message.createdAt)) {
        setDisplayTimeAgo(format(message.createdAt));
      }
      // console.log("This will run every second!");
    }, 60000);
    return () => clearInterval(interval);
  }, [message]);

  return own ? (
    <div className="messageOwn">
      <div className="messageTopOwn">
        <img className="messageImgOwn" src={pictureLink} alt="" />
        <p
          className="messageTextOwn"
          onClick={() => {
            setShow(!show);
          }}
        >
          {message.text}
        </p>
      </div>
      {show ? <div className="messageBottom">{displayTimeAgo}</div> : <></>}
    </div>
  ) : (
    <div className="message">
      <div className="messageTop">
        <img className="messageImg" src={pictureLink} alt="" />
        <p
          className="messageText"
          onClick={() => {
            setShow(!show);
          }}
        >
          {message.text}
        </p>
      </div>
      {show ? <div className="messageBottom">{displayTimeAgo}</div> : <></>}
    </div>
  );
}
