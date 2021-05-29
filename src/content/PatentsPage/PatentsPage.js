import React from 'react';
import {
  StructuredListCell,
  StructuredListRow,
  StructuredListHead,
  StructuredListWrapper,
  StructuredListBody,
} from 'carbon-components-react';

import DATA from './Data.js';

class PatentsPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: DATA,
    };
  }

  render() {
    return (
      <div
        className="bx--grid bx--grid--full-width landing-page landing-page__banner"
        style={{ minHeight: '100vh' }}>
        <div className="offset">
          <StructuredListWrapper>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>Patents</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {this.state.data.map((item, key) => (
                <React.Fragment key={key}>
                  <StructuredListRow>
                    <StructuredListCell>
                      <strong> {item.year} </strong>
                    </StructuredListCell>
                    <StructuredListCell>
                      <strong> {item.title} </strong> | {item.authors}
                    </StructuredListCell>
                  </StructuredListRow>
                </React.Fragment>
              ))}
            </StructuredListBody>
          </StructuredListWrapper>
        </div>
      </div>
    );
  }
}

export default PatentsPage;
