import React from 'react';
import { OUTLINE, transformRouteString } from '../../components/PageHeader/Outline';
import { getAverage } from '../../components/Info';
import { getManagerData } from './Helper';
import { Grid, Column } from '@carbon/react';
import { AreaChart } from '@carbon/charts-react';

const children = OUTLINE.find(item => item.name === 'The Dugout').children;
const plotOptions = {
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
    height: '300px',
};

class DeadManWalking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getDifferentialManagerRating(name) {
        var manager_data = getManagerData();

        manager_data = manager_data[name];
        manager_data = manager_data
            .map(item => [
                {
                    group: name,
                    rating: item.rating,
                    date: item.date,
                },
                {
                    group: 'Average Team Rating',
                    rating: getAverage(item.team_ratings.map(item => item.rating.rating)),
                    date: item.date,
                },
            ])
            .reduce((bag, item) => bag.concat(item), [])
            .filter(item => item.date);

        console.log(manager_data);

        return manager_data;
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
                            <Grid>
                                <Column sm={4} md={8} lg={4}>
                                    <p>
                                        There are three truths to life: death, taxes, and a managerial sacking. In this section, we explore, through the trend
                                        graphs of player versus manager ratings, how blame gets passed on from the team to the manager over time. The key factor
                                        to look out for is the points when the two trend lines cross over.
                                        <br />
                                        <br />
                                        This phenomenon is particularly visisble in the latter part of Ole Gunanr's tenure when the manager ratings fall
                                        significantly below the average team rating -- the fans have had enough and have started to blame the manager for the
                                        performances, even though in the earlier sections these often interleave. The opposite is visible in the corresponding
                                        plot for Erik Ten Hag, whose ratings clearly dominate the average team rating, win or lose, thereby demonstrating a
                                        strong goodwill among the fanbase as of this time. Should Erik's time at MUFC sour as well, expect a similar crossover
                                        trend as the tell-tale signs of another sacking. God forbid.
                                        <br />
                                        <br />
                                        Ralf Rangnick's graph offers a curious counter-narrative. His stock goes down in the middle, similar to Ole Gunnar's at
                                        the end, but makes a late rally. This is consistent with Ralf's no holds barred pressers towards the end of his reign,
                                        as the fans increasingly turned their frustrations to the players who had, for the most part, downed tools and refused
                                        to put in a shift.
                                    <br/>
                                    <br/>
                                    </p>
                                </Column>
                                <Column
                                    sm={4}
                                    md={8}
                                    lg={{
                                        start: 6,
                                        end: 17,
                                    }}>
                                    {['OLE GUNNAR SOLSKJAER', 'RALF RANGNICK', 'ERIK TEN HAG'].map(item => (
                                        <>
                                            <AreaChart
                                                data={this.getDifferentialManagerRating(item)}
                                                options={{ ...plotOptions, title: item + ' versus the team' }}
                                            />
                                            <br />
                                            <br />
                                        </>
                                    ))}
                                </Column>
                            </Grid>
                        </div>
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default DeadManWalking;
