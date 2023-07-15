import React from 'react';
import { Grid, Column } from '@carbon/react';

class TeamPage extends React.Component {
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
                            <h3 id="contrasting-fortunes">Raw Player Ratings</h3>
                            <hr className="red-line" />
                            <p></p>
                        </div>

                        <div className="section-start">
                            <h3 id="fan-favorites">Fan Favorites</h3>
                            <hr className="red-line" />
                            <p></p>
                        </div>

                        <div className="section-start">
                            <h3 id="the-a-word">The A Word</h3>
                            <hr className="red-line" />
                            <p></p>
                        </div>
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default TeamPage;
