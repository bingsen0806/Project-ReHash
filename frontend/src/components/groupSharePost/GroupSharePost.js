import React from 'react';
import "./groupSharePost.css";
import { Row, Col } from 'react-bootstrap';

export default function GroupSharePost() {
    return (
        <div className="groupSharePostWrapper">
            <div className="groupSharePostContainer">
                <div className="sharePostTop">
                    <div className="sharePostTopContainer">
                        <img className="sharePostProfileImg" src="/assests/EugeneTan.png" alt=""/>
                        <span className="sharePostProfileText">Username here</span>
                    </div>
                </div>
                <div className="sharePostContainer">
                    <Row className="sharePostContainerWrapper">
                        <Col className="sharePostContainerLeft">
                            <input className="sharePostContainerInput" placeholder="Input your post ID..."/>
                        </Col>
                        <Col className="sharePostContainerRight">
                            <div className="sharePostButtonWrapper">
                                <div className="sharePostButton">
                                    <span className="sharePostButtonText">Post</span>
                                </div>
                            </div> 
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
