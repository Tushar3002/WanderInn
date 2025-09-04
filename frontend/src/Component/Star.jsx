import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Star({ starValue = 5, onRate, initialRating = 0 }) {
  let [rating, setRating] = useState(initialRating);
  let [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[...Array(starValue)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hover || rating);
        return (
          <span
            key={starValue}
            onClick={() => {
              setRating(starValue);
              onRate && onRate(starValue);
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="transition-colors duration-200"
          >
            <FaStar
              className={`cursor-pointer text-2xl transition-all duration-200 ${
                isFilled
                  ? "text-yellow-400 hover:text-yellow-500"
                  : "text-gray-300 hover:text-gray-400"
              }`}
            />
          </span>
        );
      })}
    </div>
  );
}

export default Star;
