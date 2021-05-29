import "./login.css";
import RestoreFromTrashRoundedIcon from "@material-ui/icons/RestoreFromTrashRounded";
import { Link } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

export default function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginTop">
          {/* <AddShoppingCartIcon
            className="loginShoppingCartIcon"
            style={{
              fontSize: 200,
              position: "absolute",
              left: -100,
              color: "white",
            }}
          />
          <SwapVerticalCircleIcon
            className="loginSwapIcon"
            style={{
              fontSize: 90,
              position: "absolute",
              right: -47,
              backgroundColor: "rgba(255, 153, 1, 0.863)",
              color: "white",
              borderRadius: "50%",
            }}
          /> */}
          <RestoreFromTrashRoundedIcon
            className="loginShoppingCartIcon"
            style={{
              fontSize: 220,
              color: "white",
            }}
          />
        </div>
        <form className="loginBottom">
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
            <input placeholder="USERNAME" required className="loginInput" />
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
              className="loginInput"
              type="password"
            />
          </div>
          <button className="loginButton">LOGIN</button>
          <Link to="/register" className="loginBottomLink">
            Forgot password?
          </Link>
          <Link to="/register" className="loginBottomLink">
            New to ReHash? Sign up now!
          </Link>
        </form>
      </div>
    </div>
  );
}
