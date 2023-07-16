import React from 'react';
import { OUTLINE, transformRouteString } from '../../components/PageHeader/Outline';
import { fixDate } from '../../components/Info';
import { GroupedBarChart } from '@carbon/charts-react';
import { Grid, Column, FilterableMultiSelect } from '@carbon/react';

const data = require('../../cached_data/data.json');
const children = OUTLINE.find(item => item.name === 'The Team').children;
const player_names = data.player_info.map(item => item.name);

const DEFAULTS = ['Bruno Fernandes', 'Marcus Rashford'];
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

function getRatingObject(name, ratings) {
    if (!ratings) return null;

    var rating_object = ratings.find(item => name.toLowerCase() === item.rating.name.toLowerCase());
    if (!rating_object) rating_object = ratings.find(item => name.split(' ')[0].toLowerCase() === item.rating.name.split(' ')[0].toLowerCase());

    return rating_object ? parseFloat(rating_object.rating.rating) : null;
}

function getPlayerData(name) {
    const all_season_data = data.season_data.reduce((bag, item) => bag.concat(item.match_data), []);

    all_season_data.sort(function(a, b) {
        return fixDate(a.meta_data.date) - fixDate(b.meta_data.date);
    });

    return all_season_data
        .filter(item => item.united_stand)
        .map(item => {
            return {
                group: name,
                value: getRatingObject(name, item.united_stand.ratings),
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

                            <GroupedBarChart data={this.getSelectedData()} options={plotOptions} />
                        </div>

                        <div className="section-start">
                            <h3 id={transformRouteString(children[1])}>{children[1]}</h3>
                            <hr className="red-line" />
                            <p></p>
                        </div>

                        <div className="section-start">
                            <h3 id={transformRouteString(children[2])}>{children[2]}</h3>
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
