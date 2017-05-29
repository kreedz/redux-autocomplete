import React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import Autocomplete from 'containers/Autocomplete'

const App = () =>
  <Grid>
    <Row className="show-grid">
      <Col xs={6} xsOffset={4}>
        <Autocomplete/>
      </Col>
    </Row>
  </Grid>;

export default App;