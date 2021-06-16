import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./topbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, TextsmsOutlined } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";

export default function TopBar({ currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  const handleClickHome = () => {
    history.push("/home");
  };
  const handleClickCreate = () => {
    history.push("/create");
  };
  return (
    <Navbar className="topbarWrapper fixed-top" expand="lg">
      <Navbar.Brand onClick={() => handleClickHome()}>
        <img className="ReHashLogo" src={PF + "ReHashLogo.png"} alt="" />
        <span className="logoText">ReHash</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="collapseBar">
        <Nav className="mr-auto">
          <Nav.Link className="swap" onClick={() => handleClickCreate()}>
            Swap on ReHash
          </Nav.Link>
          <div className="searchbar">
            <Search className="searchIcon" />
            <input placeholder="Seach for a swap..." className="searchInput" />
          </div>
          <Link to="/chat/0">
            <TextsmsOutlined className="chat" htmlColor="orange" />
          </Link>
          <Link
            to={
              currentUser
                ? "/profile/" + currentUser.username + "/listings"
                : "/login"
            }
          >
            <img
              className="userProfilePic"
              src={
                currentUser && currentUser.profilePicture
                  ? PF + currentUser.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt="userProfile"
            />
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
