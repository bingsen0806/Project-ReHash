import React, { useContext, useEffect, useState } from "react";
import "./review.css";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import UserReview from "../../components/userReview/UserReview";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const cheeseCakeReview = {
  _id: "60cb421ce5ae38aaf0c6ec7b",
  reviewerId: "60bf21abb893706a58752ecf",
  revieweeId: "60bf2195b893706a58752ece",
  rating: 4,
  reviewText:
    "The cheese baked rice session I attended was awesome! Punpun is very patient and handheld me throughout the whole session. I'm satisfied with my homemade cheese baked rice!",
  createdAt: "2021-06-17T12:37:48.610Z",
  updatedAt: "2021-06-17T12:37:48.610Z",
  __v: 0,
};

const punpunReviewBing = {
  _id: "60ca10cf56bca394fc060b94",
  reviewerId: "60bf2195b893706a58752ece",
  revieweeId: "60bf21abb893706a58752ecf",
  rating: 4,
  reviewText: "The user is very patient and I find the swap very worthwhile",
  createdAt: "2021-06-17T12:37:48.610Z",
  updatedAt: "2021-06-17T12:37:48.610Z",
  __v: 0,
};

export default function Review() {
  const { user, sockio } = useContext(AuthContext);
  const [profileUser, setProfileUser] = useState(null);
  const username = useParams().username;
  const [reviews, setReviews] = useState([]);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [myReview, setMyReview] = useState([]); //the review by the currentUser on the profileUser
  const [initialCumRating, setInitialCumRating] = useState(0);
  const [initialRatedBy, setInitialRatedBy] = useState(0);
  //get the profile user of this page
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
    console.log("user is changed");
    console.log(user);
  }, [user]);

  //get all the reviews of this profileUser
  useEffect(() => {
    console.log(user);
    const getReviews = async () => {
      const res = await axios.get(
        "/api/reviews/profileUser/" + profileUser._id
      );
      const filterMyReview = res.data.filter(
        //filter away reviews made by currentUser
        (review) => review.reviewerId !== user?._id
      );
      setReviews(filterMyReview);
      console.log(filterMyReview);
    };
    if (profileUser) {
      getReviews();
      setInitialCumRating(profileUser.cumulativeRating);
      setInitialRatedBy(profileUser.ratedByUsers);
    }
  }, [profileUser, user]);

  //set alreadyReviewed intially based on currentUser and profileUser
  useEffect(() => {
    const getAlreadyReviewed = async () => {
      if (!user || !profileUser || profileUser._id === user._id) {
        setAlreadyReviewed(true); //set to true so we cannot review the profileUser
      } else {
        const res = await axios.get(
          "/api/reviews/between/" + profileUser._id + "/" + user._id
        );
        if (res.data.length > 0) {
          setAlreadyReviewed(true);
          setMyReview(res.data);
          console.log(res.data);
        } else {
          setAlreadyReviewed(false);
        }
      }
    };
    getAlreadyReviewed();
  }, [profileUser, user]);

  //handleSubmit if a review is added
  const handleSubmit = async (reviewText, rating) => {
    if (!alreadyReviewed && rating > 0) {
      console.log("reviewText is: " + reviewText + "\n rating is: " + rating);
      const newReview = {
        reviewerId: user._id,
        revieweeId: profileUser._id,
        rating: rating,
        reviewText: reviewText,
      };
      const res = await axios.post("/api/reviews", newReview);
      setMyReview([...myReview, res.data]);
      setAlreadyReviewed(true);
      //also update ratings of profileUser
      const updateRatingRes = await axios.put("/api/users/" + profileUser._id, {
        cumulativeRating: initialCumRating + rating,
        ratedByUsers: initialRatedBy + 1,
      });
      setInitialCumRating(initialCumRating + rating);
      setInitialRatedBy(initialRatedBy + 1);
    }
  };

  //handleDelete if own rating is deleted
  const handleDelete = async (review) => {
    if (alreadyReviewed) {
      console.log(review);
      const res = await axios.delete("/api/reviews/id/" + review._id);
      console.log(res.status);
      console.log(typeof res.status);
      setMyReview([]);
      setAlreadyReviewed(false);
      const updateRatingRes = await axios.put("/api/users/" + profileUser._id, {
        cumulativeRating: initialCumRating - review.rating,
        ratedByUsers: initialRatedBy - 1,
      });
      setInitialCumRating(initialCumRating - review.rating);
      setInitialRatedBy(initialRatedBy - 1);
    }
  };

  return (
    <div>
      <TopBar currentUser={user} />
      <div className="userReviewsContainer">
        <SideBar sidebarUser={profileUser} />
        <div className="userReviewsRight">
          <Container className="userReviewsWrapper">
            <span className="userReviewsHeader">Reviews</span>
            {alreadyReviewed ? (
              <></>
            ) : (
              <UserReview
                className="userReview"
                doneReview={false}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
              />
            )}
            {myReview.map((review) => (
              <UserReview
                className="userReview"
                key={review._id}
                review={review}
                doneReview={true}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
              />
            ))}
            {reviews.map((review) => (
              <UserReview
                className="userReview"
                key={review._id}
                review={review}
                doneReview={true}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
              />
            ))}
          </Container>
        </div>
      </div>
    </div>
  );
}
