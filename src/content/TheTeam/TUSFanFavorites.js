import React from 'react';
import { OUTLINE, transformRouteString } from '../../components/PageHeader/Outline';
import { getPlayerData, getCanonicalPlayerName, getAllMatchData } from './Helper';
import { data, sortHelper } from '../../components/Info';
import { SimpleBarChart } from '@carbon/charts-react';
import { Grid, Column, Toggle } from '@carbon/react';

const children = OUTLINE.find(item => item.name === 'The Team').children;

class TeamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            include_subs: false,
            normalize: false,
        };
    }

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
            const player_data = getPlayerData(item).filter(rating_object => this.state.include_subs || !rating_object.is_sub);

            var value = mapping[item];

            if (this.state.normalize) value = value / player_data.length;

            return {
                group: item,
                value: value,
            };
        });
    };

    setIncludeSubs = e => {
        this.setState({
            ...this.state,
            include_subs: !this.state.include_subs,
        });
    };

    setNormalize = e => {
        this.setState({
            ...this.state,
            normalize: !this.state.normalize,
        });
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
                            <h3 id={transformRouteString(children[2])}>{children[2]}</h3>
                            <hr className="red-line" />
                            <p>
                                While raw ratings are a direct evaluation of player performances, the highest rated player does not always become the man of the
                                match (MoM). Fans, and fan favorites, have their favorites. Hats off to Bruno Fernandes and David de Gea for keeping smiles on
                                the faces of MUFC fans through difficult times.
                                <br />
                                <br />
                                Note that while the rankings are relatively robust over multiple years and larger numbers, we might have off-by-a-couple errors,
                                especially due to the voting mechanism being compromised due to a couple of incursions from opposition fans and/or the Cristiano
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
                                data={sortHelper({ data: this.getMoMData(), key: 'value', reverse: false })}
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
