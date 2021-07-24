import React, { useContext, useEffect, useState } from "react";
import "./settings.css";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import { Container, Card, Form, Button, Col, Row } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { storage } from "../../firebase";
import { CircularProgress } from "@material-ui/core";

export default function Settings() {
  const { user, sockio, dispatch } = useContext(AuthContext);
  const username = useParams().username;
  const [imgFile, setImgFile] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const EMPTY_USER_PROFILE = process.env.REACT_APP_PUBLIC_FOLDER_USERPROFILE;

  const [form, setForm] = useState({ showPassword: false });
  const [errors, setErrors] = useState({});
  const [imgError, setImgError] = useState({});
  const [passwordUpdateValid, setPasswordUpdateValid] = useState(false);

  const [isUpdatingPicture, setIsUpdatingPicture] = useState(false);
  const [isUpdatingPassword, setisUpdatingPassword] = useState(false);

  useEffect(() => {
    console.log("user is changed");
    console.log(user);
  }, [user]);

  const imageHandler = (e) => {
    const newFile = Object.assign(e.target.files[0], {
      preview: URL.createObjectURL(e.target.files[0]),
    });
    setImgFile(newFile);
    if (newFile && imgError.imgFile) {
      setImgError({ imgFile: null });
    }
    console.log(newFile.preview);
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (imgFile) {
        URL.revokeObjectURL(imgFile.preview);
      }
    },
    [imgFile]
  );

  const handleChangePicture = async (e) => {
    e.preventDefault();
    if (!imgFile) {
      setImgError({ imgFile: "No image uploaded!" });
    } else {
      // const data = new FormData();
      // data.append("file", imgFile);
      // console.log(data);

      const updatePicture = async () => {
        try {
          // const uploadFileRes = await axios.post("/api/upload/person", data);
          // if (uploadFileRes.status === 200) {
          //   const newProfilePicture = {
          //     profilePicture: uploadFileRes.data.imagePath,
          //   };
          //   const newUser = { ...user, ...newProfilePicture };
          //   console.log(newUser);

          //   const res = await axios.put("/api/users/" + user._id, {
          //     profilePicture: uploadFileRes.data.imagePath,
          //   });
          //   if (res.status === 200) {
          //     dispatch({
          //       type: "UPDATE",
          //       payload: { user: newUser, sock: sockio },
          //     });
          //   }
          // }
          setIsUpdatingPicture(true);
          const imageFileName = Date.now() + imgFile.name;
          console.log("filename is: " + imageFileName);
          const uploadTask = storage
            .ref(`person/${imageFileName}`)
            .put(imgFile);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              console.log("progress is: " + progress.toString());
            },
            (error) => {
              console.log(error);
              setIsUpdatingPicture(false);
            },
            async () => {
              //get download url and upload the post info
              try {
                const imageUrl = await storage
                  .ref("person")
                  .child(`${imageFileName}`)
                  .getDownloadURL();
                const trimImageUrl = imageUrl.replace(PF, "");
                console.log(trimImageUrl);
                const newProfilePicture = {
                  profilePicture: trimImageUrl,
                };

                console.log(newProfilePicture);
                const newUser = { ...user, ...newProfilePicture };
                console.log(newUser);
                // update group in database
                const res = await axios.put("/api/users/" + user._id, {
                  profilePicture: trimImageUrl,
                });
                if (res.status === 200) {
                  const tempProfilePic = user.profilePicture;
                  dispatch({
                    type: "UPDATE",
                    payload: { user: newUser, sock: sockio },
                  });
                  setIsUpdatingPicture(false);
                  //delete the old picture only after new picture updated to database and updated to Context object
                  //delete only if previously there is image
                  if (tempProfilePic && tempProfilePic !== "") {
                    try {
                      const imageRef = storage.refFromURL(PF + tempProfilePic);
                      await imageRef.delete();
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }
              } catch (error) {
                console.log(error);
                setIsUpdatingPicture(false);
              }
            }
          );
        } catch (err) {
          console.log(err);
          setIsUpdatingPicture(false);
        }
      };

      await updatePicture();
      setImgFile(null);
    }
  };

  //Below is for Form Control for password
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    //if error exists, remove them from the error object
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }

    if (passwordUpdateValid) {
      setPasswordUpdateValid(false);
    }
  };

  //handles Password submit
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setPasswordUpdateValid(false);
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      const updatePassword = async () => {
        try {
          setisUpdatingPassword(true);
          const res = await axios.put("/api/auth/updatePassword/" + user._id, {
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
          });
          if (
            res &&
            res.status === 200 &&
            res.data.message === "User password has been updated"
          ) {
            setPasswordUpdateValid(true);
            setForm({
              showPassword: false,
              confirmPassword: "",
              newPassword: "",
              currentPassword: "",
            });
            setisUpdatingPassword(false);
            alert("password updated");
          } else if (
            res &&
            res.status === 200 &&
            res.data.message === "wrong password"
          ) {
            const wrongPasswordError = { currentPassword: "Wrong Password!" };
            setErrors({
              ...errors,
              ...wrongPasswordError,
            });
            setisUpdatingPassword(false);
            alert("wrong password");
          }
        } catch (err) {
          console.log(err);
          setisUpdatingPassword(false);
        }
      };
      await updatePassword();
    }
  };

  //function for finding errors in password form
  const findFormErrors = () => {
    const { currentPassword, newPassword, confirmPassword } = form;
    const newErrors = {};

    if (!currentPassword || currentPassword === "") {
      newErrors.currentPassword = "Current password cannot be empty!";
    }

    if (!newPassword || newPassword.length < 6) {
      newErrors.newPassword = "New password must have at least 6 characters!";
    }

    if (!confirmPassword || confirmPassword !== newPassword) {
      newErrors.confirmPassword = "New and confirm passwords do not match!";
    }

    return newErrors;
  };

  return (
    <div>
      <TopBar currentUser={user} />
      <div className="settingsContainer">
        <SideBar sidebarUser={user} />
        <div className="settingsRight">
          <span className="settingsHeader">Settings</span>
          <Container className="settingsWrapper">
            <Card
              style={{ width: "60em", height: "19em" }}
              className="settingsUserProfileContainer shadow p-3 mb-5 bg-white rounded"
            >
              <span className="settingsUserProfileHeader">User Profile</span>
              <Container>
                <Row>
                  <Col>
                    <img
                      src={
                        imgFile && imgFile.preview
                          ? imgFile.preview
                          : user && user.profilePicture
                          ? PF + user.profilePicture
                          : EMPTY_USER_PROFILE
                      }
                      alt=""
                      className="userProfileImg"
                    />
                  </Col>
                  <Col>
                    <div className="settingsImgInstructions">
                      <div className="settingsImgInstructionsText">
                        Upload a profile picture of yourself to help others know
                        more about you!
                      </div>
                      <Form.Group>
                        <Form.Control
                          className="imgUploadButton"
                          as="input"
                          name="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={imageHandler}
                          isInvalid={!!imgError.imgFile}
                        />
                        <Form.Control.Feedback type="invalid">
                          {imgError.imgFile}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Button
                        className="changeProfilePictureButton"
                        variant="warning"
                        onClick={handleChangePicture}
                        disabled={isUpdatingPicture}
                      >
                        {isUpdatingPicture ? (
                          <CircularProgress color="white" size="20px" />
                        ) : (
                          "Change profile picture"
                        )}
                      </Button>
                    </div>
                    {/* <div>{user.profilePicture}</div> */}
                  </Col>
                </Row>
              </Container>
            </Card>
            <Card
              style={{ width: "60em" }}
              className="settingsPasswordContainer shadow p-3 mb-5 bg-white rounded"
            >
              <span className="settingsPasswordHeader">Password</span>
              <Form>
                <div className="passwordInputWrapper">
                  <Form.Group controlId="oldPassword">
                    <Form.Control
                      className="passwordInput"
                      name="currentPassword"
                      type={form.showPassword ? "text" : "password"}
                      placeHolder="Current Password"
                      value={form.currentPassword}
                      onChange={(e) =>
                        setField("currentPassword", e.target.value)
                      }
                      isInvalid={!!errors.currentPassword}
                      isValid={passwordUpdateValid}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.currentPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="newPassword">
                    <Form.Control
                      className="passwordInput"
                      name="newPassword"
                      type={form.showPassword ? "text" : "password"}
                      placeHolder="New Password"
                      value={form.newPassword}
                      onChange={(e) => setField("newPassword", e.target.value)}
                      isInvalid={!!errors.newPassword}
                      isValid={passwordUpdateValid}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.newPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                    <Form.Control
                      className="passwordInput"
                      name="confirmPassword"
                      type={form.showPassword ? "text" : "password"}
                      placeHolder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setField("confirmPassword", e.target.value)
                      }
                      isInvalid={!!errors.confirmPassword}
                      isValid={passwordUpdateValid}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                      "Password updated successfully"
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={form.showPassword}
                    onClick={() => setField("showPassword", !form.showPassword)}
                  />
                  <label className="checkboxLabel">Show input</label>
                </div>
                <div>
                  <Button
                    className="passwordButton"
                    variant="warning"
                    onClick={handleSubmitPassword}
                    disabled={isUpdatingPassword}
                  >
                    {isUpdatingPassword ? (
                      <CircularProgress color="white" size="20px" />
                    ) : (
                      "Update password"
                    )}
                  </Button>
                </div>
              </Form>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
}
