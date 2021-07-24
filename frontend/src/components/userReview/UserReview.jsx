import React, { useContext, useEffect, useState } from "react";
import "./userReview.css";
import { Card } from "react-bootstrap";
import Star from "../star/Star";
import RatingIcon from "../RatingIcon/RatingIcon";
import { AuthContext } from "../../context/AuthContext";
import { get } from "mongoose";
import axios from "axios";

export default function UserReview({
  review,
  doneReview,
  handleSubmit,
  handleDelete,
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const NO_AVATAR = process.env.REACT_APP_PUBLIC_FOLDER_NOAVATAR;
  const [reviewer, setReviewer] = useState(null);
  const [reviewText, setReviewText] = useState("");

  //set the reviewer
  useEffect(() => {
    const getReviewUser = async () => {
      const res = await axios.get("/api/users?userId=" + review.reviewerId);
      setReviewer(res.data);
    };
    if (review) {
      getReviewUser();
    }
  }, [review]);

  const onMouseEnter = (index) => {
    if (!doneReview) {
      setHoverRating(index);
      console.log("hover rating is: " + index);
    }
  };

  const onMouseLeave = () => {
    if (!doneReview) {
      setHoverRating(0);
    }
  };

  const onSaveRating = (index) => {
    if (!doneReview) {
      setRating(index);
      console.log("your rating is: " + index);
    }
  };

  return (
    <div className="userReview">
      <div className="userReviewTop">
        <img
          src={
            doneReview
              ? reviewer && reviewer.profilePicture
                ? PF + reviewer.profilePicture
                : NO_AVATAR
              : user && user.profilePicture
              ? PF + user.profilePicture
              : NO_AVATAR
          }
          alt=""
          className="userReviewImg"
        />
        <div className="userReviewTopMiddle">
          <div className="userReviewTopMiddleName">
            {doneReview
              ? reviewer?.username
              : user
              ? user.username
              : "Anonymous"}
          </div>
          <div className="userReviewTopMiddleRatings">
            <div className="userReviewTopMiddleRatingsText">Ratings: </div>
            <div className="userReviewRatingStars">
              {review
                ? [1, 2, 3, 4, 5].map((index) => {
                    return (
                      <RatingIcon
                        index={index}
                        rating={rating}
                        hoverRating={hoverRating}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onSaveRating={onSaveRating}
                        selected={review.rating >= index}
                        notSelected={review.rating < index}
                      />
                    );
                  })
                : [1, 2, 3, 4, 5].map((index) => {
                    return (
                      <RatingIcon
                        index={index}
                        rating={rating}
                        hoverRating={hoverRating}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onSaveRating={onSaveRating}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
        <div className="userReviewTopRight">
          {doneReview ? (
            review.reviewerId === user?._id ? (
              <button
                className="userReviewSubmitButton"
                onClick={() => handleDelete(review)}
              >
                Delete
              </button>
            ) : (
              <></>
            )
          ) : (
            <button
              className="userReviewSubmitButton"
              onClick={() => handleSubmit(reviewText, rating)}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <div className="userReviewBottom">
        {doneReview ? (
          <div className="userReviewedText">{review.reviewText}</div>
        ) : (
          <textarea
            placeholder="(Optional) Leave a review ..."
            className="userReviewInput"
            value={reviewText}
            maxlength="1999"
            onChange={(e) => setReviewText(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
