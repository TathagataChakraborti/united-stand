from who_scored.ws_scraper import path_to_fixture_file, path_to_data, read_yaml
from src.schemas import (
    Data,
    SeasonData,
    MatchData,
    Season,
    WhoScoredMatchData,
    MatchRating,
    PlayerInfo,
    FixtureData,
)

from typing import Dict, List

import glob
import json


def regenerate_data(path_to_all_data: str = ".") -> Data:
    data = Data()
    list_of_player_info = read_yaml(f"{path_to_all_data}/player_info.yaml")

    if list_of_player_info and isinstance(list_of_player_info, List):
        data.player_info = [
            PlayerInfo.parse_obj(item) for item in list_of_player_info
        ]

    for path in glob.glob(f"{path_to_all_data}/who_scored/*/"):
        season_string = path.split("/")[-2]
        season_string_split = season_string.split("-")

        season = Season(
            start=int(season_string_split[0]),
            end=int(season_string_split[1]),
        )

        fixture_data = FixtureData.parse_obj(
            read_yaml(path_to_fixture_file(season))
        )
        season_data = SeasonData(season=season, fixture_data=fixture_data)

        for fixture in fixture_data.fixture_list:
            match_data = MatchData(meta_data=fixture)
            match_id = fixture.match_id

            path_to_ws_data = path_to_data(
                mode="who_scored",
                season=season,
                match_id=match_id,
                allow_duplicate=False,
            )

            temp = read_yaml(path_to_ws_data)
            if temp and isinstance(temp, Dict):
                match_data.who_scored = WhoScoredMatchData.parse_obj(temp)

            path_to_tus_data = path_to_data(
                mode="united_stand",
                season=season,
                match_id=match_id,
                allow_duplicate=False,
            )

            temp = read_yaml(path_to_tus_data)
            if temp and isinstance(temp, Dict):
                match_data.united_stand = MatchRating.parse_obj(temp)

            season_data.match_data.append(match_data)

        data.season_data.append(season_data)

    return data


if __name__ == "__main__":
    parsed_data = regenerate_data(path_to_all_data="../data")

    with open("cached_data/data.json", "w") as write_file:
        json.dump(parsed_data.dict(), write_file, indent=4, default=str)
