import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import "./topbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, TextsmsOutlined } from "@material-ui/icons";

export default function TopBar() {
    return (
        // <Container className="topbarWrapper" fluid>
        //     <Row>
        //         <Col className="topbarLeft" xs={4}>
        //             <div className="logo">
        //                 <img className="ReHashLogo"src="/assests/ReHashLogo.png" alt=""/>
        //                 <span className="logoText">ReHash</span>
        //             </div>
        //             <div className="swapText">
        //                 <span>Swap on ReHash</span>
        //             </div>
        //         </Col>
        //         <Col className="topbarCenter" xs={5.5}>
        //             <div className="searchbar">
        //                 <Search className="searchIcon" />
        //                 <input
        //                     placeholder="Seach for a swap..."
        //                     className="searchInput"
        //                 />
        //             </div>
        //         </Col>
        //         <Col className="topbarRight" xs={2.5}>
        //             <div className="topbarIcons">
        //                 <div className="topbarItems">
        //                     <TextsmsOutlined className="chat" htmlColor="orange"/>
        //                     <img className="userProfilePic" src="/assests/userProfile.png" alt="userProfile"/>
        //                 </div>
        //             </div>
        //         </Col>
        //     </Row>
        // </Container>
        <Navbar className="topbarWrapper fixed-top" expand="lg">
            <Navbar.Brand href="#home">
                <img className="ReHashLogo"src="/assests/ReHashLogo.png" alt=""/>
                <span className="logoText">ReHash</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="collapseBar">
                <Nav className="mr-auto">
                    <Nav.Link className="swap">Swap on ReHash</Nav.Link>
                    <div className="searchbar">
                        <Search className="searchIcon" />
                        <input
                            placeholder="Seach for a swap..."
                            className="searchInput"
                        />
                    </div>
                        <TextsmsOutlined className="chat" htmlColor="orange"/>
                        <img className="userProfilePic" src="/assests/userProfile.png" alt="userProfile"/>   
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
