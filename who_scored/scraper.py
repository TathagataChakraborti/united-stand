from get_fixtures import FixtureManager
from read_data_table import read_data_table

from schemas.fixture_schemas import Fixture, FixtureData
from schemas.match_schemas import MatchData, ReadConfig
from schemas.schemas import Config, Season, ScraperConfig, Browser
from typing import List

import os
import yaml
import random
import json
import time


assert NotImplementedError, os.getenv("browser") == Browser.CHROME.value


def scrape_fixture(config: Config) -> None:
    fixture_object = FixtureManager(config)
    fixture_data = FixtureData(
        fixture_list=fixture_object.read_fixtures(),
        season_data=fixture_object.read_season_data(),
    )

    start = config.season.start
    end = config.season.end

    fixture_file = f'../data/who_scored/{start}-{end}/{start}-{end}.json'
    os.makedirs(os.path.dirname(fixture_file), exist_ok=True)

    with open(fixture_file, "w") as f:
        yaml.dump(json.loads(fixture_data.json()), f, sort_keys=False, allow_unicode=True)
        print(f"Wrote fixtures to {fixture_file}")


def scrape_match_data(config: Config) -> None:
    fixtures: List[Fixture] = list()
    data: List[MatchData] = list()

    with open(fixtures, "r") as stream:
        try:

            fixture_data = yaml.safe_load(stream)
            fixtures = fixture_data["fixture_list"]

        except yaml.YAMLError as exc:
            print(exc)

    season = config.season
    path_to_data = f'../data/who_scored/{season.start}-{season.end}/match_data.yaml'

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


if __name__ == "__main__":

    config_object = Config(
        team_id=int(os.getenv("team_id")),
        team_name=os.getenv("team_name"),
        country=os.getenv("country"),
        league=os.getenv("league"),
        season=Season(start=os.getenv("season_start"), end=os.getenv("season_end")),
        scraper=ScraperConfig(browser=Browser.CHROME, timeout=int(os.getenv("timeout"))),
    )

    scrape_fixture(config_object)
