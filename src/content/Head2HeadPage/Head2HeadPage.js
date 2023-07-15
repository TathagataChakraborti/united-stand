import React from 'react';
import { Grid, Column, InlineNotification } from '@carbon/react';

class Head2HeadPage extends React.Component {
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
                            <h3 id="whoscored">WhoScored</h3>
                            <hr className="red-line" />
                            <p></p>
                        </div>

                        <div className="section-start">
                            <h3 id="the-media">The Media</h3>
                            <hr className="red-line" />
                            <InlineNotification
                                lowContrast
                                hideCloseButton
                                subtitle={
                                    <div style={{ marginTop: '10px' }}>
                                        We look forward to analyzing differences
                                        between how the global TUS community
                                        rates players versus the traditional
                                        media, local or otherwise. Pogba{' '}
                                        <span
                                            role="img"
                                            aria-label="hugging face">
                                            &#128064;
                                        </span>{' '}
                                        Henderson{' '}
                                        <span
                                            role="img"
                                            aria-label="hugging face">
                                            &#128064;
                                        </span>{' '}
                                    </div>
                                }
                                timeout={0}
                                title="Coming Soon"
                            />
                        </div>
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default Head2HeadPage;
