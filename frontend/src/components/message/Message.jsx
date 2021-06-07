import "./message.css";
import { format } from "timeago.js";

export default function Message({ own }) {
  return own ? (
    <div className="message">
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://raw.githubusercontent.com/safak/youtube/chat-app/client/public/assets/person/2.jpeg"
          alt=""
        />
        <p className="messageText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
          deleniti molestiae iure fugiat exercitationem nulla necessitatibus
          esse laudantium eveniet! Dolorum atque veritatis fugiat saepe suscipit
          numquam ducimus veniam perspiciatis consequuntur!
        </p>
      </div>
      <div className="messageBottom">{format(Date.now())}</div>
    </div>
  ) : (
    <div className="messageOwn">
      <div className="messageTop">
        <p className="messageTextOwn">Fake one</p>
        <img
          className="messageImgOwn"
          src="https://raw.githubusercontent.com/safak/youtube/chat-app/client/public/assets/person/2.jpeg"
          alt=""
        />
      </div>
      <div className="messageBottom">{format(Date.now())}</div>
    </div>
  );
}
