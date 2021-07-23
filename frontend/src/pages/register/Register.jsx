import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userError, setUserError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
    if (emailError !== "") {
      setEmailError("");
    }
    // try {
    //   await axios.get("/api/users?email=" + e.target.value);
    //   e.target.setCustomValidity("Email already taken");
    // } catch (err) {
    //   if (err.response.status === 400) {
    //     e.target.setCustomValidity("");
    //   }
    // }
  };
  const handleUsername = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
    if (userError !== "") {
      setUserError("");
    }
    // try {
    //   await axios.get("/api/users?username=" + e.target.value);
    //   e.target.setCustomValidity("Username already taken");
    // } catch (err) {
    //   if (err.response.status === 400) {
    //     e.target.setCustomValidity("");
    //   }
    // }
  };
  const handlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
    // if (e.target.value.length < 6) {
    //   e.target.setCustomValidity("Password must have at least 6 characters");
    // } else {
    //   e.target.setCustomValidity("");
    // }
  };
  const handleConfirmPassword = (e) => {
    console.log(e.target.value);
    setConfirmPassword(e.target.value);
    // if (e.target.value !== password) {
    //   console.log(password);
    //   console.log(e.target.value);
    //   e.target.setCustomValidity("Passwords don't match!");
    // } else {
    //   e.target.setCustomValidity("");
    // }
  };

  const history = useHistory();

  const handleCheckUsername = async (e) => {
    setIsFetching(true);
    e.preventDefault();
    try {
      const res = await axios.get("/api/users?username=" + username);
      if (res.status === 200) {
        setUserError("Username already taken");
        setIsFetching(false);
      }
    } catch (err) {
      handleCheckEmail();
    }
  };

  const handleCheckEmail = async () => {
    try {
      const res = await axios.get("/api/users?email=" + email);
      if (res.status === 200) {
        setEmailError("Email already taken");
        setIsFetching(false);
      }
    } catch (err) {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    console.log(email);
    console.log(username);
    console.log(password);
    console.log(confirmPassword);
    if (password.length >= 6 && password === confirmPassword) {
      const user = {
        username: username,
        email: email,
        password: password,
      };
      try {
        const res = await axios.post("/api/auth/register", user);
        if (res.status === 200) {
          setIsFetching(false);
          history.push("/");
        }
      } catch (err) {
        alert("register failed due to server error");
        setIsFetching(false);
        console.log(err);
      }
    } else {
      setIsFetching(false);
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <div className="registerLeftWrapper  ">
            <div className="registerLeftTop ">
              <img
                className="registerLeftLogo"
                src="/assests/ReHashLogo.png"
                alt="ReHash logo"
              />
              <span id="registerText" className="registerLeftLogoText ">
                ReHash
              </span>
            </div>
            <span className="registerLeftBottom">
              Excited to embark on you ReHash journey? Sign up now!
            </span>
          </div>
        </div>
        <div className="registerRight">
          <div className="registerRightTop">
            <Link to="/" className="registerBack">
              <ArrowBackIosIcon />
              <span>Back</span>
            </Link>
          </div>
          <div className="registerRightBottom">
            <div className="registerRightHeader">
              <h2>Register Individual Account!</h2>
              {/* <span className="registerRightHeaderText">
                For the purpose of industry regulations, your details are
                requested
              </span> */}
            </div>
            <form
              action=""
              className="registerBox"
              onSubmit={handleCheckUsername}
            >
              <span className="registerInputLabel">Your full name *</span>
              <input
                placeholder="Enter username"
                required
                value={username}
                onChange={handleUsername}
                className="registerInput"
              />
              <span className="registerInputError">{userError}</span>
              <span className="registerInputLabel">Email address *</span>
              <input
                placeholder="Enter email address"
                required
                value={email}
                onChange={handleEmail}
                type="email"
                className="registerInput"
              />
              <span className="registerInputError">{emailError}</span>
              <span className="registerInputLabel">Create password *</span>
              <input
                placeholder="Enter password with at least 6 characters"
                required
                value={password}
                onChange={handlePassword}
                type="password"
                className="registerInput"
              />
              <span className="registerInputError">
                {password !== "" && password.length < 6
                  ? "Password must have at least 6 characters"
                  : ""}
              </span>
              <span className="registerInputLabel">Confirm password *</span>
              <input
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={handleConfirmPassword}
                type="password"
                className="registerInput"
              />
              <span className="registerInputError">
                {confirmPassword !== "" &&
                password !== "" &&
                confirmPassword !== password
                  ? "Passwords don't match!"
                  : ""}
              </span>
              <button
                className="registerButton"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Register Account"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
