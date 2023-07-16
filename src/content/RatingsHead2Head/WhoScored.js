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
                            <h3 id={transformRouteString(children[0])}>{children[0]}</h3>
                            <hr className="red-line" />
                            <InlineNotification
                                lowContrast
                                hideCloseButton
                                subtitle={
                                    <div style={{ marginTop: '10px' }}>
                                        This section is currently under construction. Once finished, you will be able to compare and contrast TUS fan ratings
                                        with objective player performances, uncover community biases and agendas, and discover key fan ratings indicators.
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
