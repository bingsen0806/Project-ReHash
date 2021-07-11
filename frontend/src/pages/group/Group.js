import React from 'react';
import "./group.css";
import TopBar from "../../components/topbar/TopBar";
import GroupSidebar from '../../components/groupSidebar/GroupSidebar';
import GroupSharePost from "../../components/groupSharePost/GroupSharePost";
import Post from '../../components/post/Post';

export default function Group() {
    return (
        <div>
            <div className="groupPageTop">
                <TopBar />
            </div>
            <div className="groupPageContainer">
                <div className="groupSidebarWrapper">
                    <GroupSidebar className="groupSidebarComponent"/>
                </div>
                <div className="groupPageContainerRight">
                    <div className="groupPagecontainerRightShareWrapper">
                        <GroupSharePost />
                    </div>
                    <Post /> 
                </div>
            </div>
        </div>
    )
}
