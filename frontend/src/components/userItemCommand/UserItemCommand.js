import React, { useEffect, useState } from "react";
import "./userItemCommand.css";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

export default function UserItemCommand({
  itemUserId,
  itemStatus,
  handleReserve,
  handleUnreserve,
  handleSwap,
  handleUnswap,
  handleDelete,
  inProgress,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const NO_AVATAR = process.env.REACT_APP_PUBLIC_FOLDER_NOAVATAR;
  const [itemUser, setItemUser] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

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

  const handleKeyDownSwap = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("user pressed enter key and the value is: " + input);
      if (input !== "") {
        console.log("input is not empty");
        try {
          const res = await axios.get("/api/agreements?id=" + input);
          if (!res || res.status !== 200 || !res.data) {
            console.log("Error 1");
            setError("Agreement does not exist!");
          } else if (
            res.data.parties.length >= 2 ||
            res.data.items.length >= 2
          ) {
            console.log("Error 2");
            setError("This agreement id already involves 2 parties or 2 items");
          } else {
            handleSwap(res.data._id);
            setInput("");
            setShowInput(false);
          }
        } catch (err) {
          console.log("Error 1");
          setError("Agreement does not exist!");
        }
      } else {
        console.log("input empty!");
        setError("Agreement code cannot be empty!");
      }
    }
  };

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
                className="userItemCommandUsername"
                style={{ fontSize: "1rem" }}
              >
                {itemUser ? itemUser.username : "Anonymous"}
              </Alert.Heading>
            </Col>
          </Row>
          <div className="buttonWrapper">
            {itemStatus === "waiting" ? (
              <div>
                <Button
                  className="button"
                  variant="warning"
                  onClick={handleReserve}
                  disabled={inProgress}
                >
                  <VerifiedUserIcon className="icons" />
                  {inProgress ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    <span className="action">Mark as Reserve</span>
                  )}
                </Button>
              </div>
            ) : itemStatus === "reserved" ? (
              <div>
                <Button
                  className="button"
                  variant="warning"
                  onClick={handleUnreserve}
                  disabled={inProgress}
                >
                  <VerifiedUserIcon className="icons" />
                  {inProgress ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    <span className="action">Unreserve</span>
                  )}
                </Button>
              </div>
            ) : (
              <></>
            )}
            <div>
              {itemStatus === "deleted" ? (
                <></>
              ) : itemStatus === "swapped" ? (
                <Button
                  className="button"
                  variant="warning"
                  onClick={handleUnswap}
                  disabled={inProgress}
                >
                  <ShoppingBasketIcon className="icons" />
                  {inProgress ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    <span className="action">Cancel Agreement</span>
                  )}
                </Button>
              ) : (
                <>
                  <Button
                    className="button"
                    variant="warning"
                    disabled={inProgress}
                  >
                    <ShoppingBasketIcon className="icons" />
                    {inProgress ? (
                      <CircularProgress color="white" size="20px" />
                    ) : (
                      <span
                        className="action"
                        onClick={() => setShowInput(!showInput)}
                      >
                        Mark as Swapped
                      </span>
                    )}
                  </Button>
                  {showInput ? (
                    <Form className="userItemCommandForm">
                      <Form.Group controlId="title">
                        <Form.Control
                          className="userItemCommandFormControl"
                          type="input"
                          maxlength="30"
                          placeholder="Enter your agreement code"
                          value={input}
                          onChange={(e) => {
                            setInput(e.target.value);
                            setError("");
                            console.log("changed to: " + e.target.value);
                          }}
                          onKeyDown={handleKeyDownSwap}
                          isInvalid={error !== ""}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>

            <div>
              {itemStatus === "deleted" || itemStatus === "swapped" ? (
                <></>
              ) : (
                <Button
                  className="button"
                  variant="warning"
                  onClick={handleDelete}
                  disabled={inProgress}
                >
                  <HighlightOffIcon className="icons" />
                  {inProgress ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    <span className="action">Delete</span>
                  )}
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Alert>
    </div>
  );
}
