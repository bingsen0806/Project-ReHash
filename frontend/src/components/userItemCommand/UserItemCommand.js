import React from 'react';
import "./userItemCommand.css";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';

export default function UserItemCommand() {
    return (
        <div>
            <Alert className="userItemCommandPrompt">
                <Container>
                    <Row>
                        <Col sm={2}>
                            <img className="userItemCommandUserImg" src="/assests/userProfile.png" alt=""/>
                        </Col>
                        <Col sm={10}>
                            <Alert.Heading className="userItemCommandUsername" style={{ fontSize: "1rem"}}>David ReHasher</Alert.Heading>
                        </Col>
                    </Row>
                    <div className="buttonWrapper">
                        <div>
                            <Button className="button" variant="warning">
                                <EditIcon className="icons"/>
                                <span className="action">Edit Swap</span>
                            </Button>
                        </div>
                        <div>
                            <Button className="button" variant="warning">
                                <VerifiedUserIcon className="icons"/>
                                <span className="action">Mark as Reserve</span>
                            </Button>
                        </div>
                        <div>
                            <Button className="button" variant="warning">
                                <ShoppingBasketIcon className="icons"/>
                                <span className="action">Mark as Sold</span>
                            </Button>
                        </div>
                        <div>
                            <Button className="button" variant="warning">
                                <HighlightOffIcon className="icons"/>
                                <span className="action">Delete</span>
                            </Button>
                        </div>
                    </div>
                    
                    
                </Container>
            </Alert>
        </div>
    )
}
