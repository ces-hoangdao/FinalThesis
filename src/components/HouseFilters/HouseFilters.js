import { Form, Col, Button } from "react-bootstrap";
const HouseFilters =()=>{
    return(
        <Form>
         
            <Form.Group>
              <Form.Label as="legend">Property Type</Form.Label>
              <Col >
                <Form.Check
                  type="radio"
                  label="Any"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="HomeStay"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="Motel"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label as="legend">City</Form.Label>
              <Col >
                <Form.Control type="text" placeholder="City" />
              </Col>
            </Form.Group>

            <Form.Group>
              <Form.Label as="legend">District</Form.Label>
              <Col >
                <Form.Control type="text" placeholder="District" />
              </Col>
            </Form.Group>

            <Form.Group>
              <Form.Label as="legend">Street</Form.Label>
              <Col >
                <Form.Control type="text" placeholder="Street" />
              </Col>
            </Form.Group>

            <Form.Group>
              <Form.Label as="legend">Features</Form.Label>
              <Col >
                <Form.Check
                  type="checkbox"
                  label="Air Conditioning"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="checkbox"
                  label="Microwave"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="checkbox"
                  label="Fridge"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
                <Form.Check
                  type="checkbox"
                  label="DishWasher"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Col>
              <Button
                style={{ width: "150px" }}
                variant="outline-primary"
                type="reset"
                size="lg"
              >
                Clear
              </Button>
            </Form.Group>
        </Form>
    );
}
export default HouseFilters;