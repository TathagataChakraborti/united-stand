from who_scored.get_fixtures import FixtureManager
from who_scored.read_data_table import read_data_table

from who_scored.schemas.fixture_schemas import Fixture, FixtureData
from who_scored.schemas.match_schemas import MatchData, ReadConfig
from who_scored.schemas.schemas import Config, Season, ScraperConfig, Browser
from typing import Optional

import os
import yaml
import json


assert NotImplementedError, os.getenv("browser") == Browser.CHROME.value


def scrape_fixture(config: Config) -> Optional[FixtureData]:
    start = config.season.start
    end = config.season.end

    fixture_file = f"../data/who_scored/{start}-{end}/{start}-{end}.yaml"

    if os.path.isfile(fixture_file):
        with open(fixture_file, "r") as stream:
            try:
                return FixtureData.parse_obj(yaml.safe_load(stream))

            except yaml.YAMLError as exc:
                print(exc)
                return

    else:
        os.makedirs(os.path.dirname(fixture_file), exist_ok=True)

        fixture_object = FixtureManager(config)
        fixture_data = FixtureData(
            fixture_list=fixture_object.read_fixtures(),
            season_data=fixture_object.read_season_data(),
        )

        with open(fixture_file, "w") as f:
            yaml.dump(
                json.loads(fixture_data.json()), f, sort_keys=False, allow_unicode=True
            )
            print(f"Wrote fixtures to {fixture_file}")

        return fixture_data


def scrape_match_data(
    fixture_data: FixtureData, config: Config, bulk: bool = False
) -> None:
    for index, fixture in enumerate(fixture_data.fixture_list):
        print(
            f"[{index+1}/{len(fixture_data.fixture_list)}] {Fixture.print_score(fixture)}"
        )

        match_type = fixture.match_type.lower()
        match_id = fixture.match_id

        season = config.season
        path_to_data = (
            f"../data/who_scored/{season.start}-{season.end}/match_data/{match_id}.yaml"
        )

        if os.path.isfile(path_to_data):
            print(f"{path_to_data} already exists. Skipping.")
            continue

        else:
            match_data: MatchData = read_data_table(
                match_id=match_id,
                url=fixture.url,
                driver=None,
                config=ReadConfig(
                    timeout=config.scraper.timeout,
                    selector_link=f'//a[@href="#live-player-{match_type}-{{}}"]',
                    table_link=f"statistics-table-{match_type}-{{}}",
                ),
            )

            os.makedirs(os.path.dirname(path_to_data), exist_ok=True)

            with open(path_to_data, "w") as f:
                yaml.dump(
                    json.loads(match_data.json()),
                    f,
                    sort_keys=False,
                    allow_unicode=True,
                )
                print(f"Wrote match data to {path_to_data}")

            if not bulk:
                return


if __name__ == "__main__":

    config_object = Config(
        team_id=int(os.getenv("team_id")),
        team_name=os.getenv("team_name"),
        country=os.getenv("country"),
        league=os.getenv("league"),
        season=Season(start=os.getenv("season_start"), end=os.getenv("season_end")),
        scraper=ScraperConfig(
            browser=Browser.CHROME, timeout=int(os.getenv("timeout"))
        ),
    )

    fixtures: FixtureData = scrape_fixture(config_object)

    if fixtures:
        scrape_match_data(fixtures, config_object)
