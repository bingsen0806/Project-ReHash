import React, { useContext, useEffect, useState } from "react";
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
import { storage } from "../../firebase";

export default function GroupSidebar({
  group,
  isGroupMember,
  handleLeave,
  handleJoin,
  handleUpdateGroup,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const NO_GROUP_IMAGE = process.env.REACT_APP_PUBLIC_FOLDER_NOIMAGEUPLOADED;
  const { user, sockio } = useContext(AuthContext);
  const [showInviteInput, setShowInviteInput] = useState(false);
  const [newImgLink, setNewImgLink] = useState(null);
  const [inviteError, setInviteError] = useState("");
  const [inviteNameInput, setInviteNameInput] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");
  const [editedDescription, setEditedDescription] = useState(""); //the text to be shown in the textarea during edit of description
  const [editMode, setEditMode] = useState(false);
  const [descriptionError, setDescriptionError] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (group) {
      setEditedDescription(
        group.description + "(Delete this and press 'Enter' when done editing)"
      );
    }
  }, [group]);

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
              //get the notification with this group and user first
              const getNotiRes = await axios.get(
                "/api/notifications/filter?userId=" +
                  res.data._id +
                  "&invitationId=" +
                  group._id
              );
              //If notification exist, check if the notification senderNames contain current user, setError if yes, update notification otherwise
              if (getNotiRes.status === 200 && getNotiRes.data.length > 0) {
                if (getNotiRes.data[0].senderName.includes(user.username)) {
                  setInviteError(
                    "User previously invited and has not responded!"
                  );
                } else {
                  const updateNotiRes = await axios.put(
                    "/api/notifications/" +
                      getNotiRes.data[0]._id +
                      "/addSender/" +
                      user.username
                  );
                  if (updateNotiRes.status === 200) {
                    setInviteNameInput("");
                    setInviteSuccess("Invitation sent!");
                  } else {
                    setInviteError("Server error. Unable to send notification");
                  }
                }
              } else {
                //Else if notification does not exist, do the below
                const newNotification = {
                  senderName: [user.username],
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
          }
        } catch (err) {
          console.log(err);
          setInviteError("User not found!");
        }
      }
    }
  };

  const handleKeyDownDescription = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditedDescription(editedDescription);
      if ((editedDescription.match(/^\s*\n*\t*$/) || []).length > 0) {
        console.log("editedDescription is empty!");
        setDescriptionError("Description cannot be empty!");
        return;
      }
      if (editedDescription.length > 200) {
        setDescriptionError("Description cannot exceed 200 characters!");
        return;
      }
      try {
        const newGroupDescription = {
          description: editedDescription,
        };
        //update group in database
        const res = await axios.put(
          "/api/groups/" + group._id,
          newGroupDescription
        );
        if (res.status === 200) {
          setEditMode(false);
          handleUpdateGroup(res.data);
        }
      } catch (err) {
        console.log(err);
        setDescriptionError("Server error: unable to update!");
        setEditMode(false);
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
          maxLength="30"
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
        // const data = new FormData();
        // data.append("file", imageFile);
        //upload picture to storage and get new filename
        // const uploadFileRes = await axios.post("/api/upload/group", data);
        // if (uploadFileRes.status === 200 && group) {
        //   const newGroupPicture = {
        //     groupImg: uploadFileRes.data.imagePath,
        //   };
        //   console.log(newGroupPicture);
        //   //update group in database
        //   const res = await axios.put(
        //     "/api/groups/" + group._id,
        //     newGroupPicture
        //   );
        //   if (res.status === 200) {
        //     setNewImgLink(uploadFileRes.data.imagePath);
        //   }
        // }

        //newly added

        const imageFileName = Date.now() + imageFile.name;
        console.log("filename is: " + imageFileName);
        const uploadTask = storage.ref(`group/${imageFileName}`).put(imageFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log("progress is: " + progress.toString());
          },
          (error) => {
            console.log(error);
          },
          async () => {
            //get download url and upload the post info
            const imageUrl = await storage
              .ref("group")
              .child(`${imageFileName}`)
              .getDownloadURL();
            const trimImageUrl = imageUrl.replace(PF, "");
            console.log(trimImageUrl);
            const newGroupPicture = {
              groupImg: trimImageUrl,
            };

            console.log(newGroupPicture);
            //update group in database
            const res = await axios.put(
              "/api/groups/" + group._id,
              newGroupPicture
            );
            if (res.status === 200) {
              const tempNewImgLink = newImgLink;
              setNewImgLink(trimImageUrl);
              //delete the picture only if new picture successfully registered in database
              if (
                (tempNewImgLink && tempNewImgLink !== "") ||
                (group && group.groupImg !== "")
              ) {
                try {
                  var oldImageRef;
                  if (tempNewImgLink && tempNewImgLink !== "") {
                    console.log("taking newImgLink");
                    oldImageRef = storage.refFromURL(PF + tempNewImgLink);
                  } else {
                    console.log("taking groupImg link");
                    oldImageRef = storage.refFromURL(PF + group.groupImg);
                  }
                  await oldImageRef.delete();
                } catch (error) {
                  console.log(error);
                }
              }
            }
          }
        );
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
                  ? PF + newImgLink //removed PF for now
                  : group?.groupImg
                  ? PF + group.groupImg
                  : NO_GROUP_IMAGE
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
              <div className="groupDescriptionHeader">
                <div className="groupDescriptionHeaderText">
                  Group Description:
                </div>
                {user && group && user._id === group.creatorId && !editMode ? (
                  <div
                    className="groupDescriptionHeaderEdit"
                    onClick={() => setEditMode(true)}
                  >
                    edit
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {editMode ? (
                <>
                  <textarea
                    className="groupDescriptionTextArea"
                    rows={6}
                    value={editedDescription}
                    onChange={(e) => {
                      if (descriptionError !== "") {
                        setDescriptionError("");
                      }
                      setEditedDescription(e.target.value);
                    }}
                    onKeyDown={handleKeyDownDescription}
                  />
                  <div className="groupDescriptionError">
                    {descriptionError}
                  </div>
                </>
              ) : (
                <div className="groupDescriptionContent">
                  {group?.description
                    ? group.description
                    : "This group creator has left no description of this group"}
                </div>
              )}
            </div>
            <CDBSidebarMenuItem
              className="groupMenuItem"
              onClick={handleGroupHome}
            >
              <HomeIcon className="groupMyPostsIcon" />
              <span className="groupMyPosts">Group Home</span>
            </CDBSidebarMenuItem>
            {isGroupMember ? (
              <CDBSidebarMenuItem
                className="groupMenuItem"
                onClick={handleMyPosts}
              >
                <CreateIcon className="groupMyPostsIcon" />
                <span className="groupMyPosts">My Posts</span>
              </CDBSidebarMenuItem>
            ) : (
              <></>
            )}
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
