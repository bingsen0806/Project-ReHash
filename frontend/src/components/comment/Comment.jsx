import { Divider } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./comment.css";

export default function Comment({
  commentId,
  commentText,
  commentUserId,
  own,
  handleDelete,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const NO_AVATAR = process.env.REACT_APP_PUBLIC_FOLDER_NOAVATAR;
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
                : NO_AVATAR
            }
            alt=""
          />
          <div className="commentProfileText">
            {commentUser?.username ? commentUser.username : "No Name"}
          </div>
          {own ? (
            <div
              className="commentDelete"
              onClick={() => handleDelete(commentId)}
            >
              delete
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="commentUserContent">{commentText}</div>
      </div>
    </div>
  );
}
