import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";

export default function Register() {
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
            <Link to="/login" className="registerBack">
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
            <form action="" className="registerBox">
              <span className="registerInputLabel">Your full name *</span>
              <input
                placeholder="Enter username"
                required
                className="registerInput"
              />
              <span className="registerInputLabel">Email address *</span>
              <input
                placeholder="Enter email address"
                required
                className="registerInput"
              />
              <span className="registerInputLabel">Create password *</span>
              <input
                placeholder="Enter password with at least 6 characters"
                required
                className="registerInput"
              />
              <span className="registerInputLabel">Confirm password *</span>
              <input
                placeholder="Confirm password"
                required
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
