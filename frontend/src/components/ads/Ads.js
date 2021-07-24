import React from "react";
import "./ads.css";
import { Carousel } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Ads({ itemArray }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const TRENDING_IMAGE = process.env.REACT_APP_PUBLIC_FOLDER_TRENDING;
  const NO_IMAGE_UPLOADED = process.env.REACT_APP_PUBLIC_FOLDER_NOIMAGEUPLOADED;
  const history = useHistory();
  const adItemComponent = (item) => (
    <img
      className="adsPics d-block"
      src={
        item?.img && item.img.length > 0 ? PF + item.img[0] : NO_IMAGE_UPLOADED
      }
      alt="cannot display"
    />
  );
  return (
    <div style={{ width: "35%", outline: "none" }}>
      <Carousel className="adsWrapper">
        <Carousel.Item interval={3000}>
          <img
            className="adsPics d-block"
            src={TRENDING_IMAGE}
            alt="First slide"
          />
        </Carousel.Item>
        {itemArray.map((item) => (
          <Carousel.Item
            key={item._id}
            interval={3000}
            onClick={() => {
              history.push("/items/" + item._id);
            }}
          >
            {adItemComponent(item)}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
