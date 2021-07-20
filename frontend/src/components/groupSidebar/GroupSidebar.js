import React, { useState } from 'react';
import "./groupSidebar.css"
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from "cdbreact";
import CreateIcon from '@material-ui/icons/Create';

export default function GroupSidebar() {
    const [ isGroupMember, setIsGroupMember ] = useState(true);
    const [ showInviteInput, setShowInviteInput ] = useState(false);
    const handleInviteButton = () => {
        showInviteInput ? setShowInviteInput(false) : setShowInviteInput(true);
    }
    const inviteComponent = 
        <div className="inviteComponentWrapper">
            <div className="inviteComponentContainer">
                <span className="inviteComponentText">Who do you want to invite?</span>
                <input className="inviteComponentInput" placeholder="Input name..."/>
            </div>
        </div>

    return (
        <div className="GroupSidebarWrapper">
            <CDBSidebar textColor="black" backgroundColor="#FFD68D">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <img className="groupProfile" src="assests/Legobricks.jpg" alt=""/>
                </CDBSidebarHeader>
                <CDBSidebarHeader style={{ textAlign: "center" }}>
                    <div className="groupNameWrapper">
                        <div className="groupName">
                            <span className="groupNameText">Group Name Here</span>
                        </div>
                    </div>
                    { isGroupMember ? 
                        <div>
                            <div className="groupInviteButtonWrapper">
                                <div className="groupInviteButton" onClick={handleInviteButton}>
                                    <span className="groupInviteButtonText">+ Invite</span>
                                </div>
                            
                                {/* {showInviteInput ? inviteComponent : <></>} */}
                            
                            </div>
                            <div>
                                {showInviteInput ? inviteComponent : <></>}
                            </div>
                        </div>
                         
                    : 
                    <div className="groupJoinButtonWrapper">
                        <div className="groupJoinButton">
                            <span className="groupJoinButtonText">+ Join Group</span>
                        </div>
                    </div> 
                    }
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
                            group description goes here. you can describe anything you want I am tring this out to test how the description will overflow. I think this looks ok?
                        </div>
                        <CDBSidebarMenuItem className="groupMenuItem">
                            <CreateIcon className="groupMyPostsIcon"/>
                            <span className="groupMyPosts">My Posts</span>
                        </CDBSidebarMenuItem>
                    </CDBSidebarMenu>
                </CDBSidebarContent>
                <CDBSidebarFooter>
                    <div className="groupLeaveButtonWrapper">
                        <div className="groupLeaveButton">
                            <span className="groupLeaveButtonText">Leave Group</span>
                        </div>
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    )
}
