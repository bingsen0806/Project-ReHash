import React, { useEffect } from "react";
import "./itemListing.css";
import { Card } from "react-bootstrap";
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";

export default function ItemListing({ item, inPost }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  const handleClickItem = () => {
    history.push("/items/" + item._id);
    // console.log("clicked");
  };

  useEffect(() => {
    console.log(item);
  }, [item]);
  return (
    <div className="itemListingWrapper" onClick={() => handleClickItem()}>
      <Card>
        {inPost ? (
          <>
            <Card.Img src={PF + item?.img[0]} />
            <Card.Body className="PostItemBody">{item?.title}</Card.Body>
          </>
        ) : (
          <>
            <Card.Img
              variant="top"
              src={PF + item.img[0]}
              className="trendingSwapItemImg"
            />

            <Card.Body className="trendingSwapItemBody">
              <Card.Title className="itemListingCardTitle">
                <span style={{ marginRight: "10px" }}>{item.title}</span>
                <Chip
                  className="tag"
                  label={item.status === "waiting" ? "available" : item.status}
                  size="small"
                  color={
                    item.status === "waiting"
                      ? ""
                      : item.status === "reserved"
                      ? "primary"
                      : "secondary"
                  }
                  style={{
                    marginBottom: "5px",
                    marginTop: "5px",
                  }}
                />
              </Card.Title>
              <span className="trendingSwapText">Ideal Swap: </span>
              {item.idealSwaps.map((tags) => (
                <Chip
                  key={tags}
                  className="tag"
                  label={tags}
                  size="small"
                  color="secondary"
                  style={{ marginRight: "5px" }}
                />
              ))}

              <Card.Text>{item.desc}</Card.Text>
            </Card.Body>
          </>
        )}
      </Card>
    </div>
  );
}
