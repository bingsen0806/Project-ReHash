import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./topbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, TextsmsOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function TopBar(props) {
  return (
    <Navbar className="topbarWrapper fixed-top" expand="lg">
      <Navbar.Brand href="#home">
        <img className="ReHashLogo" src="/assests/ReHashLogo.png" alt="" />
        <span className="logoText">ReHash</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="collapseBar">
        <Nav className="mr-auto">
          <Nav.Link className="swap">Swap on ReHash</Nav.Link>
          <div className="searchbar">
            <Search className="searchIcon" />
            <input placeholder="Seach for a swap..." className="searchInput" />
          </div>
          <Link to="/chat">
            <TextsmsOutlined className="chat" htmlColor="orange" />
          </Link>
          <Link to="/profile">
            <img
              className="userProfilePic"
              src={props.src === undefined ? "/assests/userProfile.png" : props.src}
              alt="userProfile"
            />
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
