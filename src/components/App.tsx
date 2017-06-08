import React, { SFC } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

import Autocomplete from 'containers/Autocomplete';

import styles from './styles.css';

const App: SFC<any> = () => (
  <Grid>
    <Row className="show-grid">
      <Col xs={4} xsOffset={4}>
        <div className={styles.header}>
          <h1>
            Autocomplete
          </h1>
        </div>
        <Autocomplete/>
      </Col>
    </Row>
  </Grid>
);

export default App;
