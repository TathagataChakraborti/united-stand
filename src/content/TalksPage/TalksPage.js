import React from 'react';
import {
  Link,
  StructuredListCell,
  StructuredListRow,
  StructuredListHead,
  StructuredListWrapper,
  StructuredListBody,
} from 'carbon-components-react';

import DATA from './Data.js';

class TalksPage extends React.Component {
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
                <StructuredListCell head>Talks</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {this.state.data.map((item, key) => (
                <React.Fragment key={key}>
                  <StructuredListRow>
                    <StructuredListCell>
                      <strong> {item.title} </strong> | <em> {item.venue} </em>{' '}
                      {item.link && (
                        <span>
                          {' '}
                          |{' '}
                          <Link href={item.link} target="_blank">
                            Link
                          </Link>
                        </span>
                      )}
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

export default TalksPage;
