import React from 'react';
import { sortHelper, getAverage } from '../../components/Info';
import { OUTLINE, transformRouteString } from '../../components/PageHeader/Outline';
import { getManagerData } from './Helper';
import { Grid, Column, Link } from '@carbon/react';
import { AreaChart, SimpleBarChart } from '@carbon/charts-react';

const children = OUTLINE.find(item => item.name === 'The Dugout').children;

class RawManagerRatings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getManagerData = e => {
        const manager_data = getManagerData();
        return Object.keys(manager_data)
            .map(item => manager_data[item])
            .reduce((bag, item) => bag.concat(item), []);
    };

    getManagerAggregateData = e => {
        const manager_data = getManagerData();
        var temp = Object.keys(manager_data).map(item => {
            return {
                group: item,
                rating: getAverage(manager_data[item].map(item => item.rating)),
            };
        });

        return sortHelper({ data: temp, key: 'rating', reverse: false });
    };

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
                        end: 16,
                    }}>
                    <div className="container">
                        <div className="section-start">
                            <h3 id={transformRouteString(children[0])}>{children[0]}</h3>
                            <hr className="red-line" />
                            <AreaChart
                                data={this.getManagerData()}
                                options={{
                                    axes: {
                                        bottom: {
                                            mapsTo: 'date',
                                            scaleType: 'time',
                                        },
                                        left: {
                                            mapsTo: 'rating',
                                            scaleType: 'linear',
                                        },
                                    },
                                    curve: 'curveNatural',
                                    height: '600px',
                                }}
                            />
                        </div>
                        <div className="section-start">
                            <Grid>
                                <Column sm={4} md={8} lg={8}>
                                    <SimpleBarChart
                                        data={this.getManagerAggregateData()}
                                        options={{
                                            title: 'Average Rating',
                                            axes: {
                                                left: {
                                                    mapsTo: 'group',
                                                    scaleType: 'labels',
                                                },
                                                bottom: {
                                                    mapsTo: 'rating',
                                                },
                                            },
                                            height: '400px',
                                        }}
                                    />
                                    <br/>
                                    <br/>
                                </Column>
                                <Column sm={4} md={8} lg={8}>
                                    <h3>A New Hope</h3>
                                    <hr className="red-line" />
                                    <p>
                                        Erik Ten Hag comfortably leads the way among his fellow managerial appointments of late in terms of their average
                                        ratings (since recoridng of TUS ratings began). Despite reaching low points at the start of his tenure, and then again
                                        against Liverpool in the latter part of the season, most of Erik's reign at MUFC has been marked with optimism, reaching
                                        its peaks with a rally against Liverpool after the disappointing start to the season, as well as a glorious at home
                                        victory againt European giants Barcelona, followed by the Carabao Cup victory. The latter is MUFC's first and only
                                        trophy point on this curve, and is appropriately marked by its highest point.
                                        <br />
                                        <br />
                                        Ole Gunnar's tenure is, however, marked with much more turbulance and eventual decay in ratings. In the{' '}
                                        <Link className="text-red no-decoration-enforce" href="/#/the-dugout-dead-man-walking">
                                            next section
                                        </Link>
                                        , we will explore in a bit more detail how these trend lines compare to the ratings of the team itself.
                                    </p>
                                </Column>
                            </Grid>
                        </div>
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default RawManagerRatings;
