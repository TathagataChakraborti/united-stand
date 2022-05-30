from get_fixtures import FixtureManager
from schemas.fixture_schemas import *
from schemas.match_schemas import *
from schemas.schemas import *

import os
import yaml
import argparse

if __name__ == "__main__":

    parser = argparse.ArgumentParser(description="Generate fixtures data.")
    parser.add_argument("--file", type=str, help="Relative path to config file.")
    parser.add_argument("--fixtures", type=str, help="Fixture data.")

    args = parser.parse_args()

    path_to_config_file = args.file or "config.yaml"

    with open(path_to_config_file, "r") as stream:
        try:
            config: Config = yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)

    if args.fixtures:
        fixtures: List[Fixture] = list()
        data: List[MatchData] = list()

        with open(args.fixtures, "r") as stream:
            try:

                fixture_data = yaml.safe_load(stream)
                fixtures = fixture_data["fixture_list"]

            except yaml.YAMLError as exc:
                print(exc)

        for index, fixture in enumerate(fixtures):
            print(f"Reading {index}/{len(fixtures)} match.")

            match_data: MatchData = dict()
            data.append(match_data)

        season = config["season"]
        path_to_data = f'../data/who_scored/{season["start"]}-{season["start"]}-match_data.yaml'
        os.makedirs(os.path.dirname(path_to_data), exist_ok=True)

        with open(path_to_data, "w") as f:
            yaml.dump(data, f, sort_keys=False)
            print(f"Wrote match data to {path_to_data}")

    else:

        fixture_object = FixtureManager(config)
        fixture_data = FixtureData(
            fixture_list=fixture_object.read_fixtures(),
            season_data=fixture_object.read_season_data(),
        )

        season = config["season"]
        fixture_file = f'../data/who_scored/{season["start"]}-{season["start"]}-season-data.yaml'
        os.makedirs(os.path.dirname(fixture_file), exist_ok=True)

        with open(fixture_file, "w") as f:
            yaml.dump(fixture_data, f, sort_keys=False)
            print(f"Wrote fixtures to {fixture_file}")
