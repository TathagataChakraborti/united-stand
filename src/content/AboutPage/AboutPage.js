import React from 'react';
import { Grid, Column, Button, Link } from '@carbon/react';

class AboutPage extends React.Component {
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
                        end: 9,
                    }}
                    lg={{
                        start: 4,
                        end: 15,
                    }}>
                    <div className="container">
                        <div className="section-start">
                            <h3>About United Stand Data</h3>
                            <hr className="red-line" />
                            <p>
                                This website hosts aggregated data on fan
                                opinion (ratings) of the performances of
                                football players and managers at Manchester
                                United Football Club [
                                <Link
                                    className="text-red no-decoration-enforce"
                                    href="https://www.manutd.com"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    MUFC
                                </Link>
                                ]. The data contains over XXX votes from XXX
                                competitive football matches across the XXX
                                tournaments that Manchester United has
                                participated in from XXX to XXX.
                            </p>
                            <br />
                            <p>
                                The data is collected as is from{' '}
                                <Link
                                    className="text-red no-decoration-enforce"
                                    href="https://www.theunitedstand.com"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    The United Stand
                                </Link>
                                , the biggest sports fan channel on the planet
                                with over 1.68M followers on YouTube. The
                                associated match data on in-game player
                                performance is collected as is from{' '}
                                <Link
                                    className="text-red no-decoration-enforce"
                                    href="https://www.whoscored.com"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    WhoScored
                                </Link>
                                , our favorite source of football statistics.
                            </p>
                            <br />
                            <br />
                            <Button
                                href="/about"
                                className="no-decoration-enforce text-red border-red"
                                size="md"
                                kind="tertiary">
                                Export Data
                            </Button>
                        </div>

                        <div className="section-start">
                            <h3>Supporting Us</h3>
                            <hr className="red-line" />
                            <p>
                                If you would like to support this work, please
                                give{' '}
                                <Link
                                    className="text-red no-decoration-enforce"
                                    href="https://twitter.com/tchakra2"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    me
                                </Link>{' '}
                                a follow at on Twitter, or star the source code
                                for this project on GitHub{' '}
                                <Link
                                    className="text-red no-decoration-enforce"
                                    href="https://github.com/TathagataChakraborti/united-stand"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    here
                                </Link>
                                . Starring the code repository helps it to gain
                                visibility and attract more open source
                                contributors. Suggestions, feedback and
                                contributions, including code contributions, are
                                very welcome. Your love keeps us going.{' '}
                                <span role="img" aria-label="hugging face">
                                    &#129303;
                                </span>
                            </p>
                        </div>
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default AboutPage;
