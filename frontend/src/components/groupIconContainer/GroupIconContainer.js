import React from 'react';
import "./groupIconContainer.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GroupIcon from "../groupIcon/GroupIcon";

export default function GroupIconContainer() {
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

    return (
        <Carousel responsive={responsive}>
            <GroupIcon />
            <GroupIcon />
            <GroupIcon />
            <GroupIcon />
            <GroupIcon />
            <GroupIcon />
            <GroupIcon />
        </Carousel>
    )
}
