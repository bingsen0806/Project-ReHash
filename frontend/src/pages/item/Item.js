import React from 'react';
import "./item.css";
import TopBar from "../../components/topbar/TopBar";
import SingleItem from "../../components/singleItem/SingleItem";
import Chip from '@material-ui/core/Chip';
import { ArrowBackIos } from "@material-ui/icons";
import SwapAway from "../../components/swapAway/SwapAway";
import { Container, Row, Col } from "react-bootstrap";

export default function Item() {
    return (
        <div>
            <TopBar />
            <div className="itemBackArrow">
                    {/* <Link to="/login" className="registerBack"> */}
                    <ArrowBackIos/>
                    <span>Back</span>
                    {/* </Link> */} 
            </div>
            <label className="itemHeader">Keychron K2 Mechanical Keyboard</label>
            <Container className="itemImg">
                <Row>
                    <Col>
                        <SingleItem />
                    </Col>
                    <Col>
                        <SwapAway />
                    </Col>
                </Row>
            </Container>
            {/* <div className="itemImg">
                <SingleItem />
                <SwapAway />
            </div> */}
            <div className="itemDescription">
                <h5>Description</h5>  
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Vivamus ut lectus lobortis velit ullamcorper ultrices eget a libero. 
                In hac habitasse platea dictumst. 
                Nam eget tincidunt nisl. Duis elementum eget ligula ut luctus. 
                Pellentesque interdum leo libero, ac condimentum nulla efficitur id. 
                Vivamus auctor nisi orci, sit amet tristique nibh efficitur congue. 
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</span>
            </div>
            <div className="itemIdealSwaps">
                <h5>Ideal swaps</h5>
                <Chip label="Computers & Tech" color="secondary"/>
                <Chip label="Home Appliances" color="secondary"/>
            </div>
        </div>
        
    )
}
