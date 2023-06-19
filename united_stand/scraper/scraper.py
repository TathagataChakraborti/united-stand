from united_stand.scraper.schemas import Ratings
from who_scored.schemas.schemas import Season, Browser
from typing import List

import os
import yaml
import json


assert NotImplementedError, os.getenv("browser") == Browser.CHROME.value


def scrape_ratings_urls(url: str) -> List[str]:
    list_of_urls = list()
    return list_of_urls


def scrape_ratings(list_of_urls: List[str], bulk: bool = False) -> None:
    path_to_cached_urls = "../../data/united_stand/cached_urls.yaml"

    with open(path_to_cached_urls, "r") as stream:
        try:
            cached_urls = yaml.safe_load(stream)

        except yaml.YAMLError as exc:
            print(exc)

    for index, url in enumerate(list_of_urls):
        print(f"[{index + 1}/{len(list_of_urls)}] Reading {url}.")

        if url in cached_urls:
            print("Already done. Skipping.")

        else:

            match_id = ""
            season = Season
            ratings = Ratings

            path_to_data = (
                f"../../data/united_stand/{season.start}-{season.end}/{match_id}.yaml"
            )

            with open(path_to_data, "w") as f:
                yaml.dump(
                    json.loads(ratings.json()), f, sort_keys=False, allow_unicode=True
                )
                print(f"Wrote ratings to {path_to_data}")

            cached_urls.append(url)
            with open(path_to_cached_urls, "w") as f:
                yaml.dump(cached_urls, f, sort_keys=False, allow_unicode=True)
                print("Updated cached URLs")


if __name__ == "__main__":
    tus_ratings_url = "https://www.theunitedstand.com/articles/match-ratings"
    ratings_urls = scrape_ratings_urls(url=tus_ratings_url)
    scrape_ratings(ratings_urls)
