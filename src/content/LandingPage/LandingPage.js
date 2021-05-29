import React from 'react';
import { ProgressIndicator } from 'carbon-components-react';
import { ProgressStepNew } from '../../components/Info';

import DATA from './Data.js';

class LandingPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      folded: false,
    };
  }

  render() {
    return (
      <div
        className="bx--grid bx--grid--full-width landing-page"
        style={{
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/cover.png)`,
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <div className="bx--row">
          <div
            className="bx--col-lg-4 offset"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '55px',
              minHeight: '100vh',
            }}>
            <div className="some-container">
              <ProgressIndicator vertical currentIndex={1}>
                {DATA.map((item, key) => (
                  <React.Fragment key={key}>
                    <ProgressStepNew props={item} />
                  </React.Fragment>
                ))}
              </ProgressIndicator>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
