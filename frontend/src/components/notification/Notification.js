import React from "react";
import "./notification.css";
import { Row, Col } from "react-bootstrap";

export default function Notification({
  notification,
  handleAccept,
  handleDeny,
}) {
  return (
    <div className="notiWrapper">
      <div className="notiContainer">
        <span className="notiContainerUsername">
          {notification ? notification.senderName : "username"}
        </span>{" "}
        has invited you to join{" "}
        <span className="notiContainerGroupName">
          {notification ? notification.invitationName : "group name"}
        </span>
        .
      </div>
      <Row className="notibuttonGroupWrapper">
        <Col>
          <div
            className="acceptButtonWrapper"
            onClick={() => handleAccept(notification)}
          >
            <div className="acceptButton">
              <span className="acceptButtonText">Accept</span>
            </div>
          </div>
        </Col>
        <Col>
          <div
            className="denyButtonWrapper"
            onClick={() => handleDeny(notification)}
          >
            <div className="denyButton">
              <span className="denyButtonText">Deny</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
