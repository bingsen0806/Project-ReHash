import React from 'react';
import "./userReview.css";
import { Card } from "react-bootstrap";

export default function UserReview() {
    return (
        <div>
            <Card style={{ width: '60em' }} className="userReviewContainer shadow p-3 mb-5 bg-white rounded">
            <div>
                <img className="userReviewProfile" src="/assests/EugeneTan.png" alt="" />
                <span className="userReviewName">Eugene Tan</span>
            </div>
           
            <div className="userReviewRatings">
                <span>Ratings:</span> 
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
            </div>
            
                <Card.Body>The user is so patient and I found the swap very worthwhile.</Card.Body>
            </Card> 
        </div>
    )
}
