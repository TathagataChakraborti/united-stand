import React from 'react';
import Document32 from '@carbon/icons-react/lib/document/32';
import {
  StructuredListRow,
  StructuredListCell,
  Tile,
  Link,
} from 'carbon-components-react';

const generateImageUrl = imageUrl => {
  return `${process.env.PUBLIC_URL}/images/${imageUrl}.png`;
};

const Reference = props => {
  return (
    <StructuredListRow>
      <StructuredListCell className="vertial-align-middle">
        <Link href={props.props.link} target="_blank">
          <Document32 />
        </Link>
      </StructuredListCell>
      <StructuredListCell>
        <strong>{props.props.title}</strong> by {props.props.authors}.{' '}
        {props.props.venue}.
      </StructuredListCell>
    </StructuredListRow>
  );
};

const Instructor = props => {
  return (
    <Tile
      className="bx--col-lg-4"
      style={{ margin: '10px', backgroundColor: 'white' }}>
      <div className="bx--col-sm-2 bx--offset-sm-1 bx--col-lg-14 bx--offset-lg-1">
        <img
          style={{
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '50%',
            maxWidth: '100%',
          }}
          src={generateImageUrl(props.props.image)}
          alt="Carbon illustration"
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href={props.props.link} target="_blank">
          {props.props.name}
        </Link>

        <h6>{props.props.affiliation}</h6>
      </div>
    </Tile>
  );
};

export { Instructor, Reference };
