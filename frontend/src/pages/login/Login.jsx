import "./login.css";
import RestoreFromTrashRoundedIcon from "@material-ui/icons/RestoreFromTrashRounded";
import { Link } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, dispatch, isFetching } = useContext(AuthContext);
  // const usernameRef = useRef();
  // const passwordRef = useRef();

  useEffect(() => {
    console.log("user is changed");
    console.log(user);
  }, [user]);

  // const checkCredentials = async () => {
  //   try {
  //     const res = await axios
  //       .post("/api/auth/login", {
  //         username: usernameRef.current.value,
  //         password: passwordRef.current.value,
  //       })
  //       .then(() => {
  //         usernameRef.current.setCustomValidity("");
  //         passwordRef.current.setCustomValidity("");
  //       });
  //   } catch (err) {
  //     if (err.response.status === 400) {
  //       usernameRef.current.setCustomValidity("Incorrect username or password");
  //     }
  //   }
  // };
  const handleUsername = async (e) => {
    setUsername(e.target.value);
    console.log(e.target.value);
    // checkCredentials();
  };
  const handlePassword = async (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
    // checkCredentials();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginCall = async (userCredential, dispatch) => {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/api/auth/login", userCredential);
        const sock = await io(); //const sock = await io("ws://localhost:8080");
        sock.on("connect", () => {
          sock.emit("addUser", res.data._id);
          console.log("sock inside try block: ", sock);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: res.data, sock: sock },
          });
        });
      } catch (err) {
        setErrorMessage("Incorrect username or password");
        dispatch({ type: "LOGIN_FAILURE", payload: err });
      }
    };
    loginCall({ username: username, password: password }, dispatch);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginTop">
          <RestoreFromTrashRoundedIcon
            className="loginShoppingCartIcon"
            style={{
              fontSize: 220,
              color: "white",
            }}
          />
        </div>
        <form className="loginBottom" onSubmit={handleSubmit}>
          <div className="loginInputWrapper">
            <PersonOutlineOutlinedIcon
              style={{
                position: "absolute",
                color: "white",
                fontSize: 32,
                top: 32,
                left: 10,
              }}
            />
            <input
              placeholder="USERNAME"
              onChange={handleUsername}
              value={username}
              // ref={usernameRef}
              required
              className="loginInput"
            />
          </div>

          <div className="loginInputWrapper">
            <LockOutlinedIcon
              style={{
                position: "absolute",
                color: "white",
                fontSize: 32,
                top: 32,
                left: 10,
              }}
            />
            <input
              placeholder="PASSWORD"
              required
              onChange={handlePassword}
              value={password}
              // ref={passwordRef}
              className="loginInput"
              type="password"
            />
          </div>
          <div className="loginErrorMessageWrapper">{errorMessage}</div>

          <button className="loginButton" type="submit" disabled={isFetching}>
            {isFetching ? (
              <CircularProgress color="white" size="20px" />
            ) : (
              "LOGIN"
            )}
          </button>
          {/* <Link to="/register" className="loginBottomLink">
            Forgot password?
          </Link> */}
          <Link to="/register" className="loginBottomLink">
            New to ReHash? Sign up now!
          </Link>
        </form>
      </div>
    </div>
  );
}
