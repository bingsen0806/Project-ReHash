import React from "react";
import "./itemlistsIntangible.css";
import { Button, Col, Row } from "react-bootstrap";
import {
  OutdoorGrill,
  Room,
  Forum,
  Fastfood,
  BeachAccess,
  SportsHandball,
  SportsEsports,
  Apps,
} from "@material-ui/icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useHistory } from "react-router-dom";

export default function ItemListsIntangible() {
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
      <div className="item" onClick={() => handleClick("outdoor activities")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <OutdoorGrill className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Outdoor Activities</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("travel")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <Room className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Travel</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("discussion")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <Forum className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Discussion</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("food")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <Fastfood className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Food</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("indoor activities")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <BeachAccess className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Indoor Activities</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("sports")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <SportsHandball className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Sports</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("games and esports")}>
        <div className="button">
          <Button className="itemButton">
            <Col>
              <Row>
                <SportsEsports className="itemIcon" />
              </Row>
              <Row>
                <span className="itemText text-center">Games & Esports</span>
              </Row>
            </Col>
          </Button>
        </div>
      </div>
      <div className="item" onClick={() => handleClick("other intangibles")}>
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
