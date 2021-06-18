import React from "react";
import { useMemo } from "react";
import Star from "../star/Star";

export default function RatingIcon({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
  selected,
  notSelected,
}) {
  const fill = useMemo(() => {
    if (hoverRating >= index) {
      return "rgb(240, 158, 6)";
    } else if (!hoverRating && rating >= index) {
      return "rgb(240, 158, 6)";
    }
    return "rgb(145, 144, 144)";
  }, [rating, hoverRating, index]);

  return (
    <div
      style={{ height: "20px", width: "20px" }}
      className="cursor-pointer"
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      {selected ? (
        <Star fill={"rgb(240, 158, 6)"} />
      ) : notSelected ? (
        <Star fill={"rgb(145, 144, 144)"} />
      ) : (
        <Star fill={fill} />
      )}
    </div>
  );
}
