import React, { useContext, useEffect, useState } from "react";
import "./group.css";
import TopBar from "../../components/topbar/TopBar";
import GroupSidebar from "../../components/groupSidebar/GroupSidebar";
import GroupSharePost from "../../components/groupSharePost/GroupSharePost";
import Post from "../../components/post/Post";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const testPost = {
  description:
    "Trading away my ultimate Gen 1 Eevee collection! PM or comment below for more details",
  likedBy: [],
  _id: "60f783855b6c5a0b147bd42d",
  groupId: "60f77ff618a99151cc4df876",
  postUserId: "60bf21abb893706a58752ecf",
  itemId: "60f784ab5b6c5a0b147bd42f",
  createdAt: "2021-07-21T02:16:37.937Z",
  updatedAt: "2021-07-21T02:16:37.937Z",
  __v: 0,
};

export default function Group() {
  const { user, sockio } = useContext(AuthContext);
  const groupId = useParams().groupId;
  const pageType = useParams().pageType;
  const [displayPosts, setDisplayPosts] = useState([]);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const getGroup = async () => {
      try {
        const res = await axios("/api/groups?groupId=" + groupId);
        await setGroup(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGroup();
  }, [groupId]);

  useEffect(() => {
    const getDisplayPosts = async () => {
      try {
        if (pageType === "main") {
          console.log("page type is main");
          const res = await axios("/api/posts/filter?groupId=" + groupId);
          await setDisplayPosts(res.data);
        } else if (pageType === "myPosts") {
          console.log("page type is myPosts");
          const res = await axios(
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

  return (
    <div>
      <div className="groupPageTop">
        <TopBar currentUser={user} />
      </div>
      <div className="groupPageContainer">
        <div className="groupSidebarWrapper">
          <GroupSidebar className="groupSidebarComponent" group={group} />
        </div>
        <div className="groupPageContainerRight">
          <div className="groupPagecontainerRightShareWrapper">
            <GroupSharePost />
          </div>
          {displayPosts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
