function generateImageUrl(imageUrl) {
    return `url(${process.env.PUBLIC_URL}/images/${imageUrl}.png)`;
}

function getAverage(array) {
    const sum = array.reduce((total, item) => total + item, 0);
    return sum / array.length;
}

function prettyScore(score) {
    return 'home home_score-away_score away'
        .replace('home', score[0].team_name)
        .replace('home_score', score[0].score)
        .replace('away_score', score[1].score)
        .replace('away', score[1].team_name);
}

function fixDate(date_string) {
    const date = new Date(date_string);
    date.setDate(date.getDate() + 1);
    return date;
}

function getAllRatings(data) {
    return data.season_data
        .map(item => item.match_data.map(item => item.united_stand))
        .reduce((tournaments, item) => tournaments.concat(item), []);
}

function getAllFixtures(data) {
    return data.season_data
        .map(item => item.fixture_data.fixture_list)
        .reduce((bag, item) => bag.concat(item), []);
}

function tournamentNames(data) {
    const all_fixtures = getAllFixtures(data);
    return new Set(all_fixtures.map(item => item.tournament));
}

export {
    generateImageUrl,
    getAverage,
    prettyScore,
    fixDate,
    getAllRatings,
    getAllFixtures,
    tournamentNames,
};
