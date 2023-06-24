from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from typing import List, Tuple, Optional

from who_scored.schemas.schemas import Season, Browser, Config
from who_scored.schemas.fixture_schemas import FixtureData
from who_scored.ws_scraper import (
    get_config,
    path_to_fixture_file,
    path_to_data,
    determine_bool_value_of_env,
)

from united_stand.schemas.schemas import MatchRating, MetaData, MoM
from united_stand.helpers import (
    click_agree_button,
    get_date_of_match,
    get_match_id_from_date,
    get_meta_data,
    get_page_read_ready,
    read_ratings,
    read_mom,
)

import os
import json
import time
import random
import yaml  # type: ignore


assert os.getenv("browser") == Browser.CHROME.value, "Support for Chrome only."


def get_url_paths(season: Season) -> Tuple[str, str]:
    start = season.start
    end = season.end

    path_to_urls = f"../data/united_stand/{start}-{end}/ratings_urls.yaml"
    path_to_cached_urls = f"../data/united_stand/{start}-{end}/cached_urls.yaml"

    return path_to_urls, path_to_cached_urls


def save_list_of_urls(list_of_urls: List[str], filename: str) -> None:
    with open(filename, "w") as f:
        yaml.dump(list_of_urls, f, sort_keys=False, allow_unicode=True)
        print("Updated cached URLs")


def scrape_ratings_urls(config: Config, url: str) -> List[str]:
    print(f"==> Attempting to read data from {url}")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get(url)
    click_agree_button(driver)

    older_post_selector = "//button[contains(@class, 'cta dark')]"
    older_posts = driver.find_element(by=By.XPATH, value=older_post_selector)

    while "disabled" not in older_posts.get_attribute("class"):
        driver.execute_script("arguments[0].click();", older_posts)

    ratings_link_selector = "//a[contains(@class, 'match-ratings')]"
    ratings_links = driver.find_elements(
        by=By.XPATH, value=ratings_link_selector
    )

    list_of_urls = [item.get_attribute("href") for item in ratings_links]
    path_to_urls, _ = get_url_paths(config.season)
    save_list_of_urls(list_of_urls, path_to_urls)

    return list_of_urls


def scrape_ratings(
    config: Config,
    list_of_urls: List[str],
    bulk: bool = False,
    reverse: bool = False,
) -> None:
    _, path_to_cached_urls = get_url_paths(config.season)
    with open(path_to_cached_urls, "r") as stream:
        try:
            cached_urls = yaml.safe_load(stream)
        except Exception as e:
            print(e)

    cached_urls = cached_urls or list()
    fixture_file = path_to_fixture_file(config.season)
    fixture_data: Optional[FixtureData] = None

    if os.path.isfile(fixture_file):
        with open(fixture_file, "r") as stream:
            try:
                fixture_data = FixtureData.parse_obj(yaml.safe_load(stream))

            except yaml.YAMLError as exc:
                raise exc

    if reverse:
        list_of_urls.reverse()

    for index, url in enumerate(list_of_urls):
        print(f"[{index + 1}/{len(list_of_urls)}] Reading {url}.")

        if url in cached_urls:
            print("Already done. Skipping.")

        else:
            driver = webdriver.Chrome(
                service=Service(ChromeDriverManager().install())
            )

            driver.get(url)
            click_agree_button(driver)

            date = get_date_of_match(driver)
            match_id = get_match_id_from_date(date, fixture_data)

            if match_id:
                get_page_read_ready(driver)
                time.sleep(2.0)

                meta_data: MetaData = get_meta_data(driver)
                mom_data: MoM = read_mom(driver)
                manager_rating, ratings = read_ratings(driver)

                match_ratings = MatchRating(
                    match_id=match_id,
                    meta_data=meta_data,
                    man_of_the_match=mom_data,
                    manager_rating=manager_rating,
                    ratings=ratings,
                )

                path = path_to_data(
                    mode="united_stand",
                    season=config.season,
                    match_id=match_id,
                    allow_duplicate=True,
                )

                os.makedirs(os.path.dirname(path), exist_ok=True)
                with open(path, "w") as f:
                    yaml.dump(
                        json.loads(match_ratings.json()),
                        f,
                        sort_keys=False,
                        allow_unicode=True,
                    )
                    print(f"Wrote ratings to {path}")

                cached_urls.append(url)
                save_list_of_urls(cached_urls, path_to_cached_urls)

                if not bulk:
                    return
                else:
                    time.sleep(random.randint(1, 10))


if __name__ == "__main__":
    read_config: Config = get_config()
    url_path, _ = get_url_paths(read_config.season)

    # TODO: Abstract to configuration
    # tus_ratings_url = os.getenv("tus_ratings_url")
    # ratings_urls = scrape_ratings_urls(read_config, tus_ratings_url)
    # scrape_ratings(ratings_urls)

    with open(url_path, "r") as s:
        try:
            urls = yaml.safe_load(s)
            scrape_ratings(
                read_config,
                urls,
                bulk=determine_bool_value_of_env("read_in_bulk"),
                reverse=determine_bool_value_of_env("read_in_reverse"),
            )
        except yaml.YAMLError as err:
            print(err)
