import React from 'react'
import { Col, Row, Container } from "react-bootstrap";
import "./topbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, TextsmsOutlined } from "@material-ui/icons";

export default function TopBar() {
    return (
        <Container className="topbarWrapper" fluid>
            <Row>
                <Col className="topbarLeft" xs={4}>
                    <div className="logo">
                        <img className="ReHashLogo"src="/assests/ReHashLogo.png" alt=""/>
                        <span className="logoText">ReHash</span>
                    </div>
                    <div className="swapText">
                        <span>Swap on ReHash</span>
                    </div>
                </Col>
                <Col className="topbarCenter" xs={5.5}>
                    <div className="searchbar">
                        <Search className="searchIcon" />
                        <input
                            placeholder="Seach for a swap..."
                            className="searchInput"
                        />
                    </div>
                </Col>
                <Col className="topbarRight" xs={2.5}>
                    <div className="topbarItems">
                        <TextsmsOutlined className="chat" htmlColor="orange"/>
                        <img className="userProfilePic" src="/assests/userProfile.png" alt="userProfile"/>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
