import { Container, Row, Spinner } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

function Loading() {
  return (
    <Container>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{ height: '80vh' }}
      >
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="warning" />
      </Row>
    </Container>
  )
}

export default Loading
