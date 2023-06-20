import bs4.element
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.common.exceptions import TimeoutException

from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

from united_stand.scraper.schemas import Ratings
from who_scored.schemas.schemas import Season, Browser
from typing import List, Optional

import os
import yaml
import json
import time


assert NotImplementedError, os.getenv("browser") == Browser.CHROME.value

path_to_urls = "../../data/united_stand/ratings_urls.yaml"
path_to_cached_urls = "../../data/united_stand/cached_urls.yaml"


def save_list_of_urls(list_of_urls: List[str], filename: str) -> None:
    with open(filename, "w") as f:
        yaml.dump(list_of_urls, f, sort_keys=False, allow_unicode=True)
        print("Updated cached URLs")


def click_agree_button(driver) -> None:
    agree_button_selector = "//button[contains(@class, 'css-47sehv')]"
    agree_button = driver.find_element(by=By.XPATH, value=agree_button_selector)

    if agree_button:
        driver.execute_script("arguments[0].click();", agree_button)


def scrape_ratings_urls(url: str) -> List[str]:
    print(f"==> Attempting to read data from {url}")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get(url)
    click_agree_button(driver)

    older_post_selector = "//button[contains(@class, 'cta dark')]"
    older_posts = driver.find_element(by=By.XPATH, value=older_post_selector)

    while "disabled" not in older_posts.get_attribute("class"):
        driver.execute_script("arguments[0].click();", older_posts)

    ratings_link_selector = "//a[contains(@class, 'match-ratings')]"
    ratings_links = driver.find_elements(by=By.XPATH, value=ratings_link_selector)

    list_of_urls = [item.get_attribute("href") for item in ratings_links]
    save_list_of_urls(list_of_urls, path_to_urls)

    return list_of_urls


def scrape_ratings(
    list_of_urls: Optional[List[str]] = None, bulk: bool = False
) -> None:
    with open(path_to_cached_urls, "r") as stream:
        try:
            cached_urls = yaml.safe_load(stream)
        except Exception as e:
            print(e)

    cached_urls = cached_urls or list()

    if not list_of_urls:
        with open(path_to_urls, "r") as stream:
            try:
                list_of_urls = yaml.safe_load(stream)
            except yaml.YAMLError as exc:
                print(exc)

    for index, url in enumerate(list_of_urls):
        print(f"[{index + 1}/{len(list_of_urls)}] Reading {url}.")

        if url in list_of_urls:
            print("Already done. Skipping.")

        else:

            driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
            driver.get(url)
            click_agree_button(driver)

            author_class = "article-main__info--author_text"
            author_object = driver.find_element(by=By.CLASS_NAME, value=author_class)
            date_object = author_object.find_elements(By.XPATH, "//p")[1]
            _ = date_object.get_attribute("innerText")

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
            save_list_of_urls(cached_urls, path_to_cached_urls)

            if not bulk:
                return


if __name__ == "__main__":
    # tus_ratings_url = "https://www.theunitedstand.com/articles/match-ratings"
    # ratings_urls = scrape_ratings_urls(url=tus_ratings_url)
    # scrape_ratings(ratings_urls)
    scrape_ratings()
