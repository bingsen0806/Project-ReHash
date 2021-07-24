import React, { useContext, useState } from "react";
import "./groupSharePost.css";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function GroupSharePost({ handleAdd }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const NO_AVATAR = process.env.REACT_APP_PUBLIC_FOLDER_NOAVATAR;
  const { user, sockio } = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [itemId, setItemId] = useState("");
  const [itemError, setItemError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handlePost = async () => {
    if ((itemId.match(/^\s*\n*\t*$/) || []).length > 0) {
      setItemError("Item ID cannot be empty!");
      return;
    }
    if ((description.match(/^\s*\n*\t*$/) || []).length > 0) {
      setDescriptionError("Description cannot be empty!");
      return;
    }
    console.log("itemId: " + itemId);
    console.log("description: " + description);
    try {
      const findItemRes = await axios.get("/api/items?itemId=" + itemId);
      if (!findItemRes.data) {
        setItemError("Item with given Item ID does not exist!");
        return;
      }
      if (!user || findItemRes.data.userId !== user._id) {
        setItemError("Item with given ID does not belong to you!");
        return;
      }
      const itemIdTemp = itemId;
      const descriptionTemp = description;
      setItemId("");
      setDescription("");
      handleAdd(itemIdTemp, descriptionTemp);
    } catch (err) {
      console.log(err);
      setItemError("Item with given Item ID does not exist!");
    }
  };

  return (
    <div className="groupSharePostWrapper">
      <div className="groupSharePostContainer">
        <div className="sharePostTop">
          <div className="sharePostTopContainer">
            <img
              className="sharePostProfileImg"
              src={user?.profilePicture ? PF + user.profilePicture : NO_AVATAR}
              alt=""
            />
            <span className="sharePostProfileText">
              {user?.username ? user.username : "No Name"}
            </span>
          </div>
        </div>
        <div className="sharePostContainer">
          <div className="sharePostContainerWrapper">
            <div className="sharePostContainerTop">
              <div className="sharePostContainerItemId">
                <input
                  value={itemId}
                  onChange={(e) => {
                    setItemId(e.target.value);
                    if (itemError !== "") {
                      setItemError("");
                    }
                  }}
                  className="sharePostContainerItemIdInput"
                  placeholder="Input your post ID..."
                />
                <span className="sharePostContainerErrorMessage">
                  {itemError}
                </span>
              </div>
              <div className="sharePostButton" onClick={handlePost}>
                Post
              </div>
            </div>
            <div className="sharePostContainerTextArea">
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (descriptionError !== "") {
                    setDescriptionError("");
                  }
                }}
                className="sharePostContainerTextAreaInput"
                placeholder="Describe your post..."
              />
              <span className="sharePostContainerErrorMessage">
                {descriptionError}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
