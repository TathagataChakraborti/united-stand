import React from 'react';
import GitHubButton from 'react-github-btn';
import { Grid, Column, Button, Link } from '@carbon/react';
import { data, tournamentNames, getAllRatings, getAllFixtures } from '../../components/Info';

const allDates = data => {
    const all_votes = getAllFixtures(data);
    return all_votes
        .sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
        })
        .map(item => new Date(item.date));
};

const totalVotes = data => {
    const all_votes = getAllRatings(data);
    return all_votes
        .filter(item => item !== null)
        .filter(item => item.man_of_the_match)
        .reduce((total, item) => (total += item.man_of_the_match.votes), 0);
};

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                        end: 14,
                    }}>
                    <div className="container">
                        <div className="section-start">
                            <h3>About United Stand Data</h3>
                            <hr className="red-line" />
                            <p>
                                This website hosts aggregated data on fan opinion (ratings) of the performances of football players and managers at Manchester
                                United Football Club [
                                <Link className="text-red no-decoration-enforce" href="https://www.manutd.com" target="_blank" rel="noopener noreferrer">
                                    MUFC
                                </Link>
                                ]. The data contains over <span className="text-red">{totalVotes(data)}</span> votes from{' '}
                                <span className="text-red"> {getAllFixtures(data).length}</span> competitive football matches across the{' '}
                                <span className="text-red"> {tournamentNames(data).size}</span> tournaments that Manchester United has participated in from{' '}
                                <span className="text-red">{allDates(data)[0].toDateString()}</span> to{' '}
                                <span className="text-red">{allDates(data)[allDates(data).length - 1].toDateString()}</span>.
                            </p>
                            <br />
                            <p>
                                The data is collected as is from{' '}
                                <Link
                                    className="text-red no-decoration-enforce"
                                    href="https://www.theunitedstand.com"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    The United Stand
                                </Link>
                                , the biggest sports fan channel on the planet with over 1.68M followers on YouTube. The associated match data on in-game player
                                performance is collected as is from{' '}
                                <Link className="text-red no-decoration-enforce" href="https://www.whoscored.com" target="_blank" rel="noopener noreferrer">
                                    WhoScored
                                </Link>
                                , our favorite source of football statistics.
                            </p>
                            <br />
                            <br />
                            <Button
                                href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, 0, 4))}`}
                                download={'the-united-stand-data.json'}
                                className="no-decoration-enforce danger-x-tertiary"
                                size="md"
                                kind="ghost">
                                Export Data
                            </Button>
                        </div>

                        <div className="section-start">
                            <h3>Supporting Us</h3>
                            <hr className="red-line" />
                            <p>
                                If you would like to support this work, please give{' '}
                                <Link className="text-red no-decoration-enforce" href="https://twitter.com/tchakra2" target="_blank" rel="noopener noreferrer">
                                    me
                                </Link>{' '}
                                a follow at on Twitter, or star the source code for this project on GitHub{' '}
                                <Link
                                    className="text-red no-decoration-enforce"
                                    href="https://github.com/TathagataChakraborti/united-stand"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    here
                                </Link>
                                . Starring the code repository helps it to gain visibility and attract more open source contributors. Suggestions, feedback and
                                contributions, including code contributions, are very welcome. Your love keeps me going.{' '}
                                <span role="img" aria-label="hugging face">
                                    &#129303;
                                </span>
                            </p>
                            <div style={{ paddingTop: '30px' }}>
                                <GitHubButton
                                    href="https://github.com/TathagataChakraborti/united-stand"
                                    data-size="large"
                                    data-show-count="true"
                                    aria-label="Stars on GitHub">
                                    Star
                                </GitHubButton>
                            </div>
                        </div>
                    </div>
                </Column>
            </Grid>
        );
    }
}

export default About;
