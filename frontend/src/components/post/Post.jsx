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
import { useHistory } from "react-router-dom";

export default function Post({ post, handleDelete, canCommentAndLike }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const NO_AVATAR = process.env.REACT_APP_PUBLIC_FOLDER_NOAVATAR;
  const { user, sockio } = useContext(AuthContext);
  const [postUser, setPostUser] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [postItem, setPostItem] = useState(null);
  const [incomingComment, setIncomingComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [displayLikeCount, setDisplayLikeCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const getPostUser = async () => {
      try {
        const res = await axios.get("/api/users?userId=" + post?.postUserId);
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
        const res = await axios.get("/api/comments/filter?postId=" + post?._id);
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
        const res = await axios.get("/api/items?itemId=" + post?.itemId);
        await setPostItem(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPostItem();
  }, [post]);

  useEffect(() => {
    if (post) {
      setDisplayLikeCount(post.likedBy.length);
      if (user) {
        setLiked(post.likedBy.includes(user._id));
      } else {
        setLiked(false);
      }
    }
  }, [post, user]);

  //handles new comment when user press enter
  const handleKeyDownComment = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIncomingComment(incomingComment);
      if ((incomingComment.match(/^\s*\n*\t*$/) || []).length > 0) {
        console.log("comment is empty!");
        setIncomingComment("");
      } else {
        console.log("adding new comment...");
        const newComment = {
          postId: post._id,
          commentUserId: user._id,
          commentText: incomingComment,
        };
        try {
          setIncomingComment("");
          const res = await axios.post("/api/comments", newComment);
          await setPostComments([...postComments, res.data]);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  //handles the event when user clicks swapAway
  const handleSwapAway = async () => {
    if (!user) {
      history.push("/");
      console.log("pushed to login");
    } else {
      try {
        const res = await axios.get(
          "/api/conversations/find/" + user._id + "/" + post.postUserId
        );
        if (res.data.length > 0) {
          history.push("/chat/" + res.data[0]._id);
          console.log("pushed to chat id:" + res.data[0]._id);
          //just updating chatFollow below, need to put this before history.push if the chat uses chatFollow
          //but for now chat does not use chatFollow
          if (postUser && user) {
            try {
              const postUserObject = { userId: postUser._id };
              if (
                !user.chatFollow.includes(postUser._id) ||
                !postUser.chatFollow.includes(user._id)
              ) {
                await axios.put(
                  "/api/users/" + user._id + "/chatfollow",
                  postUserObject
                );
              }
            } catch (err) {
              console.log(err);
            }
          } else {
            const newConvo = await axios.post("/api/conversations", {
              members: [post.postUserId, user._id],
            });
            //chatFollow is not used for now
            history.push("/chat/" + newConvo._id); //likely works but needs to be tested
            const postUserObject = { userId: postUser._id };
            await axios.put(
              "/api/users/" + user._id + "/chatfollow",
              postUserObject
            ); //this also needs to be moved before history if chat page uses chatFollow
            console.log(newConvo.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  //handles like and dislike
  const handleDislike = async () => {
    if (canCommentAndLike) {
      setLiked(false);
      setDisplayLikeCount(displayLikeCount - 1);
      try {
        const res = await axios.put(
          "/api/posts/" + post._id + "/removeLike/" + user?._id
        );
        // if (res.status === 200) {
        // }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert(
        "You cannot dislike this post as you are either not logged in or not a member of this group!"
      );
    }
  };

  const handleLike = async () => {
    if (canCommentAndLike) {
      setLiked(true);
      setDisplayLikeCount(displayLikeCount + 1);
      try {
        const res = await axios.put(
          "/api/posts/" + post._id + "/addLike/" + user?._id
        );
        // if (res.status === 200) {
        // }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert(
        "You cannot like this post as you are either not logged in or not a member of this group!"
      );
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (commentId && commentId !== "") {
      try {
        const res = await axios.delete("/api/comments?commentId=" + commentId);
        if (res.status === 200) {
          setPostComments(postComments.filter((c) => c._id !== commentId));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleViewProfile = () => {
    if (postUser) {
      history.push("/profile/" + postUser.username + "/listings");
    }
  };

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
                    : NO_AVATAR
                }
                alt=""
                onClick={handleViewProfile}
              />
              <span className="postProfileText">
                {postUser?.username ? postUser.username : "No Name"}
              </span>
            </Col>
            <Col className="postTopContainerRight">
              {user && user._id === post.postUserId ? (
                <div className="deleteButtonWrapper">
                  <div
                    className="deleteButton"
                    onClick={() => handleDelete(post._id)}
                  >
                    <span className="deleteButtonText">Delete</span>
                  </div>
                </div>
              ) : (
                <div className="postSwapButtonWrapper">
                  <div className="postSwapButton" onClick={handleSwapAway}>
                    <TextsmsOutlinedIcon className="chatIcon" />
                    <span className="postSwapButtonText">Swap Away!</span>
                  </div>
                </div>
              )}
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
                {liked ? (
                  <FavoriteIcon onClick={handleDislike} />
                ) : (
                  <FavoriteBorderIcon onClick={handleLike} />
                )}
                <span className="numberLikes">{displayLikeCount}</span>
              </div>
              <div className="postMiddleItemComments">
                <ChatBubbleOutlineIcon />
                <span className="numberComments">{postComments.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="postBottom">
          {canCommentAndLike && (
            <div className="postCommentInputWrapper">
              <textarea
                value={incomingComment}
                onChange={(e) => setIncomingComment(e.target.value)}
                onKeyDown={handleKeyDownComment}
                maxlength="1000"
                className="postCommentInput"
                placeholder="Write a comment and press enter to send..."
              />
            </div>
          )}
          <div className="postCommentContentSection">
            {postComments.map((comment) => (
              <Comment
                commentId={comment._id}
                commentText={comment.commentText}
                commentUserId={comment.commentUserId}
                own={user && user._id === comment.commentUserId}
                handleDelete={handleDeleteComment}
                key={comment._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
