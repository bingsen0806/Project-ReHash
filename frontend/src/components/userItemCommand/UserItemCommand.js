import React, { useEffect, useState } from "react";
import "./userItemCommand.css";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

export default function UserItemCommand({ itemUserId }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [itemUser, setItemUser] = useState(null);
  useEffect(() => {
    const getItemUser = async () => {
      if (itemUserId) {
        const res = await axios.get("/users?userId=" + itemUserId);
        setItemUser(res.data);
        console.log("itemUser is: " + res.data);
      }
    };
    getItemUser();
  }, [itemUserId]);
  return (
    <div>
      <Alert className="userItemCommandPrompt">
        <Container>
          <Row>
            <Col sm={2}>
              <img
                className="userItemCommandUserImg"
                src={
                  itemUser && itemUser.profilePicture
                    ? PF + itemUser.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Col>
            <Col sm={10}>
              <Alert.Heading
                className="userItemCommandUsername"
                style={{ fontSize: "1rem" }}
              >
                {itemUser ? itemUser.username : "Anonymous"}
              </Alert.Heading>
            </Col>
          </Row>
          <div className="buttonWrapper">
            <div>
              <Button className="button" variant="warning">
                <EditIcon className="icons" />
                <span className="action">Edit Swap</span>
              </Button>
            </div>
            <div>
              <Button className="button" variant="warning">
                <VerifiedUserIcon className="icons" />
                <span className="action">Mark as Reserve</span>
              </Button>
            </div>
            <div>
              <Button className="button" variant="warning">
                <ShoppingBasketIcon className="icons" />
                <span className="action">Mark as Swapped</span>
              </Button>
            </div>
            <div>
              <Button className="button" variant="warning">
                <HighlightOffIcon className="icons" />
                <span className="action">Delete</span>
              </Button>
            </div>
          </div>
        </Container>
      </Alert>
    </div>
  );
}
