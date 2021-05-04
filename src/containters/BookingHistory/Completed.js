import { React, useState, useEffect } from "react";
import { Table, Button, Modal, Form, Col, Row } from "react-bootstrap";
import BeautyStars from "beauty-stars";
import BookingService from "../../services/BookingService";
import { NotificationManager } from "react-notifications";
import {DEFAULT_ERROR_MESSAGE} from "../../constants/message";


function Completed(props) {
  const { accountId } = props;
  const [loading, setLoading] = useState(false);
  const [bookingsCompleted, setBookingsCompleted] = useState([]);
  const [show, setShow] = useState(false);
  const [star, setStar] = useState(0);
  const [update, setUpdate] = useState(false);
  const [content, setContent] = useState("");
  const [idBooking, setIdBooking] = useState();
  const [idRating, setIdRating] = useState();
  const [paramsString, setParams] = useState({
    accountId: accountId,
    size: 20,
    page: 0,
    status: "completed",
  });

  useEffect(() => {
    setLoading(true);
    new BookingService()
      .getBookingForCustomer(paramsString)
      .then((bookings) => {
        if (bookings) {
          setBookingsCompleted(bookings.listObject);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, [update]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleEditRating = (index) => {
    new BookingService().editRating(idRating, star, content).then(
      () => {
        handleClose();
        NotificationManager.success("Edit Rating Success");
        setUpdate(!update);
      },
      (error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      }
    );
  };

  const handleWriteRating = (index) => {
    setShow(false);
    new BookingService().writeRating(idBooking, star, content).then(
      () => {
        handleClose();
        NotificationManager.success("Rating Success");
        props.loading();
        setUpdate(!update);
      },
      (error) => {
        NotificationManager.error(DEFAULT_ERROR_MESSAGE);
      }
    );
  };
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>STT</th>
            <th>House</th>
            <th>CheckIn</th>
            <th>CheckOut</th>
            <th>Status</th>
            <th>Rating</th>
          </tr>
        </thead>
        {bookingsCompleted &&
          bookingsCompleted.map((booking, index) => {
            const checkIn = new Date(booking.dateCheckIn);
            const checkEnd = new Date(booking.dateCheckOut);
            console.log(index);
            return (
              <tbody key={index}>
                <tr>
                  <th>{index}</th>
                  <th>{booking.houseName}</th>
                  <th>{checkIn.toLocaleDateString()}</th>
                  <th>{checkEnd.toLocaleDateString()}</th>
                  <th>{booking.status}</th>
                  <th>
                    {booking.rating !== null ? (
                      <div>
                        <BeautyStars
                          size="25px"
                          value={booking.rating.star}
                          onChange={() => {
                            setIdBooking(booking.id);
                            setStar(booking.rating.star);
                            setContent(booking.rating.content);
                            setIdRating(booking.rating.id);
                            handleShow();
                          }}
                        />
                      </div>
                    ) : (
                      <BeautyStars
                        size="25px"
                        editable="false"
                        value={0}
                        onChange={() => {
                          setIdBooking(booking.id);
                          setIdRating(null);
                          setStar(0);
                          setContent("");
                          handleShow();
                        }}
                      />
                    )}
                  </th>
                </tr>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  size="xl"
                >
                  <Modal.Header closeButton>
                    <Modal.Title> Rating</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Row>
                      <Col lg={2}>
                        <Form.Label>House Name:</Form.Label>
                      </Col>
                      <Col lg={10}>
                        {" "}
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={booking.houseName}
                        ></Form.Control>
                      </Col>
                    </Form.Row>

                    <Form.Row>
                      <Col lg={2}>
                        <Form.Label>Check In</Form.Label>
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          value={checkIn.toLocaleDateString()}
                          disabled
                        />
                      </Col>
                      <Col lg={2}>
                        <Form.Label>Check Out</Form.Label>
                      </Col>
                      <Col lg={4}>
                        <Form.Control
                          value={checkEnd.toLocaleDateString()}
                          disabled
                        />
                      </Col>
                    </Form.Row>
                    <h2>Your Rating </h2>
                    <span>
                      <BeautyStars
                        value={star}
                        onChange={(star) => setStar(star)}
                      />
                    </span>

                    <Form.Group>
                      <Form.Label>
                        <h2>Content:</h2>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        defaultValue={content}
                        rows={5}
                        onChange={(e) => setContent(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Modal.Body>

                  {idRating !== null ? (
                    <Row>
                      <Col>
                        <Button
                          className="btn-bookingmanagement"
                          variant="secondary"
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          Close
                        </Button>
                      </Col>
                      <Col>
                        {" "}
                        <Button
                          className="btn-bookingmanagement"
                          variant="primary"
                          onClick={() => {
                            console.log(index);
                            handleEditRating(index);
                            handleClose();
                          }}
                        >
                          Edit
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col>
                        <Button
                          className="btn-bookingmanagement"
                          variant="secondary"
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          Close
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="btn-bookingmanagement"
                          variant="primary"
                          onClick={() => {
                            console.log(index);
                            setIdBooking(booking.id);
                            handleWriteRating(index);
                          }}
                        >
                          Save{" "}
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Modal>
              </tbody>
            );
          })}
      </Table>
    </div>
  );
}

export default Completed;
