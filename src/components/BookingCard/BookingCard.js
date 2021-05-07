import React from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useHistory } from "react-router-dom";

import Rating from "../Rating/Rating";
import BookingService from "../../services/BookingService";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/message";

import styles from "./BookingCard.module.css";

const BookingCard = (props) => {
  let history = useHistory();
  let statusStyle;
  let status;
  let rating = (
    <div>
      <Rating
        idBooking={props.id}
        rating={props.rating}
        houseName={props.title}
        checkIn={new Date(props.checkIn)}
        checkOut={new Date(props.checkOut)}
      />
    </div>
  );

  const handleCancelClick = (id) => {
    let click = { click: false };
    new BookingService()
      .cancelBooking(id, click)
      .then((response) => {
        if (response.status < 300) {
          NotificationManager.success(response.message);
          props.change(props.index, "canceled");
          click = { click: true };
          new BookingService().cancelBooking(id, click);
        } else {
          NotificationManager.error(response.message);
        }
      })
      .catch((error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      });
  };

  const handleBookAgainClick = (id) => {
    history.push(`/housedetail/${props.houseId}`);
  };

  const handlePayClick = (id) => {
    const click = { click: false };
    new BookingService()
      .payment(id, click)
      .then((response) => {
        if (response.status < 300) {
          NotificationManager.success(response.message);
          props.change(props.index, "paid");
        } else {
          NotificationManager.error(response.message);
        }
      })
      .catch((error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      });
  };

  const cancelButton = (
    <div
      onClick={() => handleCancelClick(props.id)}
      className={`${styles.BookingCardButton} ${styles.Cancel}`}
    >
      Cancel
    </div>
  );

  const payButton = (
    <div
      onClick={() => handlePayClick(props.id)}
      className={`${styles.BookingCardButton} ${styles.Pay}`}
    >
      Pay
    </div>
  );

  const bookAgainButton = (
    <div
      onClick={() => handleBookAgainClick(props.houseId)}
      className={`${styles.BookingCardButton} ${styles.BookAgain}`}
    >
      Book Again
    </div>
  );

  const Button = () => {
    if (props.status === "paid") return cancelButton;
    else if (props.status === "pending") return payButton;
    else if (props.host) {
      rating = <></>;

      return (
        <div
          onClick={() => handleBookAgainClick(props.houseId)}
          className={`${styles.BookingCardButton} ${styles.BookAgain}`}
        >
          View House
        </div>
      );
    }
    return bookAgainButton;
  };

  if (props.status === "completed") {
    statusStyle = styles.Completed;
    status = "Completed";
  } else if (props.status === "pending") {
    statusStyle = styles.Pending;
    status = "Pending";
  } else if (props.status === "paid") {
    statusStyle = styles.Paid;
    status = "Paid";
  } else if (props.status === "canceled") {
    statusStyle = styles.Canceled;
    status = "Canceled";
  } else {
    statusStyle = styles.Incompleted;
    status = "Incompleted";
  }

  return (
    <div className={styles.BookingCard}>
      <NotificationContainer />
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
              {props.bookDate ? (
                <div>
                  <p className={styles.PSmall}>Booked at</p>
                  <p>{new Date(props.bookDate).toLocaleDateString()}</p>
                </div>
              ) : (
                <div>
                  <p className={styles.PSmall}>Customer</p>
                  <p>{props.customer}</p>
                </div>
              )}
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
          {Button()}
          {props.status === "completed" ? rating : null}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
