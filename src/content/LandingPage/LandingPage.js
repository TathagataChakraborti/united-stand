import React from 'react';
import { generateImageUrl } from '../../components/Info';
import { Grid, Column, Button } from '@carbon/react';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    minHeight: '100vh',
                    backgroundImage: generateImageUrl('dazzle-camo'),
                    backgroundPosition: 'right',
                    backgroundRepeat: 'repeat-y',
                    backgroundSize: 'cover',
                }}>
                <Grid>
                    <Column
                        sm={{
                            start: 1,
                            end: 4,
                        }}
                        md={{
                            start: 1,
                            end: 4,
                        }}
                        lg={{
                            start: 4,
                            end: 12,
                        }}>
                        <div className="container">
                            <h1 className="title">
                                Some fun with <span style={{ color: 'red' }}>United</span> Stand Data
                            </h1>
                            <Button href='/#/about' className="no-decoration-enforce lets-go" size="lg" kind="danger">
                                Let's go!
                            </Button>
                        </div>
                    </Column>
                </Grid>
            </div>
        );
    }
}

export default LandingPage;
