import React from 'react';
import { OUTLINE, transformRouteString } from '../../components/PageHeader/Outline';
import { data, fixDate, getAverage, getStandardDeviation } from '../../components/Info';
import { SimpleBarChart, GroupedBarChart } from '@carbon/charts-react';
import { Grid, Column, Toggle, NumberInput, FilterableMultiSelect, Link } from '@carbon/react';
import { stringSimilarity } from "string-similarity-js";

const children = OUTLINE.find(item => item.name === 'The Team').children;
const player_names = data.player_info.map(item => item.name);

const DEFAULTS = [];
const plotOptions = {
    axes: {
        bottom: {
            mapsTo: 'date',
            scaleType: 'time',
        },
        left: {
            mapsTo: 'value',
            scaleType: 'linear',
        },
    },
    height: '600px',
};

function getCanonicalPlayerName(name) {
    var temp = player_names.map(item => {

    var name_split = item.split(" ");
    var new_name = name;

    if (name_split.length === 1) {
    new_name = name.split(" ")[0]
    }

    return{
            name: item,
            similarity: stringSimilarity(item, new_name, 1),
        }
    }).filter(item => item.similarity > 0.4)

    temp.sort(function(a, b) {
        return b.similarity - a.similarity;
    });

    return temp[0].name;
}

function getRatingObject(name, ratings) {
    if (!ratings) return null;
    return ratings.find(item => name === getCanonicalPlayerName(item.rating.name));
}

function getAllMatchData(data) {
    return data.season_data.reduce((bag, item) => bag.concat(item.match_data), []);
}

function getPlayerData(name) {
    const all_season_data = getAllMatchData(data);

    all_season_data.sort(function(a, b) {
        return fixDate(a.meta_data.date) - fixDate(b.meta_data.date);
    });

    return all_season_data
        .filter(item => item.united_stand && item.united_stand.ratings)
        .map(item => {
            const rating_object = getRatingObject(name, item.united_stand.ratings);

            return {
                group: name,
                value: rating_object ? parseFloat(rating_object.rating.rating) : null,
                is_sub: rating_object ? rating_object.substitute : null,
                date: fixDate(item.meta_data.date),
            };
        })
        .filter(item => item.value !== null);
}

class TeamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_selections: DEFAULTS,
            include_subs: false,
            normalize: false,
            min_apps: 3,
        };
    }

    onChange = selections => {
        this.setState({
            ...this.state,
            current_selections: selections.selectedItems,
        });
    };

    getSelectedData = e => {
        return this.state.current_selections.map(name => getPlayerData(name)).reduce((bag, item) => bag.concat(item), []);
    };

    getMoMData = e => {
        const all_match_data = getAllMatchData(data);
        const mapping = {};

        all_match_data
            .filter(item => item.united_stand && item.united_stand.man_of_the_match)
            .forEach(item => {
                const name = getCanonicalPlayerName(item.united_stand.man_of_the_match.name);

                if (Object.keys(mapping).indexOf(name) > -1) {
                    mapping[name] += 1;
                } else {
                    mapping[name] = 1;
                }
            });

        return Object.keys(mapping).map(item => {
            return {
                group: item,
                value: mapping[item],
            };
        });
    };

    setIncludeSubs = e => {
        this.setState({
            ...this.state,
            current_selections: [],
            include_subs: !this.state.include_subs,
        });
    };

    setNormalize = e => {
        this.setState({
            ...this.state,
            current_selections: [],
            normalize: !this.state.normalize,
        });
    };

    setMinApps(e, any, value) {
        this.setState({
            ...this.state,
            current_selections: [],
            min_apps: value || any.value,
        });
    }

    getAggregateData = e => {
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
                            <FilterableMultiSelect
                                hideLabel
                                id="player-multiselect"
                                helperText="Select one or more players, type to search."
                                items={player_names}
                                itemToString={item => item}
                                initialSelectedItems={this.state.current_selections}
                                selectionFeedback="top-after-reopen"
                                onChange={this.onChange.bind(this)}
                            />

                            {this.state.current_selections.length > 0 && <GroupedBarChart data={this.getSelectedData()} options={plotOptions} />}
                        </div>

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
                                Garnacho also fares well along with Lisandro Martinez, Raphaël Varane, and David de Gea, while Marcus Rashford with the highest standard
                                deviation remains a source of frustration among fans. Not to mention,{' '}
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
                                        data={this.getAggregateData().sort(function(a, b) {
                                            return a.mean - b.mean;
                                        })}
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
                                        data={this.getAggregateData().sort(function(a, b) {
                                            return b.sd - a.sd;
                                        })}
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

                        <div className="section-start">
                            <h3 id={transformRouteString(children[2])}>{children[2]}</h3>
                            <hr className="red-line" />
                            <p>
                                While raw ratings are a direct evaluation of player performances, the highest rated player does not always become the man of the
                                match (MoM). Fans, and fan favorites, have their favorites. Hats off to Bruno Fernandes and David de Gea for keeping smiles on
                                the faces of MUFC fans through difficult times.
                                <br />
                                <br />
                                Note that while the rankings are relatively robust over multiple years and larger numbers, we might have off-by-few errors,
                                especially due to the voting mechanism being compromised due to a few incursions from opposition fans and/or the Cristiano
                                Ronaldo fan cavarly.{' '}
                                <span role="img" aria-label="unamused">
                                    &#128530;
                                </span>
                            </p>
                            <br />
                            <br />
                            <Toggle
                                aria-label="normalize"
                                id="normalize"
                                size="sm"
                                labelText="Percentage MoM awards by number of matches played"
                                labelA="Normalize OFF"
                                labelB="Normalize ON"
                                toggled={this.state.normalize}
                                onClick={this.setNormalize.bind(this)}
                            />
                            <br />
                            <br />
                                        <Toggle
                                            aria-label="toggle subs"
                                            id="toggle_subs_again"
                                            size="sm"
                                            labelText=""
                                            labelA="Subs EXCLUDED"
                                            labelB="Subs INCLUDED"
                                            toggled={this.state.include_subs}
                                            onClick={this.setIncludeSubs.bind(this)}
                                        />
                            <br />
                            <br />

                            <SimpleBarChart
                                data={this.getMoMData().sort(function(a, b) {
                                    return a.value - b.value;
                                })}
                                options={{
                                    title: 'Number of TUS Man of the Match Awards',
                                    axes: {
                                        left: {
                                            mapsTo: 'group',
                                            scaleType: 'labels',
                                        },
                                        bottom: {
                                            mapsTo: 'value',
                                        },
                                    },
                                    height: '1000px',
                                }}
                            />
                            <br />
                            <br />
                            <p>
                                David de Gea leaves a legend of MUFC and the TUS community.{' '}
                                <span role="img" aria-label="heart">
                                    &#10084;&#65039;
                                </span>
                            </p>
                        </div>
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default TeamPage;
