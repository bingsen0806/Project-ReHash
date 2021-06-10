import React from 'react';
import "./swapAway.css";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import { TextsmsOutlined } from "@material-ui/icons";

export default function SwapAway() {
    return (
        <div>
            <Alert className="swapAwayPrompt">
                <Container>
                    <Row>
                        <Col sm={2}>
                            <img className="swapAwayUserImg" src="/assests/AmeliaNg.jpeg" alt=""/>
                        </Col>
                        <Col sm={10}>
                            <Alert.Heading className="swapAwayUsername" style={{ fontSize: "1rem"}}>Amelia Ng</Alert.Heading>
                        </Col>
                    </Row>
                    
                   
                </Container>
                
                <Button className="swapAwayButton" variant="warning">
                    <div className="swapAwayButtonTextGroup">
                        <TextsmsOutlined />
                        <span className="swapAwayButtonText">Swap Away!</span>
                    </div>
                </Button>
            </Alert>
        </div>
    )
}
