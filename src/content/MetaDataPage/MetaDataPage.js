import React from 'react';
import { Grid, Column } from '@carbon/react';

class MetaDataPage extends React.Component {
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
                            <h3 id="tus-by-the-numbers">TUS by the Numbers</h3>
                            <hr className="red-line" />
                            <p></p>
                        </div>

                        <div className="section-start">
                            <h3 id="the-myth-of-negativity">
                                The Myth of Negativity
                            </h3>
                            <hr className="red-line" />
                            <p></p>
                        </div>
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default MetaDataPage;
