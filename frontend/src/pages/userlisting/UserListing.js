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
import { CircularProgress } from "@material-ui/core";

export default function UserListing() {
  const { user, sockio } = useContext(AuthContext); //this user is currentUser
  const username = useParams().username;
  const viewCategory = useParams().viewingCategory;
  // const subpage = useParams().subpage;
  const [displayItems, setDisplayItems] = useState([]);
  const [viewingCategory, setViewingCategory] = useState("tangibles");
  const [profileUser, setProfileUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [isChangingTab, setIsChangingTab] = useState(false);

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
    if (viewCategory && viewCategory.length > 0) {
      setViewingCategory(viewCategory);
      setTabValue(viewCategory === "tangibles" ? 0 : 1);
    }
  }, [viewCategory]);

  useEffect(() => {
    const getDisplayItems = async () => {
      if (profileUser) {
        try {
          setIsChangingTab(true);
          const res = await axios.get(
            "/api/items/categories?categoryName=" +
              viewingCategory +
              "&userId=" +
              profileUser._id
          );
          setDisplayItems(res.data);
          setIsChangingTab(false);
          //console.log(res.data);
        } catch (err) {
          setIsChangingTab(false);
          console.log(err);
        }
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
        <div className="userListingsRight">
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
            {isChangingTab ? (
              <div className="userListingLoading">
                <CircularProgress color="primary" size="48px" />
              </div>
            ) : (
              <Row className="listingRow" xs={1} sm={2} md={2} lg={3}>
                {displayItems.length ? (
                  displayItems.map((item) => (
                    <ItemListing key={item._id} item={item} />
                  ))
                ) : (
                  <div>User does not have any item in this category</div>
                )}
              </Row>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
}
