import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-5'>Copyright &copy; Travel Master</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
