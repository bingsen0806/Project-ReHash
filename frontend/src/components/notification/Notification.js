import React from "react";
import "./notification.css";
import { Row, Col } from "react-bootstrap";

export default function Notification({
  notification,
  handleAccept,
  handleDeny,
}) {
  const formatName = (senderArray) => {
    if (senderArray?.length && senderArray.length === 1) {
      return senderArray[0];
    } else if (senderArray?.length && senderArray.length === 2) {
      return senderArray[0] + " and 1 other";
    } else if (senderArray?.length) {
      return (
        senderArray[0] +
        " and " +
        (senderArray.length - 1).toString() +
        " others"
      );
    } else {
      return "No Name";
    }
  };
  //TODO: change senderName
  return (
    <div className="notiWrapper">
      <div className="notiContainer">
        <span className="notiContainerUsername">
          {notification ? formatName(notification.senderName) : "username"}
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
            onClick={() => {
              handleAccept(notification);
            }}
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
