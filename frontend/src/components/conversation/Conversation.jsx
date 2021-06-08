import "./conversation.css";

export default function Conversation({ active }) {
  return (
    <div
      className={active ? "conversation conversationActive" : "conversation"}
    >
      <div className="conversationLeft">
        <img src="/assests/EugeneTan.png" alt="" className="conversationImg" />
        <div className="conversationBadge"></div>
      </div>

      <div className="conversationRight">
        <div className="conversationRightTop">
          <div className="conversationName">John Cenda</div>
          <div className="conversationStatus">1 hour ago</div>
        </div>

        <span className="conversationLastMsg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
          consequatur sint odit, harum distinctio recusandae suscipit alias
          repellat consectetur laborum commodi corporis ut sapiente laudantium
          ullam laboriosam exercitationem? Minima, voluptatem?
        </span>
      </div>
    </div>
  );
}
