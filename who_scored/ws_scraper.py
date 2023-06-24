from who_scored.get_fixtures import FixtureManager
from who_scored.read_data_table import read_data_table

from who_scored.schemas.fixture_schemas import Fixture, FixtureData
from who_scored.schemas.match_schemas import MatchData, TableReadConfig
from who_scored.schemas.schemas import Config, Season, ScraperConfig, Browser
from typing import Optional

import os
import json
import time
import random
import yaml  # type: ignore


assert os.getenv("browser") == Browser.CHROME.value, "Support for Chrome only."


def determine_bool_value_of_env(name: str) -> bool:
    raw_string = os.getenv(name, "")
    return raw_string.lower() == "true"


def path_to_fixture_file(season: Season) -> str:
    start = season.start
    end = season.end
    return f"../data/who_scored/{start}-{end}/{start}-{end}.yaml"


def path_to_data(
    mode: str, season: Season, match_id: int, allow_duplicate: bool = True
) -> str:
    start = season.start
    end = season.end
    path = f"../data/{mode}/{start}-{end}/match_data/{match_id}"

    if allow_duplicate and os.path.isfile(path):
        print("Duplicate detected!")
        path = f"{path}_alt"

    return f"{path}.yaml"


def get_config() -> Config:
    return Config(
        team_id=int(os.getenv("team_id", 0)),
        team_name=os.getenv("team_name"),
        country=os.getenv("country"),
        league=os.getenv("league"),
        season=Season(
            start=os.getenv("season_start"), end=os.getenv("season_end")
        ),
        scraper=ScraperConfig(
            ws_cache_url=os.getenv("ws_cache_url"),
            summary_only=determine_bool_value_of_env("summary_only"),
            fixtures_only=determine_bool_value_of_env("fixtures_only"),
            browser=Browser.CHROME,
            timeout=int(os.getenv("timeout", 22)),
        ),
    )


def scrape_fixture(config: Config) -> Optional[FixtureData]:
    fixture_file = path_to_fixture_file(config.season)

    if os.path.isfile(fixture_file):
        with open(fixture_file, "r") as stream:
            try:
                return FixtureData.parse_obj(yaml.safe_load(stream))

            except yaml.YAMLError as exc:
                print(exc)
                return None

    else:
        os.makedirs(os.path.dirname(fixture_file), exist_ok=True)

        fixture_object = FixtureManager(config)
        fixture_data = FixtureData(
            fixture_list=fixture_object.read_fixtures(),
            season_data=None
            if config.scraper.fixtures_only
            else fixture_object.read_season_data(),
        )

        with open(fixture_file, "w") as f:
            yaml.dump(
                json.loads(fixture_data.json()),
                f,
                sort_keys=False,
                allow_unicode=True,
            )
            print(f"Wrote fixtures to {fixture_file}")

        return fixture_data


def scrape_match_data(
    fixture_data: FixtureData,
    config: Config,
    bulk: bool = False,
    reverse: bool = False,
) -> None:
    fixture_list = fixture_data.fixture_list
    if reverse:
        fixture_list.reverse()

    for index, fixture in enumerate(fixture_list):
        print(f"[{index+1}/{len(fixture_list)}] {Fixture.print_score(fixture)}")

        mtype = fixture.match_type.lower()
        match_id = fixture.match_id

        season = config.season
        path = path_to_data(
            mode="who_scored",
            season=season,
            match_id=match_id,
            allow_duplicate=False,
        )

        if os.path.isfile(path):
            print(f"{path} already exists. Skipping.")
            continue

        else:
            match_data: MatchData = read_data_table(
                match_id=match_id,
                url=fixture.url,
                driver=None,
                config=TableReadConfig(
                    timeout=config.scraper.timeout,
                    selector_link=f'//a[@href="#live-player-{mtype}-{{}}"]',
                    table_link=f"statistics-table-{mtype}-{{}}",
                ),
            )

            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, "w") as f:
                yaml.dump(
                    json.loads(match_data.json()),
                    f,
                    sort_keys=False,
                    allow_unicode=True,
                )
                print(f"Wrote match data to {path}")

            if not bulk:
                return
            else:
                time.sleep(random.randint(1, 10))


if __name__ == "__main__":
    config_object: Config = get_config()
    fixtures: Optional[FixtureData] = scrape_fixture(config_object)

    if fixtures:
        scrape_match_data(
            fixtures,
            config_object,
            bulk=determine_bool_value_of_env("read_in_bulk"),
            reverse=determine_bool_value_of_env("read_in_reverse"),
        )
