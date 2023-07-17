import { getAllMatchData } from '../TheTeam/Helper';
import { data, sortHelper, fixDate } from '../../components/Info';

function getManagerData() {
    var all_match_data = getAllMatchData(data);
    var manager_data = {};

    all_match_data
        .filter(item => item.united_stand && item.united_stand.manager_rating)
        .forEach(item => {
            const manager_name = item.united_stand.manager_rating.rating.name;
            const new_rating = {
                group: manager_name,
                date: fixDate(item.meta_data.date),
                rating: item.united_stand.manager_rating.rating.rating,
                team_ratings: item.united_stand.ratings ? item.united_stand.ratings : [],
            };

            if (manager_name in manager_data) {
                manager_data[manager_name].push(new_rating);
            } else {
                manager_data[manager_name] = [new_rating];
            }
        });

    Object.keys(manager_data).forEach(item => {
        manager_data[item] = sortHelper({ data: manager_data[item], key: 'date', reverse: true });
    });

    return manager_data;
}

export { getManagerData };
