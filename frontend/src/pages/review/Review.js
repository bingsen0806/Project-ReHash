import React from 'react';
import "./review.css";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import UserReview from "../../components/userReview/UserReview";
import { Container, Col } from "react-bootstrap";

export default function Review() {
    return (
        <div>
            <TopBar />
            <div className="userReviewsContainer">
                <SideBar />
                <span className="userReviewsHeader">Reviews</span>
                <Container className="userReviewsWrapper">
                    <UserReview className="userReview"/>
                    <UserReview className="userReview"/>
                    <UserReview className="userReview"/>
                    <UserReview className="userReview"/>
                </Container>
                
            </div>
        </div>
    )
}
