import axios from "axios";
import React, { useEffect, useState } from "react";
import "./comment.css";

export default function Comment({
  commentText,
  commentUserId,
  own,
  handleDelete,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [commentUser, setCommentUser] = useState(null);

  useEffect(() => {
    const getCommentUser = async () => {
      try {
        const res = await axios("/api/users?userId=" + commentUserId);
        await setCommentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCommentUser();
  }, [commentUserId]);

  return (
    <div className="commentWrapper">
      <div className="commentContainer">
        <div className="commentUserDetails">
          <img
            className="commentProfileImg"
            src={
              commentUser && commentUser.profilePicture
                ? PF + commentUser.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <span className="commentProfileText">
            {commentUser?.username ? commentUser.username : "No Name"}
          </span>
        </div>
        <div className="commentUserContent">{commentText}</div>
      </div>
    </div>
  );
}
