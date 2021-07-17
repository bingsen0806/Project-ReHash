import React from 'react';
import "./notification.css";
import { Row, Col } from "react-bootstrap";

export default function Notification() {
    return (
        <div className="notiWrapper">
            <div className="notiContainer">
                <span className="notiContainerUsername">username</span> has invited you to join <span className="notiContainerGroupName">LegoBricks enthusiasts</span>!
            </div>
            <Row className="notibuttonGroupWrapper">
                <Col>
                    <div className="acceptButtonWrapper">
                        <div className="acceptButton">
                            <span className="acceptButtonText">Accept</span>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="denyButtonWrapper">
                        <div className="denyButton">
                            <span className="denyButtonText">Deny</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
