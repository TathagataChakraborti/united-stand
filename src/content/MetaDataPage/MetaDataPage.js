import React from 'react';
import { LineChart, SimpleBarChart } from '@carbon/charts-react';
import { tournamentNames, fixDate, getAverage, prettyScore } from '../../components/Info';
import {
    Grid,
    Column,
    MultiSelect,
    Link,
    InlineNotification,
    AccordionItem,
    Accordion,
    StructuredListWrapper,
    StructuredListHead,
    StructuredListBody,
    StructuredListRow,
    StructuredListCell,
} from '@carbon/react';

import '@carbon/charts-react/styles.css';

const data = require('../../cached_data/data.json');
const tournaments = Array.from(tournamentNames(data));
const selection_items = tournaments.map(item => {
    return { id: item };
});

const engagement_metrics = ['Views', 'Likes', 'Shares'];
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
    curve: 'curveMonotoneX',
    height: '400px',
};

const getEngagementOptions = engagementType => {
    return {
        ...plotOptions,
        title: 'Engagement Statistics for Season 2022-2023 | ' + engagementType,
        legend: { enabled: false },
    };
};

const getVotesOptions = e => {
    return {
        ...plotOptions,
        title: 'Engagement Statistics Over Time',
        axes: {
            ...plotOptions.axes,
            bottom: {
                ...plotOptions.axes.bottom,
                title: 'Number of Votes',
            },
        },
    };
};

const getAggregateVotesOptions = e => {
    return {
        ...plotOptions,
        title: 'Average Voting Statistics per Match Outcome',
        axes: {
            ...plotOptions.axes,
            left: {
                mapsTo: 'group',
                scaleType: 'labels',
            },
            bottom: plotOptions.axes.left,
        },
        height: '200px',
        legend: { enabled: false },
    };
};

class MetaDataPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_selections: selection_items,
        };
    }

    onChange(selections) {
        this.setState({
            ...this.state,
            current_selections: selections.selectedItems,
        });
    }

    inTournamentSelections(match_data) {
        const current_selections = this.state.current_selections.map(item => item.id);

        return current_selections.indexOf(match_data.meta_data.tournament) > -1;
    }

    filterDataByValidTournaments() {
        return data.season_data.map(season_data => {
            return {
                ...season_data,
                match_data: season_data.match_data.filter(match_data => this.inTournamentSelections(match_data)),
            };
        });
    }

    getEngagementData({ engagementType }) {
        const data_valid_tournaments = this.filterDataByValidTournaments(data);
        const data2023 = data_valid_tournaments.find(item => item.season.end === 2023);

        const filter_by_engagement_type = data2023.match_data.map(item => {
            return {
                group: engagementType,
                date: fixDate(item.meta_data.date),
                value: item.united_stand.meta_data[engagementType.toLowerCase()],
            };
        });

        return filter_by_engagement_type;
    }

    getVotesData() {
        const data_valid_tournaments = this.filterDataByValidTournaments(data);

        const votes_data = data_valid_tournaments
            .map(item => item.match_data)
            .reduce((bag, item) => bag.concat(item), [])
            .filter(item => item.united_stand && item.united_stand.man_of_the_match)
            .map(item => {
                const date = fixDate(item.meta_data.date);
                const result = item.meta_data.result.split('.')[1];

                return {
                    group: result,
                    date: date,
                    value: item.united_stand.man_of_the_match.votes,
                    meta_data: item.meta_data,
                };
            });

        return votes_data;
    }

    getAggregateVotesData() {
        const all_votes_data = this.getVotesData();
        const categories = ['LOSS', 'DRAW', 'WIN'];

        return categories.map(result => {
            return {
                group: result,
                value: getAverage(all_votes_data.filter(v => v.group === result).map(v => v.value)),
            };
        });
    }

    getTopVotesData() {
        var all_votes_data = this.getVotesData();

        all_votes_data.sort(function(a, b) {
            return b.value - a.value;
        });

        return all_votes_data.slice(0, 7);
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
                            <h3 id="tus-by-the-numbers">TUS by the Numbers</h3>
                            <hr className="red-line" />
                            <MultiSelect
                                label={this.state.current_selections.map(item => item.id).join(', ')}
                                id="tournament-multiselect"
                                helperText="Select one or more tournaments"
                                items={selection_items}
                                itemToString={item => item.id}
                                initialSelectedItems={selection_items}
                                selectionFeedback="top-after-reopen"
                                onChange={this.onChange.bind(this)}
                            />
                            <p
                                style={{
                                    marginTop: '20px',
                                    marginBottom: '20px',
                                }}>
                                Post-match TUS engagement peaked with the most memorable games of the season: win at home against Barcelona, and wins against
                                Liverpol and Arsenal after a terrible start to the season. Explore the graphs below to find out more.
                            </p>

                            <Accordion align="start">
                                {engagement_metrics.map((item, id) => (
                                    <AccordionItem className="flush-accordion" key={id} title={item} open={id === 0}>
                                        <br />
                                        <br />
                                        <LineChart
                                            key={item}
                                            data={this.getEngagementData({
                                                engagementType: item,
                                            })}
                                            options={getEngagementOptions(item)}></LineChart>
                                        <br />
                                        <br />
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        <div className="section-start">
                            <h3 id="the-myth-of-negativity">The Myth of Negativity</h3>
                            <hr className="red-line" />
                            <p>
                                The traditional media has always accused football fan channels of thriving on "negativity". Ironically, this argument played out
                                most famously and publicly in a conversation with{' '}
                                <Link className="no-decoration-enforce text-red" href="https://www.youtube.com/watch?v=bp3pGkSvs1k" target="_blank">
                                    Don Robbie of AFTV
                                </Link>
                                , and formerly failed football club chairman of Crystal Palace, Simon Jordan on the latter's programme on TalkSport, a radio
                                station whose own sole business model is predicated on generating outrageous contents to drive engagement. Over time, the
                                traditional media has give up on their smear campaign against fan channels and instead tried to include many of the aforeaccused
                                content creators into their own programmes.
                                <br />
                                <br />
                                Be that as it may, fans of football and consumers of fan content always knew this narrative to be untrue. Fan engagement
                                positively correlates with the team doing well, and vastly overshadows reach to rival fans when the team does poorly. Here
                                below, we can observe this phenomenon in numbers.
                                <br />
                                <br />
                                Note that, we chose the number of votes cast for the Man of the Match as the proxy to the number of votes reported below since
                                this is recorded at the end of the live match review (unless scraped automatically after the fact from the page). Hover or click
                                on the graph legends (W/D/L) below, and select one or more tournaments from the tournament selector above, to explore the data.
                                <br />
                                <br />
                                <SimpleBarChart data={this.getVotesData()} options={getVotesOptions()}></SimpleBarChart>
                            </p>

                            <br />
                            <br />
                            <Grid>
                                <Column sm={4} md={6} lg={8}>
                                    <SimpleBarChart data={this.getAggregateVotesData()} options={getAggregateVotesOptions()}></SimpleBarChart>

                                    <br />
                                    <br />

                                    <InlineNotification
                                        kind="info"
                                        lowContrast
                                        hideCloseButton
                                        subtitle={
                                            <div style={{ marginTop: '10px' }}>
                                                We hope to add to this data with further analysis of what factors drive engagement and to what degree (e.g.
                                                which tournament, how many goals and when, and so on).
                                            </div>
                                        }
                                        timeout={0}
                                        title="Variables and Externalities"
                                    />

                                    <br />
                                    <br />

                                    <InlineNotification
                                        lowContrast
                                        hideCloseButton
                                        subtitle={
                                            <div style={{ marginTop: '10px' }}>
                                                Ideally, we would have liked to draw these numbers with the metrics of views, likes, and shares (as seen above
                                                in the first section) and not the number of votes (cast for the Man of the Match). However, the TUS articles
                                                from previous seasons no longer contain this data.{' '}
                                                <span role="img" aria-label="cry face">
                                                    &#128557;
                                                </span>{' '}
                                                <span role="img" aria-label="cry face">
                                                    &#128557;
                                                </span>
                                            </div>
                                        }
                                        timeout={0}
                                        title="OLDER DATA WANTED"
                                    />
                                </Column>
                                <Column sm={4} md={6} lg={8}>
                                    <StructuredListWrapper ariaLabel="Structured list">
                                        <StructuredListHead>
                                            <StructuredListRow head tabIndex={0}>
                                                <StructuredListCell head>Top 10 Results by Engagement</StructuredListCell>
                                                <StructuredListCell head>Tournament</StructuredListCell>
                                                <StructuredListCell head>Result</StructuredListCell>
                                                <StructuredListCell head>Votes</StructuredListCell>
                                            </StructuredListRow>
                                        </StructuredListHead>
                                        <StructuredListBody>
                                            {this.getTopVotesData().map(item => (
                                                <StructuredListRow tabIndex={0}>
                                                    <StructuredListCell>
                                                        {prettyScore(item.meta_data.score)}
                                                        <br />
                                                        <span className="feedback">{fixDate(item.meta_data.date).toDateString()}</span>
                                                    </StructuredListCell>
                                                    <StructuredListCell>{item.meta_data.tournament}</StructuredListCell>
                                                    <StructuredListCell>{item.group}</StructuredListCell>
                                                    <StructuredListCell>{item.value}</StructuredListCell>
                                                </StructuredListRow>
                                            ))}
                                        </StructuredListBody>
                                    </StructuredListWrapper>
                                </Column>
                            </Grid>
                        </div>
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default MetaDataPage;
