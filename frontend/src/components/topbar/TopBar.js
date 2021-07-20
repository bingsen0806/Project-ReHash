import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, DropdownButton, Dropdown } from "react-bootstrap";
import "./topbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, TextsmsOutlined } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Notification from "../notification/Notification";

export default function TopBar({ currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  const [searchText, setSearchText] = useState("");

  const handleClickHome = () => {
    history.push("/home");
  };
  const handleClickCreate = () => {
    history.push("/create");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if ((searchText.match(/^\s*\n*\t*$/) || []).length > 0) {
        console.log("search string is empty!");
      } else {
        history.push("/product/search/" + searchText);
      }
    }
  };

  const navbarNotificationTitle = (<NotificationsIcon  className="userNotificationIcon" htmlColor="orange"/>);

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
            <input
              placeholder="Seach for a swap..."
              className="searchInput"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          <Link to="/chat/0">
            <TextsmsOutlined className="chat" htmlColor="orange" />
          </Link>
          {/* notification list */}
          <DropdownButton className="userNotification" variant="light" title={navbarNotificationTitle}>
            <div className="userNotificationList">
              <Dropdown.Item><Notification /></Dropdown.Item>
              <Dropdown.Item><Notification /></Dropdown.Item>
              <Dropdown.Item><Notification /></Dropdown.Item>
            </div>
          </DropdownButton>
            {/* <NotificationsIcon className="userNotification" htmlColor="orange"/> */}
          
          <Link
            to={
              currentUser
                ? "/profile/" + currentUser.username + "/listings"
                : "/"
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
