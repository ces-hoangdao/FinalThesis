import {React, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";

const RatingModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    // <Modal
    //   show={show}
    //   onHide={handleClose}
    //   backdrop="static"
    //   keyboard={false}
    //   size="xl"
    // >
    //   <Modal.Header closeButton>
    //     <Modal.Title> Rating</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <Form.Row>
    //       <Col lg={2}>
    //         <Form.Label>House Name:</Form.Label>
    //       </Col>
    //       <Col lg={10}>
    //         {" "}
    //         <Form.Control
    //           plaintext
    //           readOnly
    //           defaultValue={booking.houseName}
    //         ></Form.Control>
    //       </Col>
    //     </Form.Row>

    //     <Form.Row>
    //       <Col lg={2}>
    //         <Form.Label>Check In</Form.Label>
    //       </Col>
    //       <Col lg={4}>
    //         <Form.Control
    //           value={checkIn.toLocaleDateString()}
    //           disabled
    //         />
    //       </Col>
    //       <Col lg={2}>
    //         <Form.Label>Check Out</Form.Label>
    //       </Col>
    //       <Col lg={4}>
    //         <Form.Control
    //           value={checkEnd.toLocaleDateString()}
    //           disabled
    //         />
    //       </Col>
    //     </Form.Row>
    //     <h2>Your Rating </h2>
    //     <span>
    //       <BeautyStars
    //         value={star}
    //         onChange={(star) => setStar(star)}
    //       />
    //     </span>

    //     <Form.Group>
    //       <Form.Label>
    //         <h2>Content:</h2>
    //       </Form.Label>
    //       <Form.Control
    //         as="textarea"
    //         defaultValue={content}
    //         rows={5}
    //         onChange={(e) => setContent(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>
    //   </Modal.Body>

    //   {idRating !== null ? (
    //     <Row>
    //       <Col>
    //         <Button
    //           className="btn-bookingmanagement"
    //           variant="secondary"
    //           onClick={() => {
    //             handleClose();
    //           }}
    //         >
    //           Close
    //                     </Button>
    //       </Col>
    //       <Col>
    //         {" "}
    //         <Button
    //           className="btn-bookingmanagement"
    //           variant="primary"
    //           onClick={() => {
    //             console.log(index);
    //             handleEditRating(index);
    //             handleClose();
    //           }}
    //         >
    //           Edit
    //                     </Button>
    //       </Col>
    //     </Row>
    //   ) : (
    //     <Row>
    //       <Col>
    //         <Button
    //           className="btn-bookingmanagement"
    //           variant="secondary"
    //           onClick={() => {
    //             handleClose();
    //           }}
    //         >
    //           Close
    //                     </Button>
    //       </Col>
    //       <Col>
    //         <Button
    //           className="btn-bookingmanagement"
    //           variant="primary"
    //           onClick={() => {
    //             console.log(index);
    //             setIdBooking(booking.id);
    //             handleWriteRating(index);
    //           }}
    //         >
    //           Save{" "}
    //         </Button>
    //       </Col>
    //     </Row>
    //   )}
    // </Modal>
    <></>
  );
};

export default RatingModal;