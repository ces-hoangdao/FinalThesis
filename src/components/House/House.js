
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./House.css";
import A from "../../assets/a.jpg";

import Bed from "../../assets/bed.svg";

const House = () => {
  return (
    <Card className="card card-house-grid">
      <div className="img-wrap">
        <Card.Img src={A} alt="Anh nha" />
      </div>
      <Card.Body className="info-wrap">
        <div className="fix-height">
          <Card.Title> Hoa Vang, Da Nang</Card.Title>
          <Card.Text className="price-wrap mt-2">
            <img  className="icon" src={Bed} alt=" gia"></img>
            <span className="text"> $80/Day</span>
            <img className="icon" src={Bed} alt=" gia"></img>
            <span className="text"> 2</span>
            <img className="icon" src={Bed} alt=" gia"></img>
            <span className="text"> 3</span>
          </Card.Text>
        </div>
        <Button size="lg" block>
          Book House{" "}
        </Button>
      </Card.Body>
    </Card>
  );
};
export default House;
