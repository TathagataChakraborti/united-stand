from selenium.webdriver.common.by import By
from selenium import webdriver
from who_scored.schemas.fixture_schemas import FixtureData, Fixture
from united_stand.processors import process_k
from united_stand.schemas.schemas import (
    MetaData,
    PlayerRating,
    ManagerRating,
    Rating,
    MoM,
)

from datetime import date, datetime
from typing import List, Tuple, Optional, Any

import time


def get_date_of_match(driver: webdriver.Chrome) -> date:
    author_class = "article-main__info--author_text"
    author_object = driver.find_element(by=By.CLASS_NAME, value=author_class)

    date_object = author_object.find_elements(By.XPATH, "p")[1]
    date_string = date_object.get_attribute("innerText")

    date_object = datetime.strptime(date_string, "%d/%m/%Y").date()
    return date_object


def read_obj_by_classname(ref_obj: Any, classname: str) -> str:
    try:
        obj = ref_obj.find_element(by=By.CLASS_NAME, value=classname)
        splits = obj.find_elements(by=By.XPATH, value="span")

        if len(splits):
            splits = [s.get_attribute("innerText").strip() for s in splits]
            return " ".join(splits).strip()
        else:
            return obj.get_attribute("innerText").strip()

    except (Exception,):
        return ""


def get_match_id_from_date(
    date_object: date, fixture_data: Optional[FixtureData]
) -> Optional[int]:
    if not fixture_data:
        return None

    date_string = date_object.strftime("%Y-%m-%d")
    new_date_obj = datetime.strptime(date_string, "%Y-%m-%d").date()

    fixture: List[Fixture] = list(
        filter(lambda x: x.date == new_date_obj, fixture_data.fixture_list)
    )

    if len(fixture):
        return fixture[0].match_id

    else:
        return None


def click_agree_button(driver: webdriver.Chrome) -> None:
    agree_button_selector = "//button[contains(@class, 'css-47sehv')]"
    agree_button = driver.find_element(by=By.XPATH, value=agree_button_selector)

    if agree_button:
        driver.execute_script("arguments[0].click();", agree_button)


def get_page_read_ready(driver: webdriver.Chrome) -> None:
    player_class = "article-main__content--players_card"
    player_cards = driver.find_elements(by=By.CLASS_NAME, value=player_class)

    for card in player_cards:
        score_area_class = "player-info__score"
        score_area = card.find_element(by=By.CLASS_NAME, value=score_area_class)

        score_options = score_area.find_elements(by=By.XPATH, value="div")
        set_score_option = score_options[-1]
        set_score_button = set_score_option.find_element(
            by=By.XPATH, value="button"
        )

        driver.execute_script("arguments[0].click();", set_score_button)

        mom_option = card.find_element(
            by=By.CLASS_NAME, value="player-info__bottom--motm"
        )
        driver.execute_script("arguments[0].click();", mom_option)

    submit_button_class = "article-main__content--players_result"
    submit_area = driver.find_element(
        by=By.CLASS_NAME, value=submit_button_class
    )

    submit_button = submit_area.find_element(by=By.XPATH, value="button")
    driver.execute_script("arguments[0].click();", submit_button)


def get_meta_data(driver: webdriver.Chrome) -> MetaData:
    stats_class = "article-main__content--stats"
    stats_object = driver.find_element(by=By.CLASS_NAME, value=stats_class)

    keys = list(MetaData.__fields__.keys())
    obj = dict()

    for i, item in enumerate(stats_object.find_elements(By.XPATH, "div")):
        target = item.find_element(By.XPATH, "span")
        obj[keys[i]] = process_k(target.get_attribute("innerText"))

    meta_data = MetaData(**obj)
    return meta_data


def read_ratings(
    driver: webdriver.Chrome,
) -> Tuple[Optional[ManagerRating], List[PlayerRating]]:
    def get_manager_id() -> int:
        black_classes = [
            "black" in c.get_attribute("class") for c in player_cards
        ]
        if any(black_classes):
            return black_classes.index(True)
        else:
            return len(player_cards) - 1

    time.sleep(1.0)

    player_class = "article-main__content--players_card"
    player_cards = driver.find_elements(by=By.CLASS_NAME, value=player_class)

    list_of_ratings = list()
    manager_rating: Optional[ManagerRating] = None
    manager_id = get_manager_id()

    for i, card in enumerate(player_cards):
        rating = Rating(
            name=read_obj_by_classname(card, "player-info__name"),
            rating=float(
                read_obj_by_classname(card, "player-info__bottom--score")
            ),
            votes=process_k(
                read_obj_by_classname(card, "player-info__bottom--votes_number")
            ),
        )

        if i == manager_id:
            manager_rating = ManagerRating(
                rating=rating,
            )

        else:
            position = read_obj_by_classname(card, "profile-pic__position")
            sub = (
                read_obj_by_classname(card, "player-info__sub") == "SUBSTITUTE"
            )

            list_of_ratings.append(
                PlayerRating(
                    substitute=sub,
                    position=position,
                    rating=rating,
                )
            )

    return manager_rating, list_of_ratings


def read_mom(driver: webdriver.Chrome) -> MoM:
    time.sleep(1.0)

    mom_class = "article-main__content--players_motm"
    mom_object = driver.find_element(by=By.CLASS_NAME, value=mom_class)

    obj = mom_object.find_element(by=By.CLASS_NAME, value="player-name")
    name = obj.get_attribute("innerText")

    obj = mom_object.find_element(by=By.CLASS_NAME, value="motm-percentage")
    percentage = obj.get_attribute("innerText")
    percentage = int(percentage.replace("%", ""))

    obj = mom_object.find_element(by=By.CLASS_NAME, value="motm-votes")
    obj = obj.find_element(by=By.XPATH, value="span")
    votes = process_k(obj.get_attribute("innerText"))

    mom_object = MoM(
        name=name,
        percentage=percentage,
        votes=votes,
    )

    return mom_object
