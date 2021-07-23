import React from "react";
import "./groupIconContainer.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GroupIcon from "../groupIcon/GroupIcon";

export default function GroupIconContainer({ recommendedGroups }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    xl: {
      breakpoint: { max: 3000, min: 1200 },
      items: 6,
    },
    lg: {
      breakpoint: { max: 1200, min: 992 },
      items: 5,
    },
    md: {
      breakpoint: { max: 992, min: 800 },
      items: 4,
    },
    sm: {
      breakpoint: { max: 800, min: 620 },
      items: 3,
    },
    xs: {
      breakpoint: { max: 620, min: 0 },
      items: 2,
    },
  };

  return recommendedGroups && recommendedGroups.length > 0 ? (
    <Carousel responsive={responsive}>
      {recommendedGroups.map((group) => (
        <GroupIcon
          key={group._id}
          groupName={group.groupName}
          groupImg={group.groupImg}
          groupId={group._id}
        />
      ))}
    </Carousel>
  ) : (
    <div>No recommended groups.</div>
  );
}
