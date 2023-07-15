import React from 'react';
import { LineChart } from '@carbon/charts-react';
import { tournamentNames, getAllRatings, fixDate } from '../../components/Info';
import {
    Grid,
    Column,
    MultiSelect,
    Link,
    InlineNotification,
    AccordionItem,
    Accordion,
} from '@carbon/react';

import '@carbon/charts-react/styles.css';

const data = require('../../cached_data/data.json');
const tournaments = Array.from(tournamentNames(data));
const selection_items = tournaments.map(item => {
    return { id: item };
});

const engagementOptions = {
    title: 'Engagement statistics over time',
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
    legend: { enabled: false },
    curve: 'curveMonotoneX',
    height: '400px',
};

const engagement_metrics = ['Views', 'Likes', 'Shares'];

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

    getEngagementOptions({ engagementType }) {
        return {
            ...engagementOptions,
            title: engagementOptions.title + ' | ' + engagementType,
        };
    }

    getEngagementData({ engagementType }) {
        const current_selections = this.state.current_selections.map(
            item => item.id
        );
        const data2023 = data.season_data.find(
            item => item.season.end === 2023
        );
        const data2023_valid_tournaments = data2023.match_data.filter(
            item => current_selections.indexOf(item.meta_data.tournament) > -1
        );

        const filter_by_engagement_type = data2023_valid_tournaments.map(
            item => {
                const date = new Date(item.meta_data.date);

                return {
                    group: engagementType,
                    date: fixDate(date),
                    value:
                        item.united_stand.meta_data[
                            engagementType.toLowerCase()
                        ],
                };
            }
        );

        return filter_by_engagement_type;
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
                                label={this.state.current_selections
                                    .map(item => item.id)
                                    .join(', ')}
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
                                Post-match TUS engagement peaked with the most
                                memorable games of the season: win at home
                                against Barcelona, and wins against Liverpol and
                                Arsenal after a terrible start to the season.
                                Explore the graphs below to find out more.
                            </p>

                            <Accordion align="start">
                                {engagement_metrics.map((item, id) => (
                                    <AccordionItem
                                        className="flush-accordion"
                                        key={id}
                                        title={item}
                                        open={id === 0}>
                                        <br />
                                        <br />
                                        <LineChart
                                            key={item}
                                            data={this.getEngagementData({
                                                engagementType: item,
                                            })}
                                            options={this.getEngagementOptions({
                                                engagementType: item,
                                            })}></LineChart>
                                        <br />
                                        <br />
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        <div className="section-start">
                            <h3 id="the-myth-of-negativity">
                                The Myth of Negativity
                            </h3>
                            <hr className="red-line" />
                            <p>
                                The traditional media has always accused
                                football fan channels of thriving on
                                "negativity". Ironically, this argument played
                                out most famously and publicly in a conversation
                                with{' '}
                                <Link
                                    className="no-decoration-enforce text-red"
                                    href="https://www.youtube.com/watch?v=bp3pGkSvs1k"
                                    target="_blank">
                                    Robbie of AFTV
                                </Link>
                                , and formerly failed football club chairman of
                                Crystal Palace, Simon Jordan on the latter's
                                programme on TalkSport, a radio station whose
                                own sole business model is predicated on
                                generating outrageous contents to drive
                                engagement. Over time, the traditional media has
                                give up on their smear campaign against fan
                                channels and instead tried to include many of
                                the aforeaccused content creators into their own
                                programmes.
                                <br />
                                <br />
                                Be that as it may, fans of football and
                                consumers of fan content always knew this
                                narrative to be untrue. Fan engagement
                                positively correlates with the team doing well,
                                and vastly overshadows reach to rival fans when
                                the team does poorly. Here below, we can observe
                                this phenomenon in numbers. Note that, we chose
                                the number of votes cast for the Man of the
                                Match as the proxy to the number of votes
                                reported below since this is recorded at the end
                                of the live match review (unless scraped after
                                the fact from the page).
                            </p>
                        </div>

                        <InlineNotification
                            kind="info"
                            lowContrast
                            hideCloseButton
                            subtitle={
                                <div style={{ marginTop: '10px' }}>
                                    We hope to add to this data with further
                                    analysis of what factors drive engagement
                                    and to what degree (e.g. which tournament,
                                    how many goals and when, and so on).
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
                                    Ideally, we would have liked to draw these
                                    numbers with the metrics of views, likes,
                                    and shares (as seen above in the first
                                    section) and not the number of votes (cast
                                    for the Man of the Match). However, the TUS
                                    articles from previous seasons no longer
                                    contain this data.{' '}
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
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default MetaDataPage;
