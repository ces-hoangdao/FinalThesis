import { React, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";

import BookingService from "../../services/BookingService";

import BeautyStars from "beauty-stars";

// import RatingModal from "./RatingModal/RatingModal"

const Rating = (props) => {
  const [show, setShow] = useState(false);
  const [star, setStar] = useState(props.rating === null ? null : props.rating.star);
  const [content, setContent] = useState(props.rating === null ? null : props.rating.content);
  const idRating = props.rating === null ? null : props.rating.id;

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleEditRating = () => {
    new BookingService().editRating(idRating, star, content).then(
      () => {
        handleClose();
      },
      (error) => {
      }
    );
  };

  const handleWriteRating = () => {
    setShow(false);
    new BookingService().writeRating(props.idBooking, star, content).then(
      () => {
        handleClose();
      },
      (error) => {
      }
    );
  };
  return (
    <>
      <div>
        <BeautyStars
          size="25px"
          value={star}
          onChange={() => {
            handleShow();
          }}
        />
      </div>

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
                defaultValue={props.houseName}
              ></Form.Control>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col lg={2}>
              <Form.Label>Check In</Form.Label>
            </Col>
            <Col lg={4}>
              <Form.Control
                value={props.checkIn.toLocaleDateString()}
                disabled
              />
            </Col>
            <Col lg={2}>
              <Form.Label>Check Out</Form.Label>
            </Col>
            <Col lg={4}>
              <Form.Control
                value={props.checkOut.toLocaleDateString()}
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
                  handleEditRating();
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
                  handleWriteRating();
                }}
              >
                Save{" "}
              </Button>
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
};

export default Rating;
