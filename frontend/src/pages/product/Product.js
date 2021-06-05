import React from 'react';
import "./product.css";
import TopBar from "../../components/topbar/TopBar";
import { Row } from "react-bootstrap";
import ItemListing from "../../components/itemListing/ItemListing";
import { ArrowBackIos } from "@material-ui/icons";


export default function Product() {
    return (
        <div>
            <TopBar />
            
            <div className="productWrapper">
                <div className="backArrow">
                    {/* <Link to="/login" className="registerBack"> */}
                    <ArrowBackIos />
                    <span>Back</span>
                    {/* </Link> */} 
                </div>
                <span className="productHeader">Product Descrption Header</span>    
                <Row className="listingRow" xs={1} md={3}> 
                    <ItemListing />
                    <ItemListing />
                    <ItemListing />
                    <ItemListing />
                </Row>
            </div>
        </div>
    )
}
