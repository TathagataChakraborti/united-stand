import time

from get_fixtures import FixtureManager
from read_data_table import read_data_table

from schemas.fixture_schemas import *
from schemas.match_schemas import *
from schemas.schemas import *

import os
import yaml
import argparse
import random

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

    assert NotImplementedError, config["scraper"]["browser"] == Browser.CHROME.value

    if args.fixtures:
        fixtures: List[Fixture] = list()
        data: List[MatchData] = list()

        with open(args.fixtures, "r") as stream:
            try:

                fixture_data = yaml.safe_load(stream)
                fixtures = fixture_data["fixture_list"]

            except yaml.YAMLError as exc:
                print(exc)

        season = config["season"]
        path_to_data = f'../data/who_scored/{season["start"]}-{season["start"]}-match_data.yaml'

        if os.path.isfile(path_to_data):

            with open(path_to_data, "r") as stream:
                try:
                    stored_data = yaml.safe_load(stream)
                except yaml.YAMLError as exc:
                    print(exc)
        else:
            os.makedirs(os.path.dirname(path_to_data), exist_ok=True)

        for index, fixture in enumerate(fixtures):
            print(f"[{index+1}/{len(fixtures)}] {Fixture.print_score(fixture)}")  # type: ignore

            match_type = fixture["match_type"].lower()
            match_id = fixture["match_id"]

            stored_match_data = list(filter(lambda x: x["match_id"] == match_id, stored_data))

            if not stored_match_data:
                match_data: MatchData = read_data_table(
                    match_id=match_id,
                    url=fixture["url"],
                    driver=None,
                    config=ReadConfig(
                        timeout=config["scraper"]["timeout"],
                        selector_link=f'//a[@href="#live-player-{match_type}-{{}}"]',
                        table_link=f"statistics-table-{match_type}-{{}}",
                    ),
                )
            else:
                print("Reusing stored data.")
                match_data = stored_match_data[0]

            data.append(match_data)
            time.sleep(random.randint(1, 10))

            with open(path_to_data, "w") as f:
                yaml.dump(data, f, sort_keys=False, allow_unicode=True)
                print(f"Wrote match data to {path_to_data}")

            exit(0)
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
            yaml.dump(fixture_data, f, sort_keys=False, allow_unicode=True)
            print(f"Wrote fixtures to {fixture_file}")
