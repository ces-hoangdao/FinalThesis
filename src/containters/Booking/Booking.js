import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DayPicker from 'react-day-picker';
import { NotificationContainer, NotificationManager } from "react-notifications";

import { DEFAULT_ERROR_MESSAGE } from "../../constants/message";
import { numberWithCommas } from "../../helper/helper";
import BookingService from '../../services/BookingService';

import 'react-day-picker/lib/style.css';
import styles from './Booking.module.css'

const Booking = (props) => {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const today = new Date();
  const denominator = 1000 * 3600 * 24;
  let limit = checkIn;
  let days = 0;

  const handleCheckInDayClick = (day, modifiers) => {
    if (modifiers.disabled) {
      return;
    }
    setCheckIn(modifiers.selected ? undefined : day);
    setCheckOut(undefined)
  };

  const handleCheckOutDayClick = (day, modifiers) => {
    if (modifiers.disabled) {
      return;
    }
    setCheckOut(modifiers.selected ? undefined : day);
  };

  const calculateDateRange = (start, finish) => {
    const differentTime = finish.getTime() - start.getTime();
    return (differentTime / denominator);
  }

  if(checkOut){
    days = calculateDateRange(checkIn, checkOut);
  } else {
    days = 0;
  }

  // Click Book
  const handleBookingClick = () => {
    new BookingService()
      .createBooking(props.houseId, checkIn, checkOut)
      .then((response) => {
        if (response.status < 300) {
          NotificationManager.success(response.message);
        } else {
          NotificationManager.error(response.message);
        }
      })
      .catch((error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      });
  }

  const pass = [
    { before: today },
    today
  ];

  // Get the disabled days for check in date picker
  let disabledCheckInDays = props.disabled.map((book) => {
    const date = new Date(book.dateCheckOut);
    date.setDate(date.getDate() - 1);
    return ({
      from: new Date(book.dateCheckIn),
      to: date
    });
  });

  disabledCheckInDays = disabledCheckInDays.concat(pass);

  // Get the disabled days for Check out date picker
  // Default check out is disabled until check in is picked
  let disabledCheckOutDays = pass.concat({ after: today });

  if (checkIn) {
    disabledCheckOutDays = [{ before: checkIn }, checkIn];
    if (props.disabled.length > 0) {
      const listCheckIn = props.disabled.map((day) => (new Date(day.dateCheckIn)));
      listCheckIn.some((day) => {
        if (limit < day) {
          limit = day;
          return true;
        }
        else
          return false;
      })
    }
    if (limit !== checkIn)
      disabledCheckOutDays = disabledCheckOutDays.concat([{ after: limit }])
  }

  return (
    <>
      <NotificationContainer></NotificationContainer>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Booking's Information
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.DateWrap}>
            <label>
              {days ? days : 0} night(s) at {props.houseName}
            </label>
            <div className={styles.DateContainer}>
              <div className={styles.BookingCard}>
                <div className={styles.BookingCardDiv}>
                  <hr className={styles.Green} />
                  <p className={styles.Grey}>Check In</p>
                  <p className={styles.Giant}>
                    {checkIn ? checkIn.toLocaleDateString() : 'Check In Date'}
                  </p>
                  <p className={`${styles.Grey} ${styles.Small}`}>
                    {checkIn ? checkIn.getDay() : ' '}
                  </p>
                </div>
                <DayPicker
                  showOutsideDays
                  selectedDays={checkIn}
                  disabledDays={disabledCheckInDays}
                  onDayClick={handleCheckInDayClick} />
              </div>
              <div className={styles.BookingCard}>
                <div className={styles.BookingCardDiv}>
                  <hr className={styles.Yellow} />
                  <p className={styles.Grey}>Check Out</p>
                  <p className={styles.Giant}>
                    {checkOut ? checkOut.toLocaleDateString() : 'Check In Date'}
                  </p>
                  <p className={`${styles.Grey} ${styles.Small}`}>
                    {checkOut ? checkOut.getDay() : ' '}
                  </p>
                </div>
                <DayPicker
                  showOutsideDays
                  selectedDays={checkOut}
                  disabledDays={disabledCheckOutDays}
                  onDayClick={handleCheckOutDayClick} />
              </div>
            </div>
            <label>
              Total: {numberWithCommas(props.price * days)} VND
          </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleBookingClick}>Book</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Booking;
