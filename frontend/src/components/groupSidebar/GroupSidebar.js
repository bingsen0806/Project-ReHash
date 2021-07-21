import React, { useState } from "react";
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

export default function GroupSidebar({
  group,
  isGroupMember,
  handleLeave,
  handleJoin,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [showInviteInput, setShowInviteInput] = useState(false);

  const handleInviteButton = () => {
    showInviteInput ? setShowInviteInput(false) : setShowInviteInput(true);
  };

  const inviteComponent = (
    <div className="inviteComponentWrapper">
      <div className="inviteComponentContainer">
        <span className="inviteComponentText">Who do you want to invite?</span>
        <input className="inviteComponentInput" placeholder="Input name..." />
      </div>
    </div>
  );

  /** TODO: 
   1. Add filter to search for groups 
   2. Allow update description for creator 
   */
  return (
    <div className="GroupSidebarWrapper">
      <CDBSidebar textColor="black" backgroundColor="#FFD68D">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <img
            className="groupProfile"
            src={
              group?.groupImg
                ? PF + group.groupImg
                : PF + "group/noImageUploaded.png"
            }
            alt=""
          />
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
          {/* Invite Button */}
          {/* <div className="groupInviteButtonWrapper">
                        <div className="groupInviteButton" >
                            <span className="groupInviteButtonText">+ Invite</span>
                        </div>
                    </div>  */}
          {/* Join Group Button */}
          {/* <div className="groupJoinButtonWrapper">
                        <div className="groupJoinButton">
                            <span className="groupJoinButtonText">+ Join Group</span>
                        </div>
                    </div>  */}
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <div className="groupDescriptionContainer">
              <div className="groupDescriptionHeader">Group Description:</div>
              <div className="groupDescriptionContent">
                {group?.description
                  ? group.description
                  : "This group creator has left no description of this group"}{" "}
              </div>
            </div>
            <CDBSidebarMenuItem className="groupMenuItem">
              <HomeIcon className="groupMyPostsIcon" />
              <span className="groupMyPosts">Group Home</span>{" "}
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem className="groupMenuItem">
              {isGroupMember ? (
                <>
                  <CreateIcon className="groupMyPostsIcon" />
                  <span className="groupMyPosts">My Posts</span>{" "}
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
