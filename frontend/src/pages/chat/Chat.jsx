import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import TopBar from "../../components/topbar/TopBar";
import "./chat.css";

export default function Chat() {
  return (
    <div>
      <TopBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for users" className="chatMenuInput" />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write a message.."
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
