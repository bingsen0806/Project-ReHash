import React from 'react';
import "./itemlistsIntangible.css";
import { Button, Col, Row } from "react-bootstrap";
import { OutdoorGrill, Room, Forum, Fastfood, BeachAccess, SportsHandball, SportsEsports, Apps } from "@material-ui/icons";

export default function ItemListsIntangible() {
    return (
        <div className="itemWrapper">
            <div className="item">
                <div className="button">
                    <Button className="itemButton">
                        <Col>
                            <Row>
                                <OutdoorGrill className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Outdoor Activities</span>
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
                                <Room className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Travel</span>
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
                                <Forum className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Discussion</span>
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
                                <Fastfood className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Food</span>
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
                                <BeachAccess className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Indoor Activities</span>
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
                                <SportsHandball className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Sports</span>
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
                                <SportsEsports className="itemIcon"/>
                            </Row>
                            <Row>
                                <span className="itemText text-center">Games & Esports</span>
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
