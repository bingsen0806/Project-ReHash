import React, { useContext, useEffect, useState } from "react";
import "./userlisting.css";
import { Row, Container } from "react-bootstrap";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import ItemListing from "../../components/itemListing/ItemListing";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";
import UserReview from "../../components/userReview/UserReview";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserListing() {
  const { user, sockio } = useContext(AuthContext); //this user is currentUser
  const username = useParams().username;
  // const subpage = useParams().subpage;
  const [displayItems, setDisplayItems] = useState([]);
  const [viewingCategory, setViewingCategory] = useState("tangibles");
  const [profileUser, setProfileUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    console.log("socket is: ", sockio?.id);
    console.log("username is: ", username);
    // console.log("subpage is:", subpage);
  }, [sockio, username]);

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
    const getDisplayItems = async () => {
      if (profileUser) {
        const res = await axios.get(
          "/api/items/categories?categoryName=" +
            viewingCategory +
            "&userId=" +
            profileUser._id
        );
        setDisplayItems(res.data);
        //console.log(res.data);
      }
    };
    getDisplayItems();
  }, [viewingCategory, profileUser]);

  const handleClickTangible = () => {
    setViewingCategory("tangibles");
    setTabValue(0);
  };

  const handleClickIntangible = () => {
    setViewingCategory("intangibles");
    setTabValue(1);
  };

  return (
    <div>
      <TopBar currentUser={user} />
      <div className="userlistingContainer">
        <SideBar className="sidebar" sidebarUser={profileUser} />

        <Container className="userlistingWrapper">
          <div className="tabBar">
            <Paper margin={200} style={{ marginBottom: "10px" }}>
              <Tabs
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Tangible" onClick={handleClickTangible} />
                <Tab label="Intangible" onClick={handleClickIntangible} />
              </Tabs>
            </Paper>
          </div>
          <Row className="listingRow" xs={1} md={3}>
            {displayItems.length ? (
              displayItems.map((item) => (
                <ItemListing key={item._id} item={item} />
              ))
            ) : (
              <div>User does not have any item in this category</div>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}
