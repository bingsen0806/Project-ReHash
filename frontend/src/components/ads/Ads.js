import React from 'react';
import "./ads.css";
import { Carousel } from "react-bootstrap";

export default function Ads() {
    return (
        <div>
           <Carousel className="adsWrapper">
                <Carousel.Item interval={3000}>
                    <img
                    className="adsPics d-block w-50"
                    src="assests/adsPics/ads1.jpeg"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                    className="adsPics d-block w-50"
                    src="/assests/adsPics/ads2.jpeg"
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                    className="adsPics d-block w-50"
                    src="/assests/adsPics/ads3.jpeg"
                    alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel> 
        </div>
    )
}
