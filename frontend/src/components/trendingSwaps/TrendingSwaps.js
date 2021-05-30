import React from 'react'
import { Card, Row, Col } from "react-bootstrap";
import "./trendingswaps.css";
import Chip from '@material-ui/core/Chip';

export default function TrendingSwaps() {
    return (
        <div className="trendingSwap">
                <Row xs={1} md={3} className="g-4">
                        <Col>
                        <Card>
                            <Card.Img variant="top" src="/assests/trendingItems/levijeans.jpg" className="trendingSwapItemImg"/>
                            <Card.Body className="trendingSwapItemBody">
                            <Card.Title>Male Levi Jeans (size 28)</Card.Title>
                            <span className="trendingSwapText">Ideal Swap: </span>
                            <Chip className="tag" label="Beauty" size="small" color="secondary"/>
                            <Chip className="tag" label="Clothing" size="small" color="secondary"/>
                            <Card.Text>
                                Looking for a swap as I am trying to clear my wardrobe.
                                The jeans are still in very good conditions. Open to all swaps!
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col>
                        <Card>  
                            <Card.Img variant="top" src="/assests/trendingItems/basketball.jpg" className="trendingSwapItemImg"/>
                            <Card.Body className="trendingSwapItemBody">
                            <Card.Title>Basketball Experience Session</Card.Title>
                            <span className="trendingSwapText">Ideal Swap: </span>
                            <Chip className="tag" label="Sports Equipments" size="small" color="secondary"/>
                            <Chip className="tag" label="Outdoor Activities" size="small" color="primary"/>
                            <Card.Text>
                                I'm offering a Basketball experience session for people who are new to the sport. 
                                Looking forward to receiving swap offers!
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col>
                        <Card>
                            <Card.Img variant="top" src="/assests/trendingItems/cooking.jpg" className="trendingSwapItemImg"/>
                            <Card.Body className="trendingSwapItemBody">
                            <Card.Title>Brownies Baking Session</Card.Title>
                            <span className="trendingSwapText">Ideal Swap: </span>
                            <Chip className="tag" label="Indoor Activities" size="small" color="primary"/>
                            <Card.Text>
                                I am an experienced baker and looking step out of my comfort zones
                                to explore new activities. Indoor activities would be a nice match 
                                but I am also open to other swaps as well! Swap away!
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col>
                        <Card>
                            <Card.Img variant="top" src="/assests/trendingItems/drone.jpg" className="trendingSwapItemImg"/>
                            <Card.Body className="trendingSwapItemBody">
                            <Card.Title>Drone</Card.Title>
                            <span className="trendingSwapText">Ideal Swap: </span>
                            <Chip className="tag" label="Games & Esports" size="small" color="primary"/>
                            <Chip className="tag" label="Hobbies" size="small" color="secondary"/>
                            <Chip className="tag" label="Computers & Tech" size="small" color="secondary"/>
                            <Card.Text>
                                I bought this drone a few months ago but barely used. 
                                Looking for a new hobby as I don't really enjoy drone flying.
                                I like gadgets and IT a lot so i want to explore or own cool gadgets
                                as a replacement for my drones.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col>
                        <Card>
                            <Card.Img variant="top" src="/assests/trendingItems/esports.jpg" className="trendingSwapItemImg"/>
                            <Card.Body className="trendingSwapItemBody">
                            <Card.Title>Dota Online Gaming Session</Card.Title>
                            <span className="trendingSwapText">Ideal Swap: </span>
                            <Chip className="tag" label="Computers & Tech" size="small" color="secondary"/>
                            <Chip className="tag" label="Games & Esports" size="small" color="primary"/>
                            <Chip className="tag" label="Discussion" size="small" color="secondary"/>
                            <Card.Text>
                                I'm a bored gamer who really love to play Dota. I want to find a friend who could 
                                play together as make friends :) I also like to discuss game strategies as well 
                                as tech related stuff! 
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col>
                        <Card>
                            <Card.Img variant="top" src="/assests/trendingItems/guitar.jpg" className="trendingSwapItemImg"/>
                            <Card.Body className="trendingSwapItemBody">
                            <Card.Title>Guitar Jamming Session</Card.Title>
                            <span className="trendingSwapText">Ideal Swap: </span>
                            <Chip className="tag" label="Indoor Activities" size="small" color="primary"/>
                            <Chip className="tag" label="Others" size="small" />
                            <Card.Text>
                                Looking for someone who wanna do song covers together. I'm a guitarist so 
                                I wanna find a drummer to wanna make music together and jam with me!
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col>
                        <Card>
                            <Card.Img variant="top" src="/assests/trendingItems/hiking.jpg" className="trendingSwapItemImg"/>
                            <Card.Body className="trendingSwapItemBody">
                            <Card.Title>Hiking Exploration Session</Card.Title>
                            <span className="trendingSwapText">Ideal Swap: </span>
                            <Chip className="tag" label="Outdoor Activities" size="small" color="primary"/>
                            <Chip className="tag" label="Food" size="small" color="primary"/>
                            <Chip className="tag" label="Others" size="small" />
                            <Card.Text>
                                If you wanna explore hiking do offer me some swap! Details can be 
                                discussed later :) 
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col>
                        <Card>
                            <Card.Img variant="top" src="/assests/trendingItems/tetris.jpg" className="trendingSwapItemImg"/>
                            <Card.Body className="trendingSwapItemBody">
                            <Card.Title>Tetris Strategy Discussion</Card.Title>
                            <span className="trendingSwapText">Ideal Swap: </span>
                            <Chip className="tag" label="Games & Esports" size="small" color="primary"/>
                            <Chip className="tag" label="Hobbies" size="small" color="secondary"/>
                            <Chip className="tag" label="Discussion" size="small" color="primary"/>
                            <Card.Text>
                                Tetris is such a niche game and I don't really have friends 
                                around me who emjoy playing such a game. Looking for a tetris player
                                who wanna play together and learn from each other!
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col>
                        <Card>
                            <Card.Img variant="top" src="/assests/trendingItems/watch.jpg" className="trendingSwapItemImg"/>
                            <Card.Body className="trendingSwapItemBody">
                            <Card.Title>Fossil Watch</Card.Title>
                            <span className="trendingSwapText">Ideal Swap: </span>
                            <Chip className="tag" label="Clothing" size="small" color="secondary"/>
                            <Chip className="tag" label="Beauty" size="small" color="secondary"/>
                            <Chip className="tag" label="Others" size="small" color="primary"/>
                            <Card.Text>
                                Bought this watch compulsively but barely used. Looking for 
                                a cool swap with this cool watch!
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    
                </Row>
        </div>
    )
}
