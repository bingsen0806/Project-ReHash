import React, { useContext, useEffect, useState } from "react";
import "./group.css";
import TopBar from "../../components/topbar/TopBar";
import GroupSidebar from "../../components/groupSidebar/GroupSidebar";
import GroupSharePost from "../../components/groupSharePost/GroupSharePost";
import Post from "../../components/post/Post";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Group() {
  const { user, sockio } = useContext(AuthContext);
  const groupId = useParams().groupId;
  const pageType = useParams().pageType;
  const [displayPosts, setDisplayPosts] = useState([]);
  const [group, setGroup] = useState(null);
  const [isGroupMember, setIsGroupMember] = useState(false); //set to false for now
  const history = useHistory();
  //TODO: move isGroupMember state here? function to update leave group or join group

  useEffect(() => {
    const getGroup = async () => {
      try {
        const res = await axios.get("/api/groups?groupId=" + groupId);
        await setGroup(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGroup();
  }, [groupId]);

  useEffect(() => {
    if (group && user) {
      setIsGroupMember(group.members.includes(user._id));
    }
  }, [group, user]);

  useEffect(() => {
    const getDisplayPosts = async () => {
      try {
        if (pageType === "main") {
          console.log("page type is main");
          const res = await axios.get("/api/posts/filter?groupId=" + groupId);
          await setDisplayPosts(res.data);
        } else if (pageType === "myPosts") {
          console.log("page type is myPosts");
          const res = await axios.get(
            "/api/posts/filter?groupId=" + groupId + "&userId=" + user?._id
          );
          await setDisplayPosts(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getDisplayPosts();
  }, [pageType, groupId, user]);

  //passed into Post component to delete post
  const handleDelete = async (postId) => {
    try {
      console.log("deleting post with id: " + postId); //60f7f6e319807816605c790c
      const res = await axios.delete("/api/posts?postId=" + postId);
      if (res.status === 200) {
        console.log(res.data.message);
        setDisplayPosts(displayPosts.filter((post) => post._id !== postId));
        await axios.delete("/api/comments/filter?postId=" + postId); //delete all comments of this post from database at last to avoid waiting
      }
    } catch (err) {
      console.log(err);
    }
  };

  //passed into GroupSharePost component to add post
  const handleAdd = async (itemId, description) => {
    try {
      if (group && user) {
        const newPost = {
          groupId: group._id,
          postUserId: user._id,
          description: description,
          itemId: itemId,
        };
        console.log(newPost);
        const res = await axios.post("/api/posts", newPost);
        if (res.status === 200) {
          setDisplayPosts([res.data, ...displayPosts]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //passed into GroupSideBar to change isGroupMember and update database
  const handleLeave = async () => {
    //try without updating the group
    try {
      if (group && user) {
        const res = await axios.put(
          "/api/groups/" + group._id + "/removeMember/" + user._id
        );
        if (res.status === 200) {
          setIsGroupMember(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleJoin = async () => {
    try {
      if (!user) {
        history.push("/");
      }
      if (group && user) {
        const res = await axios.put(
          "/api/groups/" + group._id + "/addMember/" + user._id
        );
        if (res.status === 200) {
          setIsGroupMember(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="groupPageTop">{/* <TopBar currentUser={user} /> */}</div>
      <div className="groupPageContainer">
        <div className="groupSidebarWrapper">
          <GroupSidebar
            className="groupSidebarComponent"
            group={group}
            isGroupMember={isGroupMember}
            handleLeave={handleLeave}
            handleJoin={handleJoin}
          />
        </div>
        <div className="groupPageContainerRight">
          <div className="groupPagecontainerRightShareWrapper">
            {group && user && isGroupMember && pageType === "main" ? (
              <GroupSharePost handleAdd={handleAdd} />
            ) : (
              <></>
            )}
          </div>
          {displayPosts.map((post) => (
            <Post
              post={post}
              key={post._id}
              handleDelete={handleDelete}
              canCommentAndLike={group && user && isGroupMember}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
