import React from 'react';
import { OUTLINE, transformRouteString } from '../../components/PageHeader/Outline';
import { getCanonicalPlayerName, getAllMatchData, getPlayerData } from './Helper';
import { data, getAverage, getStandardDeviation } from '../../components/Info';
import { GroupedBarChart } from '@carbon/charts-react';
import { Grid, Column, FilterableMultiSelect } from '@carbon/react';

const children = OUTLINE.find(item => item.name === 'The Team').children;
const player_names = data.player_info.map(item => item.name);

const DEFAULTS = ['Marcus Rashford', 'Bruno Fernandes'];
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
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default TeamPage;
