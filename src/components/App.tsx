import React, { SFC } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

import Autocomplete from 'containers/Autocomplete';

const App: SFC<any> = () => (
  <Grid>
    <Row className="show-grid">
      <Col xs={6} xsOffset={4}>
        <Autocomplete/>
      </Col>
    </Row>
  </Grid>
);

export default App;
