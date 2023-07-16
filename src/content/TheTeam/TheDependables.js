import React from 'react';
import { OUTLINE, transformRouteString } from '../../components/PageHeader/Outline';
import { getPlayerData } from './Helper';
import { data, sortHelper, getAverage, getStandardDeviation } from '../../components/Info';
import { SimpleBarChart } from '@carbon/charts-react';
import { Grid, Column, Toggle, NumberInput, Link } from '@carbon/react';

class TeamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            include_subs: false,
            min_apps: 3,
        };
    }

    setIncludeSubs = e => {
        this.setState({
            ...this.state,
            include_subs: !this.state.include_subs,
        });
    };

    setMinApps(e, any, value) {
        this.setState({
            ...this.state,
            min_apps: value || any.value,
        });
    }

    getAggregateData = player_names => {
        return player_names
            .map(name => {
                const ratings = getPlayerData(name)
                    .filter(rating_object => this.state.include_subs || !rating_object.is_sub)
                    .map(rating_object => rating_object.value);

                return {
                    group: name,
                    apps: ratings.length,
                    mean: getAverage(ratings),
                    sd: getStandardDeviation(ratings),
                };
            })
            .filter(item => item.mean > 0)
            .filter(item => item.apps >= this.state.min_apps);
    };

    render() {
        const children = OUTLINE.find(item => item.name === 'The Team').children;
        const player_names = data.player_info.map(item => item.name);

        const aggregate_data = this.getAggregateData(player_names);
        const sorted_means = sortHelper({ data: aggregate_data, key: 'mean', reverse: false });
        const sorted_sd = sortHelper({ data: aggregate_data, key: 'sd', reverse: true });

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
                                <Column sm={2} md={4} lg={4}>
                                    <NumberInput
                                        id="min_apps"
                                        hideLabel
                                        label=""
                                        onChange={this.setMinApps.bind(this)}
                                        invalidText="Invalid"
                                        helperText="Minimum Appearances"
                                        size="sm"
                                        max={200}
                                        min={0}
                                        step={1}
                                        value={this.state.min_apps}
                                    />
                                </Column>
                                <Column sm={2} md={4} lg={4}>
                                    <div style={{ paddingTop: '5px' }}>
                                        <Toggle
                                            aria-label="toggle subs"
                                            id="toggle_subs"
                                            size="sm"
                                            labelText=""
                                            labelA="Subs EXCLUDED"
                                            labelB="Subs INCLUDED"
                                            toggled={this.state.include_subs}
                                            onClick={this.setIncludeSubs.bind(this)}
                                        />
                                    </div>
                                </Column>
                            </Grid>
                            <br />
                            <br />
                            <p>
                                In this section, we want to explore the overall ratings of a player in terms of their mean and standard deviation. The higher
                                the arithemetic mean, commonly referred to as the average, the better. The standard deviation, on the other hand, is a measure
                                of how much a rating of a player fluctuates. Thus, we want players with high mean and low standard deviation:{' '}
                                <strong>The Dependables.</strong> Unsurprisingly, Casemiro is King{' '}
                                <span role="img" aria-label="cry face">
                                    &#128583;
                                </span>{' '}
                                <span role="img" aria-label="cry face">
                                    &#128583;
                                </span>{' '}
                                with comfortably the highest mean rating as well as a relatively high ranking on the low standard deviation front. Alexandro
                                Garnacho also fares well along with Lisandro Martinez, Raphaël Varane, and David de Gea, while Marcus Rashford with the highest
                                standard deviation remains a source of frustration among fans. Not to mention,{' '}
                                <Link className="no-decoration-enforce" target="_blank" href="https://twitter.com/Ankaman616/status/1665015182035243009">
                                    good Fred bad Fred.
                                </Link>{' '}
                                <span role="img" aria-label="cry face">
                                    &#128557;
                                </span>
                                <br />
                                <br />
                                Note that the ratings acquired as a substitute is turned OFF by default. Since most substitutions receive the average 6, it has
                                the effect of artificially inflating the mean while smoothing out the variance. Interestingly, this shows in the relatively good
                                standing of the likes of Donny van der Beek and Facundo Pellistri, especially with substitutions included, as a sign of
                                perennial hope that perhaps never got reciprocated -- we will explore how fan ratings diverge from objective performance metrics
                                in a{' '}
                                <span role="img" aria-label="cry face">
                                    &#128073;
                                </span>{' '}
                                <Link href="/ratings-head2head#whoscored" className="no-decoration-enforce text-red">
                                    later section
                                </Link>{' '}
                                as a head to head with data from{' '}
                                <Link className="no-decoration-enforce" href="https://www.whoscored.com" target="_blank">
                                    WhoScored.com
                                </Link>
                                .
                            </p>
                            <br />
                            <br />
                            <Grid>
                                <Column sm={4} md={6} lg={8}>
                                    <SimpleBarChart
                                        data={sorted_means}
                                        options={{
                                            title: 'Average Rating',
                                            axes: {
                                                left: {
                                                    mapsTo: 'group',
                                                    scaleType: 'labels',
                                                },
                                                bottom: {
                                                    mapsTo: 'mean',
                                                },
                                            },
                                            height: '1000px',
                                        }}
                                    />
                                </Column>
                                <Column sm={4} md={6} lg={8}>
                                    <SimpleBarChart
                                        data={sorted_sd}
                                        options={{
                                            title: 'Standard Deviation',
                                            axes: {
                                                left: {
                                                    mapsTo: 'group',
                                                    scaleType: 'labels',
                                                },
                                                bottom: {
                                                    mapsTo: 'sd',
                                                },
                                            },
                                            height: '1000px',
                                        }}
                                    />
                                </Column>
                            </Grid>
                        </div>
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default TeamPage;
