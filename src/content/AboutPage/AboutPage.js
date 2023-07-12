import React from 'react';
import {Grid, Column} from '@carbon/react';

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <Grid>
          <Column  sm={{
    start: 1,
    end: 4
  }} md={{
    start: 1,
    end: 8
  }} lg={{
    start: 4,
    end: 16
  }}>
  <div className="container">

        <div className="section-start">
        <h3>About United Stand Data</h3>
        <hr className="red-line" />
        <p>Lorem ipsum</p>
        </div>

        <div className="section-start">
        <h3>Supproting Us</h3>
        <hr className="red-line" />
        <p>Lorem ipsum</p>
        </div>

        <div className="section-start">
        <h3>Getting Involved</h3>
        <hr className="red-line" />
        <p>Lorem ipsum</p>
        </div>

        </div>
          </Column>
        </Grid>
    );
  }
}

export default AboutPage;
