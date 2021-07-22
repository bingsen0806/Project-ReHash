import React, { useContext, useEffect, useState } from "react";
import "./myGroups.css";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import GroupIcon from "../../components/groupIcon/GroupIcon";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MyGroups() {
  const { user, sockio } = useContext(AuthContext); //this user is currentUser
  const username = useParams().username;
  const [profileUser, setProfileUser] = useState(null);
  const [myGroups, setMyGroups] = useState([]);

  useEffect(() => {
    const getProfileUser = async () => {
      if (username) {
        const res = await axios.get("/api/users?username=" + username);
        setProfileUser(res.data);
        console.log("profileUser is: " + res.data);
      }
    };
    getProfileUser();
  }, [username]);

  useEffect(() => {
    const getMyGroups = async () => {
      if (profileUser) {
        const res = await axios.get(
          "/api/groups/filter?userId=" + profileUser._id
        );
        setMyGroups(res.data);
      }
    };
    getMyGroups();
  }, [profileUser]);

  return (
    <div>
      <div className="myGroupsPageTopSection">
        <TopBar currentUser={user} />
      </div>
      <div className="myGroupsPageMiddleSection">
        <SideBar className="sidebar" sidebarUser={profileUser} />
        <div className="myGroupsPageMiddleSectionRight">
          <div className="myGroupsPageMiddleSectionRightHeader">
            <span className="myGroupsPageMiddleSectionRightHeaderText">
              Groups You Have Joined
            </span>
            <div className="myGroupsPageGroupIconWrapper">
              <Row
                className="myGroupsPageGroupIconContainer"
                xl={5}
                lg={4}
                md={3}
                xs={2}
              >
                <Col>
                  <GroupIcon groupImg="group/add.jpg" create={true} />
                </Col>
                {myGroups.map((group) => (
                  <Col key={group._id}>
                    <GroupIcon
                      groupImg={group.groupImg}
                      groupName={group.groupName}
                      groupId={group._id}
                    />
                  </Col>
                ))}
                {myGroups.map((group) => (
                  <Col key={group._id}>
                    <GroupIcon
                      groupImg={group.groupImg}
                      groupName={group.groupName}
                      groupId={group._id}
                    />
                  </Col>
                ))}
                {myGroups.map((group) => (
                  <Col key={group._id}>
                    <GroupIcon
                      groupImg={group.groupImg}
                      groupName={group.groupName}
                      groupId={group._id}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
