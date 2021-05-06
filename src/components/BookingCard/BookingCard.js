import React from "react";
import BeautyStars from "beauty-stars";

import Rating from "../Rating/Rating";

import styles from "./BookingCard.module.css";

const BookingCard = (props) => {
  let statusStyle;
  let status;
  let rating;

  let cardBottom =
    <a
      href={`/housedetail/${props.houseId}`}
      className={styles.BookAgain}>Book again
    </a>

  if (props.status === "completed") {
    statusStyle = styles.Completed;
    status = "Completed";
    rating =
      <div>
        <Rating 
          rating={props.rating} 
          houseName={props.title} 
          checkIn={new Date(props.checkIn)}
          checkOut={new Date(props.checkOut)}
           />
      </div>
  }
  else if (props.status === "pending") {
    statusStyle = styles.Pending;
    status = "Pending";
    cardBottom =
      <a
        href={`/housedetail/${props.houseId}`}
        className={styles.Pay}>Pay
      </a>
  }
  else if (props.status === "paid") {
    statusStyle = styles.Paid;
    status = "Paid";
    cardBottom = 
      <a
        href={`/housedetail/${props.houseId}`}
        className={styles.Cancel}>Cancel
      </a>
  }
  else if (props.status === "canceled") {
    statusStyle = styles.Canceled;
    status = "Canceled"
  }
  else {
    statusStyle = styles.Incompleted;
    status = "Incompleted";
  }

  return (
    <div className={styles.BookingCard}>
      <div className={styles.Status}>
        <span className={statusStyle}>{status}</span>
      </div>
      <div className={styles.BookingCardContent}>
        <div className={styles.BookingCardHead}>
          <a href={`/housedetail/${props.houseId}`}>
            <p>{props.title}</p>
          </a>
        </div>
        <div className={styles.BookingCardBody}>
          <div>
            <div className={styles.Row}>
              <div>
                <p className={styles.PSmall}>Booking Id</p>
                <p>{props.id}</p>
              </div>
              {props.bookDate ? <div>
                <p className={styles.PSmall}>Booked at</p>
                <p>{new Date(props.bookDate).toLocaleDateString()}</p>
              </div>
                : <div>
                  <p className={styles.PSmall}>Customer</p>
                  <p>{props.customer}</p>
                </div>
              }
              <div>
                <p className={styles.PSmall}>Check In</p>
                <p>{props.checkIn}</p>
              </div>
              <div>
                <p className={styles.PSmall}>Number of night</p>
                <p>{props.night} night(s)</p>
              </div>
              <div>
                <p className={styles.PSmall}>Total</p>
                <p>{props.price}</p>
              </div>
              <div>
                <p className={styles.PSmall}>Check Out</p>
                <p>{props.checkOut}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.BookingCardBottom}>
          {cardBottom}
          {rating}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
