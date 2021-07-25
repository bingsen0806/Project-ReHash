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
          if (res.status === 200) {
            const displayItems = res.data.filter(
              (item) => item.userId !== user?._id
            );
            await setItems(displayItems);
          }
        } else if (pageType === "search" && categoryName) {
          const res = await axios.get("/api/items?search=" + categoryName);
          if (res.status === 200) {
            const displayItems = res.data.filter(
              (item) => item.userId !== user?._id
            );
            await setItems(displayItems);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, [categoryName, pageType, user]);
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
        <Row className="listingRow" xl={4} lg={3} md={2} sm={1} xs={1}>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item._id}>
                <ItemListing key={item._id} item={item} />
              </div>
            ))
          ) : pageType === "categories" ? (
            <div className="productNoResult">
              No valid items in this category. Note that you can't view reserved
              items or items that are already swapped. You also cannot view your
              own items here. Go under "Listings" to view your own item.
            </div>
          ) : (
            <div className="productNoResult">No result</div>
          )}
        </Row>
      </div>
    </div>
  );
}
