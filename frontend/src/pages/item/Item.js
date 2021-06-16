import React, { useContext, useEffect, useState } from "react";
import "./item.css";
import TopBar from "../../components/topbar/TopBar";
import SingleItem from "../../components/singleItem/SingleItem";
import Chip from "@material-ui/core/Chip";
import { ArrowBackIos } from "@material-ui/icons";
import SwapAway from "../../components/swapAway/SwapAway";
import UserItemCommand from "../../components/userItemCommand/UserItemCommand";
import { Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Item() {
  const { user, sockio } = useContext(AuthContext);
  const itemId = useParams().itemId;
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        if (itemId) {
          const res = await axios.get("/items?itemId=" + itemId);
          await setItem(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getItem();
  }, [itemId]);

  return (
    <div>
      <TopBar currentUser={user} />
      <div className="itemBackArrow">
        {/* <Link to="/login" className="registerBack"> */}
        <ArrowBackIos />
        <span>Back</span>
        {/* </Link> */}
      </div>
      <label className="itemHeader">
        {item ? item.title : "Error: No Item Displayed"}
      </label>
      <Container className="itemImg">
        <Row>
          <Col>
            <SingleItem imgLinkArray={item ? item.img : []} />
          </Col>
          <Col>
            {user?._id === item?.userId ? (
              <UserItemCommand itemUserId={item?.userId} />
            ) : (
              <SwapAway itemUserId={item?.userId} />
            )}
          </Col>
        </Row>
      </Container>
      {/* <div className="itemImg">
                <SingleItem />
                <SwapAway />
            </div> */}
      <div className="itemDescription">
        <h5>Description</h5>
        <span>
          {item
            ? item.desc
            : "The item does not exist, and hence no description"}
        </span>
      </div>
      <div className="itemIdealSwaps">
        <h5>Ideal swaps</h5>
        {item?.idealSwaps.map((tags) => (
          <Chip
            className="tag"
            key={tags}
            label={tags}
            size="small"
            color="secondary"
            style={{ marginRight: "5px" }}
          />
        ))}
      </div>
    </div>
  );
}
