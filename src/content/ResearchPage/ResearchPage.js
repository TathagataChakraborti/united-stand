import React from 'react';
import { Project, Project3 } from '../../components/Info';

import DATA from './Data.js';

class ResearchPage extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div
        className="bx--grid bx--grid--full-width landing-page landing-page__banner"
        style={{ minHeight: '100vh' }}>
        <div className="offset">
          <div className="bx--row">
            <div className="bx--col-lg-8">
              <Project props={DATA[0]} />
            </div>

            <div className="bx--col-lg-8">
              <div className="bx--row">
                <div className="bx--col-lg-8">
                  <Project props={DATA[1]} />
                </div>
                <div className="bx--col-lg-8">
                  <Project props={DATA[2]} />
                </div>
              </div>

              <div className="bx--row">
                <div className="bx--col-lg-8">
                  <div className="bx--row">
                    <div className="bx--col-lg-16">
                      <Project3 props={DATA[3]} />
                    </div>

                    <div className="bx--col-lg-16">
                      <Project3 props={DATA[4]} />
                    </div>

                    <div className="bx--col-lg-16">
                      <Project3 props={DATA[5]} />
                    </div>
                  </div>
                </div>
                <div className="bx--col-lg-8">
                  <Project props={DATA[6]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResearchPage;
