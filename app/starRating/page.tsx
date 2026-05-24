"use client";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/outline";

const StarRating = () => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [hoverCount, setHoverCount] = useState(0);
  const handleClick = (index: number) => {
    setSelectedCount(index + 1);
  };
  const handleHover = (index: number) => {
    setHoverCount(index + 1);
  };
  return (
    <div>
      <div className="flex gap-2" onMouseLeave={() => setHoverCount(0)}>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <StarIcon
              key={item}
              width={30}
              height={30}
              className=""
              onClick={() => handleClick(index)}
              onMouseOver={() => handleHover(index)}
              fill={
                (hoverCount || selectedCount) > index ? "#ffd230" : "#0000000"
              }
              strokeWidth="0.5"
            />
          );
        })}
      </div>
      <p className="text-2xl">{selectedCount} / 5</p>
    </div>
  );
};

export default StarRating;
