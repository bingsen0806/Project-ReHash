import React, { useContext, useEffect, useState } from "react";
import "./product.css";
import TopBar from "../../components/topbar/TopBar";
import { Row } from "react-bootstrap";
import ItemListing from "../../components/itemListing/ItemListing";
import { ArrowBackIos } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Product() {
  const categoryName = useParams().categoryName;
  const [items, setItems] = useState([]);
  const { user, sockio } = useContext(AuthContext);
  useEffect(() => {
    const getItems = async () => {
      try {
        if (categoryName) {
          const res = await axios.get(
            "/items/categories?categoryName=" + categoryName
          );
          await setItems(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, [categoryName]);
  return (
    <div>
      <TopBar currentUser={user} />

      <div className="productWrapper">
        <div className="backArrow">
          {/* <Link to="/login" className="registerBack"> */}
          <ArrowBackIos />
          <span>Back</span>
          {/* </Link> */}
        </div>
        <span className="productHeader">
          {categoryName
            ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
            : "Product Descrption Header"}
        </span>
        <Row className="listingRow" xs={1} md={3}>
          {items.map((item) => (
            <div>
              <ItemListing key={item._id} item={item} />
            </div>
          ))}
        </Row>
      </div>
    </div>
  );
}
