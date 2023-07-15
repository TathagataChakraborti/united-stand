function generateImageUrl(imageUrl) {
    return `url(${process.env.PUBLIC_URL}/images/${imageUrl}.png)`;
}

function fixDate(date) {
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
    getAllRatings,
    getAllFixtures,
    tournamentNames,
    fixDate,
};
