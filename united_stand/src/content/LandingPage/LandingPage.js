import React from 'react';
import {} from 'carbon-components-react';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="bx--grid bx--grid--full-width container"
        style={{
          width: '100%',
          minHeight: '100vh',
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/dazzle-camo.png)`,
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <div className="bx--col-lg-8">
          <h1 className="title">
            Some Fun with <span style={{ color: 'red' }}>United</span> Stand
            Data
          </h1>
        </div>
      </div>
    );
  }
}

export default LandingPage;
