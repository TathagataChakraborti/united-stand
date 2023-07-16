import React from 'react';
import { OUTLINE, transformRouteString } from '../../components/PageHeader/Outline';
import { Grid, Column } from '@carbon/react';

const children = OUTLINE.find(item => item.name === 'The Dugout').children;

class DeadManWalking extends React.Component {
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
                            <p></p>
                        </div>
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default DeadManWalking;
