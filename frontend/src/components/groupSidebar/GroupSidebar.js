import React, { useContext, useState } from "react";
import "./groupSidebar.css";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import CreateIcon from "@material-ui/icons/Create";
import HomeIcon from "@material-ui/icons/Home";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function GroupSidebar({
  group,
  isGroupMember,
  handleLeave,
  handleJoin,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, sockio } = useContext(AuthContext);
  const [showInviteInput, setShowInviteInput] = useState(false);
  const [newImgLink, setNewImgLink] = useState(null);
  const [inviteError, setInviteError] = useState("");
  const [inviteNameInput, setInviteNameInput] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");
  const history = useHistory();

  const handleInviteButton = () => {
    showInviteInput ? setShowInviteInput(false) : setShowInviteInput(true);
  };

  const handleKeyDownInvite = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setInviteNameInput(inviteNameInput);
      if ((inviteNameInput.match(/^\s*\n*\t*$/) || []).length > 0) {
        console.log("invitation name is empty!");
        setInviteNameInput("");
      } else {
        console.log("trying to find user to invite...");
        try {
          const res = await axios.get("/api/users?username=" + inviteNameInput);
          if (res.status === 200 && group && res.data) {
            if (group.members.includes(res.data._id)) {
              setInviteError("User already in this group!");
            } else {
              const newNotification = {
                senderName: user.username,
                receiverId: res.data._id,
                invitationId: group._id,
                invitationName: group.groupName,
              };
              const notificationRes = await axios.post(
                "/api/notifications",
                newNotification
              );
              if (notificationRes.status === 200) {
                setInviteNameInput("");
                setInviteSuccess("Invitation sent!");
              } else {
                setInviteError("Server error. Unable to send notification");
              }
            }
          }
        } catch (err) {
          console.log(err);
          setInviteError("User not found!");
        }
      }
    }
  };

  const inviteComponent = (
    <div className="inviteComponentWrapper">
      <div className="inviteComponentContainer">
        <span className="inviteComponentText">Who do you want to invite?</span>
        <input
          className="inviteComponentInput"
          placeholder="Input name and Enter..."
          value={inviteNameInput}
          onChange={(e) => {
            setInviteNameInput(e.target.value);
            if (inviteError !== "") {
              setInviteError("");
            }
            if (inviteSuccess !== "") {
              setInviteSuccess("");
            }
          }}
          onKeyDown={handleKeyDownInvite}
        />
        <div className="inviteComponentErrorMessage">{inviteError}</div>
        <div className="inviteComponentSuccessMessage">{inviteSuccess}</div>
      </div>
    </div>
  );

  const handleClickGroupPicture = () => {
    if (user && group && user._id === group.creatorId) {
      alert("Close this dialogue and select image to upload");
      document.getElementById("groupImageUploadInput").click();
    } else {
      alert(
        "You must be logged in and be the creator of this group to change the group photo"
      );
    }
  };

  const handleUploadGroupImage = async (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      console.log(imageFile);
      try {
        const data = new FormData();
        data.append("file", imageFile);
        //upload picture to storage and get new filename
        const uploadFileRes = await axios.post("/api/upload/group", data);
        if (uploadFileRes.status === 200 && group) {
          const newGroupPicture = {
            groupImg: uploadFileRes.data.imagePath,
          };
          console.log(newGroupPicture);
          //update group in database
          const res = await axios.put(
            "/api/groups/" + group._id,
            newGroupPicture
          );
          if (res.status === 200) {
            setNewImgLink(uploadFileRes.data.imagePath);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleGroupHome = () => {
    if (group) {
      history.push("/groups/" + group._id + "/main");
    }
  };

  const handleMyPosts = () => {
    if (group) {
      history.push("/groups/" + group._id + "/myPosts");
    }
  };
  return (
    <div className="GroupSidebarWrapper">
      <CDBSidebar textColor="black" backgroundColor="#FFD68D">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <div className="groupProfileDiv">
            <img
              className="groupProfile"
              src={
                newImgLink
                  ? PF + newImgLink
                  : group?.groupImg
                  ? PF + group.groupImg
                  : PF + "group/noImageUploaded.png"
              }
              alt=""
              onClick={handleClickGroupPicture}
            />
            <input
              style={{ display: "none" }}
              type="file"
              id="groupImageUploadInput"
              accept="image/*"
              onChange={handleUploadGroupImage}
            />
          </div>
        </CDBSidebarHeader>
        <CDBSidebarHeader style={{ textAlign: "center" }}>
          <div className="groupNameWrapper">
            <div className="groupName">
              <span className="groupNameText">
                {group?.groupName ? group.groupName : "No Group Name"}
              </span>
            </div>
          </div>
          {isGroupMember ? (
            <div>
              <div className="groupInviteButtonWrapper">
                <div className="groupInviteButton" onClick={handleInviteButton}>
                  <span className="groupInviteButtonText">+ Invite</span>
                </div>

                {/* {showInviteInput ? inviteComponent : <></>} */}
              </div>
              <div>{showInviteInput ? inviteComponent : <></>}</div>
            </div>
          ) : (
            <div className="groupJoinButtonWrapper">
              <div className="groupJoinButton" onClick={handleJoin}>
                <span className="groupJoinButtonText">+ Join Group</span>
              </div>
            </div>
          )}
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <div className="groupDescriptionContainer">
              <div className="groupDescriptionHeader">Group Description:</div>
              <div className="groupDescriptionContent">
                {group?.description
                  ? group.description
                  : "This group creator has left no description of this group"}
              </div>
            </div>
            <CDBSidebarMenuItem
              className="groupMenuItem"
              onClick={handleGroupHome}
            >
              <HomeIcon className="groupMyPostsIcon" />
              <span className="groupMyPosts">Group Home</span>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem
              className="groupMenuItem"
              onClick={handleMyPosts}
            >
              {isGroupMember ? (
                <>
                  <CreateIcon className="groupMyPostsIcon" />
                  <span className="groupMyPosts">My Posts</span>
                </>
              ) : (
                <></>
              )}
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter>
          {isGroupMember ? (
            <div className="groupLeaveButtonWrapper">
              <div className="groupLeaveButton" onClick={handleLeave}>
                <span className="groupLeaveButtonText">Leave Group</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}
