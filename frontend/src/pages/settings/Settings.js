import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./settings.css";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import { Container, Card, Form, Button, Col, Row } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Settings() {
  const { user, sockio } = useContext(AuthContext);
  const username = useParams().username;
  const [profileUser, setProfileUser] = useState(null);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const getProfileUser = async () => {
      if (username) {
        const res = await axios.get("/users?username=" + username);
        setProfileUser(res.data);
        console.log("profileUser is: " + res.data);
      }
    };
    getProfileUser();
  }, [username]);

  const onSubmit = (data) => {
    console.log(data);
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [profileImg, setProfileImg] = useState("/assests/userProfile.png");
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //Need to change this file to update useContext
  return (
    <div>
      <TopBar src={profileImg} />
      <div className="settingsContainer">
        <SideBar sidebarUser={profileUser} />
        <span className="settingsHeader">Settings</span>
        <Container className="settingsWrapper">
          <Card
            style={{ width: "60em", height: "22em" }}
            className="settingsUserProfileContainer shadow p-3 mb-5 bg-white rounded"
          >
            <span className="settingsUserProfileHeader">User Profile</span>
            <Container>
              <Row>
                <Col>
                  <img src={profileImg} alt="" className="userProfileImg" />
                </Col>
                <Col>
                  <div className="settingsImgInstructions">
                    <span>
                      Upload a profile picture of yourself to help others know
                      more about you!
                    </span>
                    <input
                      className="imgUploadButton"
                      type="file"
                      name="image-upload"
                      id="input"
                      accept="image/*"
                      onChange={imageHandler}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </Card>
          <Card
            style={{ width: "60em" }}
            className="settingsPasswordContainer shadow p-3 mb-5 bg-white rounded"
          >
            <span className="settingsPasswordHeader">Password</span>
            <div className="passwordInputWrapper">
              <Form.Control
                className="passwordInput mb-3"
                name="currentPassword"
                type={passwordShown ? "text" : "password"}
                placeHolder="Current Password"
                ref={register()}
              />

              <Form.Control
                className="passwordInput"
                name="newPassword"
                type={passwordShown ? "text" : "password"}
                placeHolder="New Password"
                ref={register()}
              />
            </div>
            <div>
              <input type="checkbox" onClick={togglePasswordVisibility} />
              <label className="checkboxLabel">Show input</label>
            </div>
            <div>
              <Button
                className="passwordButton"
                type="submit"
                variant="warning"
                onClick={handleSubmit(onSubmit)}
              >
                Update password
              </Button>
              <Button
                className="passwordButton"
                type="submit"
                variant="outline-warning"
                onClick={handleSubmit(onSubmit)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </Container>
      </div>
    </div>
  );
}
