import { data, fixDate } from '../../components/Info';
import { stringSimilarity } from 'string-similarity-js';

const player_names = data.player_info.map(item => item.name);
const player_data = {};

player_names.forEach(name => {
    player_data[name] = cachePlayerData(name);
});

function getCanonicalPlayerName(name) {
    var temp = player_names
        .map(item => {
            var name_split = item.split(' ');
            var new_name = name;

            if (name_split.length === 1) {
                new_name = name.split(' ')[0];
            }

            return {
                name: item,
                similarity: stringSimilarity(item, new_name, 1),
            };
        })
        .filter(item => item.similarity > 0.4);

    temp.sort(function(a, b) {
        return b.similarity - a.similarity;
    });

    return temp[0].name;
}

function getRatingObject(name, ratings) {
    if (!ratings) return null;
    return ratings.find(item => name === getCanonicalPlayerName(item.rating.name));
}

function getAllMatchData(data) {
    return data.season_data.reduce((bag, item) => bag.concat(item.match_data), []);
}

function getPlayerData(name) {
    return player_data[name];
}

function cachePlayerData(name) {
    const all_season_data = getAllMatchData(data);

    all_season_data.sort(function(a, b) {
        return fixDate(a.meta_data.date) - fixDate(b.meta_data.date);
    });

    return all_season_data
        .filter(item => item.united_stand && item.united_stand.ratings)
        .map(item => {
            const rating_object = getRatingObject(name, item.united_stand.ratings);

            return {
                group: name,
                value: rating_object ? parseFloat(rating_object.rating.rating) : null,
                is_sub: rating_object ? rating_object.substitute : null,
                date: fixDate(item.meta_data.date),
            };
        })
        .filter(item => item.value !== null);
}

export { getCanonicalPlayerName, getRatingObject, getAllMatchData, getPlayerData };
