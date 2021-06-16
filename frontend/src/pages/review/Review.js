import React, { useContext, useEffect, useState } from "react";
import "./review.css";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import UserReview from "../../components/userReview/UserReview";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Review() {
  const { user, sockio } = useContext(AuthContext);
  const [profileUser, setProfileUser] = useState(null);
  const username = useParams().username;
  useEffect(() => {
    const getProfileUser = async () => {
      if (username) {
        const res = await axios.get("/users?username=" + username);
        setProfileUser(res.data);
        console.log("profileUser is: " + res.data);
      }
    };
    getProfileUser();
  }, [username]);
  return (
    <div>
      <TopBar currentUser={user} />
      <div className="userReviewsContainer">
        <SideBar sidebarUser={profileUser} />
        <span className="userReviewsHeader">Reviews</span>
        <Container className="userReviewsWrapper">
          <UserReview className="userReview" />
          <UserReview className="userReview" />
          <UserReview className="userReview" />
          <UserReview className="userReview" />
        </Container>
      </div>
    </div>
  );
}
