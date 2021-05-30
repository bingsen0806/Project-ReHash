import React from 'react'
import { Button, Col, Row } from "react-bootstrap";
import { Accessibility, Face, SportsFootball, Home, DriveEta, Redeem, Computer, Apps } from "@material-ui/icons";
import "./itemlistsTangible.css";

export default function ItemLists() {
    return (
        <div className="itemWrapper">
           <div className="item">
                <div className="button">
                    <Button className="itemButton">
                        <Col>
                            <Row>
                                <Accessibility className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Clothing</span>
                            </Row>
                        </Col>
                    </Button> 
                </div>  
            </div>
            <div className="item">
                <div className="button">
                    <Button className="itemButton">
                        <Col>
                            <Row>
                                <Face className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Beauty</span>
                            </Row>
                        </Col>
                    </Button> 
                </div>  
            </div>
            <div className="item">
                <div className="button">
                    <Button className="itemButton">
                        <Col>
                            <Row>
                                <SportsFootball className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Sports Equipments</span>
                            </Row>
                        </Col>
                    </Button> 
                </div>  
            </div>
            <div className="item">
                <div className="button">
                    <Button className="itemButton">
                        <Col>
                            <Row>
                                <Home className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Home Appliances</span>
                            </Row>
                        </Col>
                    </Button> 
                </div>  
            </div>
            <div className="item">
                <div className="button">
                    <Button className="itemButton">
                        <Col>
                            <Row>
                                <DriveEta className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Automotive</span>
                            </Row>
                        </Col>
                    </Button> 
                </div>  
            </div>
            <div className="item">
                <div className="button">
                    <Button className="itemButton">
                        <Col>
                            <Row>
                                <Redeem className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Hobbies</span>
                            </Row>
                        </Col>
                    </Button> 
                </div>  
            </div>
            <div className="item">
                <div className="button">
                    <Button className="itemButton">
                        <Col>
                            <Row>
                                <Computer className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Computers & Tech</span>
                            </Row>
                        </Col>
                    </Button> 
                </div>  
            </div>
            <div className="item">
                <div className="button">
                    <Button className="itemButton">
                        <Col>
                            <Row>
                                <Apps className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Others</span>
                            </Row>
                        </Col>
                    </Button> 
                </div>  
            </div>    
        </div>
    )
}
