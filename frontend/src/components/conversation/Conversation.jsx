import "./conversation.css";

export default function Conversation() {
  return (
    <div className="conversation">
      <img src="/assests/EugeneTan.png" alt="" className="conversationImg" />
      <div className="conversationRight">
        <span className="conversationName">John Cena</span>
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
