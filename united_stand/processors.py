from who_scored.schemas.match_schemas import MatchData, DataTable
from who_scored.schemas.fixture_schemas import FixtureData
from who_scored.ws_scraper import read_yaml
from united_stand.schemas.schemas import PlayerInfo, PlayerSeasonInfo, Season
from typing import List

import os
import yaml  # type: ignore


def process_k(raw_string: str) -> int:
    if raw_string.endswith("k"):
        raw_string = raw_string[:-1]
        return int(1000 * float(raw_string))
    else:
        return int(raw_string)


def generate_player_info() -> None:
    player_infos: List[PlayerInfo] = list()

    for dirpath, dirnames, filenames in os.walk("../data/who_scored"):
        for dirname in dirnames:
            filename = f"{dirpath}/{dirname}/{dirname}.yaml"

            start = int(dirname.split("-")[0])
            end = int(dirname.split("-")[1])
            season = Season(start=start, end=end)

            fixture_data = FixtureData.parse_obj(read_yaml(filename))
            season_data: MatchData = fixture_data.season_data

            data_table: DataTable = season_data.Summary
            for player_data in data_table.player_data:
                name = player_data.name
                player_season_info = PlayerSeasonInfo(
                    season=season,
                    age=int(player_data.age),
                    positions=player_data.positions,
                )

                old_player_data = list(
                    filter(lambda x: x.name == name, player_infos)
                )

                if len(old_player_data) > 0:
                    old_player_data[0].seasons.append(player_season_info)

                else:
                    new_played_data = PlayerInfo(
                        name=name, seasons=[player_season_info]
                    )

                    player_infos.append(new_played_data)

        break

    player_info_file = "../data/player_info.yaml"
    os.makedirs(os.path.dirname(player_info_file), exist_ok=True)

    with open(player_info_file, "w") as f:
        yaml.dump(
            [item.dict() for item in player_infos],
            f,
            sort_keys=False,
            allow_unicode=True,
        )
        print(f"Wrote fixtures to {player_info_file}")


if __name__ == "__main__":
    generate_player_info()
