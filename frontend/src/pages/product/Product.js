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
  const pageType = useParams().pageType;
  const [items, setItems] = useState([]);
  const { user, sockio } = useContext(AuthContext);
  useEffect(() => {
    console.log("categoryName is: " + categoryName);
    console.log("pageType is " + pageType);
    const getItems = async () => {
      try {
        if (pageType === "categories" && categoryName) {
          const res = await axios.get(
            "/api/items/categories?categoryName=" + categoryName
          );
          await setItems(res.data);
        } else if (pageType === "search" && categoryName) {
          const res = await axios.get("/api/items?search=" + categoryName);
          await setItems(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, [categoryName, pageType]);
  return (
    <div>
      <TopBar currentUser={user} />

      <div className="productWrapper">
        {/*<div className="backArrow">
          <ArrowBackIos />
          <span>Back</span>
        </div> */}
        <span className="productHeader">
          {pageType === "search"
            ? "Search results for: " + categoryName
            : pageType === "categories" && categoryName
            ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
            : "Product Descrption Header"}
        </span>
        <Row className="listingRow" lg={3} md={2} s={1}>
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
