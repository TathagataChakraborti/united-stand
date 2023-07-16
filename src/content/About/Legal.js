import React from 'react';
import { Grid, Column, Tile, Link } from '@carbon/react';

class Legal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Grid>
                <Column
                    sm={{
                        start: 1,
                        end: 5,
                    }}
                    md={{
                        start: 1,
                        end: 13,
                    }}
                    lg={{
                        start: 4,
                        end: 11,
                    }}>
                    <div className="container">
                        <div className="section-start">
                            <Tile className="legal-card blue-background">
                                This work is supported in no way, partly or fully, by IBM or IBM Research who happen to otherwise employ{' '}
                                <Link className="no-decoration-enforce" href="https://www.twitter.com/tchakra2" target="_blank" rel="noopener noreferrer">
                                    @tchakra2
                                </Link>{' '}
                                as an AI researcher. You can find more about his research{' '}
                                <Link className="no-decoration-enforce" href="https://tchakra2.com" target="_blank" rel="noopener noreferrer">
                                    here
                                </Link>
                                . This web application's potential likeness to the IBM form owes itself to IBMs fantastic open-source design framework{' '}
                                <Link className="no-decoration-enforce" href="https://www.carbondesignsystem.com" target="_blank" rel="noopener noreferrer">
                                    Carbon
                                </Link>{' '}
                                and is not to be mistsken for an IBM project or product.
                            </Tile>
                            <Tile className="legal-card red-background">
                                This page makes no money and is made out of love for football and Manchester United. I do not own this data. It is intended for
                                fair use only. I have, however, reached out separately to The United Stand, WhoScored, as well as Opta Sports, for formal
                                partnership or collaboration if it is of interest. I am looking forward to making this official (or take it down{' '}
                                <span role="img" aria-label="cry face">
                                    &#128557;
                                </span>{' '}
                                if necessary).
                            </Tile>
                            <Tile className="legal-card">
                                If you would like to raise an issue regarding data usage, please get in touch via{' '}
                                <Link className="no-decoration-enforce" href="mailto:tchakra2@outlook.com">
                                    email
                                </Link>
                                .
                            </Tile>
                        </div>
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default Legal;
