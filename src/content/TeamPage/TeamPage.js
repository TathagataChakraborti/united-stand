import React from 'react';
import { OUTLINE, transformRouteString } from '../../components/PageHeader/Outline';
import { Grid, Column, FilterableMultiSelect } from '@carbon/react';

const data = require('../../cached_data/data.json');
const children = OUTLINE.find(item => item.name === 'The Team').children;
const player_names = data.player_info.map(item => item.name);

const DEFAULTS = ['Marcus Rashford', 'Bruno Fernandes'];

class TeamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_selections: DEFAULTS,
        };
    }

    onChange(selections) {
        this.setState({
            ...this.state,
            current_selections: selections.selectedItems,
        });
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
