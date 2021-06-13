import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  Accessibility,
  Face,
  SportsFootball,
  Home,
  DriveEta,
  Redeem,
  Computer,
  Apps,
} from "@material-ui/icons";
import "./itemlistsTangible.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useHistory } from "react-router-dom";

export default function ItemLists() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const history = useHistory();
  const handleClick = (category) => {
    history.push("/product/" + category);
  };
  return (
    <Carousel responsive={responsive}>
      <div className="item" onClick={() => handleClick("clothing")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <Accessibility className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Clothing</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("beauty")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <Face className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Beauty</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("sports equipments")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <SportsFootball className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Sports Equipments</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("home appliances")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <Home className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Home Appliances</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("automotive")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <DriveEta className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Automotive</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("hobbies")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <Redeem className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Hobbies</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("computers and tech")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <Computer className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Computers & Tech</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("other tangibles")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <Apps className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Others</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
    </Carousel>
  );
}
