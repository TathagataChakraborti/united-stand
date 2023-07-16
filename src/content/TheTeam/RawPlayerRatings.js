import React from 'react';
import { OUTLINE, transformRouteString } from '../../components/PageHeader/Outline';
import { getPlayerData } from './Helper';
import { data } from '../../components/Info';
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
