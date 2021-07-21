import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import { Row, Col } from "react-bootstrap";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ItemListing from "../itemListing/ItemListing";
import Comment from "../comment/Comment";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, sockio } = useContext(AuthContext);
  const [postUser, setPostUser] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [postItem, setPostItem] = useState(null);

  useEffect(() => {
    const getPostUser = async () => {
      try {
        const res = await axios("/api/users?userId=" + post?.postUserId);
        await setPostUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPostUser();
  }, [post]);

  useEffect(() => {
    const getPostComments = async () => {
      try {
        const res = await axios("/api/comments/filter?postId=" + post?._id);
        await setPostComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPostComments();
  }, [post]);

  useEffect(() => {
    const getPostItem = async () => {
      try {
        const res = await axios("/api/items?itemId=" + post?.itemId);
        await setPostItem(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPostItem();
  }, [post]);

  return (
    <div className="postWrapper">
      <div className="postContainer">
        <div className="postTop">
          {/* <div className="postTopContainer"> */}
          <Row className="postTopContainerWrapper">
            <Col className="postTopContainerLeft">
              <img
                className="postProfileImg"
                src={
                  postUser && postUser.profilePicture
                    ? PF + postUser.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              <span className="postProfileText">
                {postUser?.username ? postUser.username : "No Name"}
              </span>
            </Col>
            <Col className="postTopContainerRight">
              {/* Swap Away Button */}
              <div className="postSwapButtonWrapper">
                <div className="postSwapButton">
                  <TextsmsOutlinedIcon className="chatIcon" />
                  <span className="postSwapButtonText">Swap Away!</span>
                </div>
              </div>
              {/* Delete Button */}
              {/* <div className="deleteButtonWrapper">
                                    <div className="deleteButton">
                                        <span className="deleteButtonText">Delete</span>
                                    </div>
                                </div> */}
            </Col>
          </Row>
          {/* </div> */}
        </div>
        <div className="postMiddle">
          <div className="postMiddleDescription">
            <div className="postMiddleDescriptionContainer">
              {post?.description
                ? post.description
                : "No description available"}
            </div>
          </div>
          <div className="postMiddleItemListing">
            <ItemListing item={postItem} inPost={true} />
          </div>
          <div className="postMiddleItemLikesComments">
            <div className="postMiddleItemLikesCommentsContainer">
              <div className="postMiddleItemLikes">
                <FavoriteIcon />
                <span className="numberLikes">
                  {post?.likedBy ? post.likedBy.length : 0}
                </span>
              </div>
              <div className="postMiddleItemComments">
                <ChatBubbleOutlineIcon />
                <span className="numberComments">{postComments.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="postBottom">
          <div className="postCommentInputWrapper">
            <input
              className="postCommentInput"
              placeholder="Write a comment..."
            />
          </div>
          <div className="postCommentContentSection">
            {postComments.map((comment) => (
              <Comment
                commentText={comment.commentText}
                commentUserId={comment.commentUserId}
                key={comment._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
