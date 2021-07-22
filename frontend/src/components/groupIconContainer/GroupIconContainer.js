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
