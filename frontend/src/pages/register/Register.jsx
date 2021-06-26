import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleEmail = async (e) => {
    setEmail(e.target.value);
    try {
      await axios.get("/api/users?email=" + e.target.value);
      e.target.setCustomValidity("Email already taken");
    } catch (err) {
      if (err.response.status === 400) {
        e.target.setCustomValidity("");
      }
    }
  };
  const handleUsername = async (e) => {
    setUsername(e.target.value);
    try {
      await axios.get("/api/users?username=" + e.target.value);
      e.target.setCustomValidity("Username already taken");
    } catch (err) {
      if (err.response.status === 400) {
        e.target.setCustomValidity("");
      }
    }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      e.target.setCustomValidity("Password must have at least 6 characters");
    } else {
      e.target.setCustomValidity("");
    }
  };
  const handleConfirmPassword = (e) => {
    console.log(e.target.value);
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      console.log(password);
      console.log(e.target.value);
      e.target.setCustomValidity("Passwords don't match!");
    } else {
      e.target.setCustomValidity("");
    }
  };

  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(username);
    console.log(password);
    console.log(confirmPassword);
    const user = {
      username: username,
      email: email,
      password: password,
    };
    try {
      await axios.post("/api/auth/register", user);
      history.push("/");
    } catch (err) {
      console.log(err);
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
              <span className="registerRightHeaderText">
                For the purpose of industry regulations, your details are
                requested
              </span>
            </div>
            <form action="" className="registerBox" onSubmit={handleClick}>
              <span className="registerInputLabel">Your full name *</span>
              <input
                placeholder="Enter username"
                required
                value={username}
                onChange={handleUsername}
                className="registerInput"
              />
              <span className="registerInputLabel">Email address *</span>
              <input
                placeholder="Enter email address"
                required
                value={email}
                onChange={handleEmail}
                type="email"
                className="registerInput"
              />
              <span className="registerInputLabel">Create password *</span>
              <input
                placeholder="Enter password with at least 6 characters"
                required
                value={password}
                onChange={handlePassword}
                type="password"
                className="registerInput"
              />
              <span className="registerInputLabel">Confirm password *</span>
              <input
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={handleConfirmPassword}
                type="password"
                className="registerInput"
              />
              <button className="registerButton" type="submit">
                Register Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
