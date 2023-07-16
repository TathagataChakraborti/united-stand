import React from 'react';
import { OUTLINE, transformRouteString } from '../../components/PageHeader/Outline';
import { Grid, Column, InlineNotification } from '@carbon/react';

const children = OUTLINE.find(item => item.name === 'Ratings Head2Head').children;

class WhoScored extends React.Component {
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
                            <h3 id={transformRouteString(children[1])}>{children[1]}</h3>
                            <hr className="red-line" />
                            <InlineNotification
                                lowContrast
                                hideCloseButton
                                subtitle={
                                    <div style={{ marginTop: '10px' }}>
                                        We look forward to analyzing differences between how the global TUS community rates players versus the traditional
                                        media, local or otherwise. Pogba{' '}
                                        <span role="img" aria-label="hugging face">
                                            &#128064;
                                        </span>{' '}
                                        Henderson{' '}
                                        <span role="img" aria-label="hugging face">
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

export default WhoScored;
