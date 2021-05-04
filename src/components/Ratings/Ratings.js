import React from "react";
import PropTypes from "prop-types";
import "./Ratings.css";
import BeautyStars from "beauty-stars";

Ratings.propTypes = {
  ratings: PropTypes.array,
};
function Ratings(props) {
  const { ratings } = props;

  return (
    <div className="ratings container">
      <h1 className="text-center">Ratings by Our Clients</h1>
      {ratings.map((rating, index) => {
        const date = new Date(rating.rating.modifiedDate);
        return (
          <div>
            <div className="ratings container" key={index}>
              <div className="user-rating">
                <h5>{rating.username} :</h5>
              </div>
              <BeautyStars value={rating.rating.star} />
              <div className="user-message">
                <p>{rating.rating.content}</p>
              </div>
              <div>{date.toLocaleDateString()}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Ratings;
