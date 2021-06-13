import React from "react";
import "./itemListing.css";
import { Card } from "react-bootstrap";
import Chip from "@material-ui/core/Chip";

export default function ItemListing({ item }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="itemListingWrapper">
      <Card>
        <Card.Img
          variant="top"
          src={PF + item.img}
          className="trendingSwapItemImg"
        />
        <Card.Body className="trendingSwapItemBody">
          <Card.Title>{item.title}</Card.Title>
          <span className="trendingSwapText">Ideal Swap: </span>
          <Chip className="tag" label="Beauty" size="small" color="secondary" />
          <Chip
            className="tag"
            label="Clothing"
            size="small"
            color="secondary"
          />
          <Card.Text>{item.desc}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
