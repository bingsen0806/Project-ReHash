import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  return own ? (
    <div className="messageOwn">
      <div className="messageTopOwn">
        <img
          className="messageImgOwn"
          src="https://raw.githubusercontent.com/safak/youtube/chat-app/client/public/assets/person/2.jpeg"
          alt=""
        />
        <p className="messageTextOwn">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  ) : (
    <div className="message">
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://raw.githubusercontent.com/safak/youtube/chat-app/client/public/assets/person/2.jpeg"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
