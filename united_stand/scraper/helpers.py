from selenium.webdriver.common.by import By
from who_scored.schemas.fixture_schemas import FixtureData, Fixture
from datetime import datetime


def click_agree_button(driver) -> None:
    agree_button_selector = "//button[contains(@class, 'css-47sehv')]"
    agree_button = driver.find_element(by=By.XPATH, value=agree_button_selector)

    if agree_button:
        driver.execute_script("arguments[0].click();", agree_button)


def get_date_of_match(driver) -> datetime.date:
    author_class = "article-main__info--author_text"
    author_object = driver.find_element(by=By.CLASS_NAME, value=author_class)

    date_object = author_object.find_elements(By.XPATH, "p")[1]
    date_string = date_object.get_attribute("innerText")

    date = datetime.strptime(date_string, "%d/%m/%Y").date()
    return date


def get_match_id_from_date(date: datetime.date, fixture_data: FixtureData) -> int:
    date_string = date.strftime("%Y-%m-%d")
    date = datetime.strptime(date_string, "%Y-%m-%d").date()

    fixture: Fixture = list(filter(lambda x: x.date == date, fixture_data.fixture_list))[0]

    return fixture.match_id
