import React from 'react';
import "./userlisting.css";
import { Row, Container } from "react-bootstrap";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";    
import ItemListing from "../../components/itemListing/ItemListing";
import { Paper, Tabs, Tab } from "@material-ui/core";

export default function UserListing() {
    return (
        <div>
            <TopBar />
            <div className="userlistingContainer">
                <SideBar className="sidebar"/>
                <Container className="userlistingWrapper">
                        <div className="tabBar">
                            <Paper  margin={200}>
                                <Tabs
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered
                                >
                                    <Tab label="Tangible" />
                                    <Tab label="Intangible" />
                                </Tabs>
                            </Paper>
                        </div>     
                    <Row className="listingRow" xs={1} md={3}> 
                        <ItemListing />
                        <ItemListing />
                        <ItemListing />
                        <ItemListing />
                    </Row>
                </Container>
            </div>
        </div>
    )
}
