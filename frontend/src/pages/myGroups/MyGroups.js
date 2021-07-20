import React from 'react';
import "./myGroups.css";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import GroupIcon from "../../components/groupIcon/GroupIcon";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function MyGroups() {
    return (
        <div>
            <div className="myGroupsPageTopSection">
                <TopBar />  
            </div>
            <div className="myGroupsPageMiddleSection">
                <SideBar />
                <div className="myGroupsPageMiddleSectionRight">
                    <div className="myGroupsPageMiddleSectionRightHeader">
                        <span className="myGroupsPageMiddleSectionRightHeaderText">Groups You Have Joined</span>
                        <div className="myGroupsPageGroupIconWrapper">
                            <Row className="myGroupsPageGroupIconContainer" lg={5} md={3} xs={2}>
                                <Col>
                                    <GroupIcon />
                                </Col>
                                <Col>
                                    <GroupIcon />
                                </Col>
                                <Col>
                                    <GroupIcon />
                                </Col>
                                <Col>
                                    <GroupIcon />
                                </Col> 
                                <Col>
                                    <GroupIcon />
                                </Col>
                                <Col>
                                    <GroupIcon />
                                </Col>
                                <Col>
                                    <GroupIcon />
                                </Col> 
                                <Col>
                                    <GroupIcon />
                                </Col>
                                <Col>
                                    <GroupIcon />
                                </Col>
                                <Col>
                                    <GroupIcon />
                                </Col> 
                                <Col>
                                    <GroupIcon />
                                </Col>
                                <Col>
                                    <GroupIcon />
                                </Col>
                            </Row>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
