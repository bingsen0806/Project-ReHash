import React, { useContext, useEffect, useState } from "react";
import "./swapAway.css";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import { TextsmsOutlined } from "@material-ui/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function SwapAway({ itemUserId }) {
  //if delete, go back to listings page
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const NO_AVATAR = process.env.REACT_APP_PUBLIC_FOLDER_NOAVATAR;
  const [itemUser, setItemUser] = useState(null);
  const history = useHistory();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getItemUser = async () => {
      if (itemUserId) {
        const res = await axios.get("/api/users?userId=" + itemUserId);
        setItemUser(res.data);
        console.log("itemUser is: " + res.data);
      }
    };
    getItemUser();
  }, [itemUserId]);

  const handleSwapAway = async () => {
    if (!user) {
      history.push("/");
      console.log("pushed to login");
    } else {
      try {
        const res = await axios.get(
          "/api/conversations/find/" + user._id + "/" + itemUserId
        );
        if (res.data.length > 0) {
          history.push("/chat/" + res.data[0]._id);
          console.log("pushed to chat id:" + res.data[0]._id);
          //just updating chatFollow below, need to put this before history.push if the chat uses chatFollow
          //but for now chat does not use chatFollow
          if (itemUser && user) {
            try {
              const itemUserObject = { userId: itemUser._id };
              if (
                !user.chatFollow.includes(itemUser._id) ||
                !itemUser.chatFollow.includes(user._id)
              ) {
                await axios.put(
                  "/api/users/" + user._id + "/chatfollow",
                  itemUserObject
                );
              }
            } catch (err) {
              console.log(err);
            }
          }
        } else {
          const newConvo = await axios.post("/api/conversations", {
            members: [itemUserId, user._id],
          });
          if (newConvo.status === 200) {
            //chatFollow is not used for now
            history.push("/chat/" + newConvo.data._id); //likely works but needs to be tested
            const itemUserObject = { userId: itemUser._id };
            await axios.put(
              "/api/users/" + user._id + "/chatfollow",
              itemUserObject
            ); //this also needs to be moved before history if chat page uses chatFollow
            console.log(newConvo.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Alert className="swapAwayPrompt">
        <Container>
          <Row>
            <Col sm={2}>
              <img
                className="swapAwayUserImg"
                src={
                  itemUser && itemUser.profilePicture
                    ? PF + itemUser.profilePicture
                    : NO_AVATAR
                }
                onClick={() => {
                  itemUser &&
                    history.push("/profile/" + itemUser.username + "/listings");
                }}
                alt=""
              />
            </Col>
            <Col sm={10}>
              <Alert.Heading
                className="swapAwayUsername"
                style={{ fontSize: "1rem" }}
              >
                {itemUser ? itemUser.username : ""}
              </Alert.Heading>
            </Col>
          </Row>
        </Container>

        <Button
          className="swapAwayButton"
          variant="warning"
          onClick={handleSwapAway}
        >
          <div className="swapAwayButtonTextGroup">
            <TextsmsOutlined />
            <span className="swapAwayButtonText">Swap Away!</span>
          </div>
        </Button>
      </Alert>
    </div>
  );
}
