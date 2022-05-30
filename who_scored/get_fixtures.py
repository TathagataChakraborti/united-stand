from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.common.exceptions import TimeoutException

from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from datetime import datetime

from schemas.fixture_schemas import *
from schemas.match_schemas import *
from schemas.schemas import *


class FixtureManager(object):
    def __init__(self, config: Config):

        team_id = config["team_id"]
        country = config["country"]

        self.team_name = config["team_name"]
        self.url = f"https://www.whoscored.com/Teams/{team_id}/TYPE/{country}-{self.team_name.replace(' ', '-')}"

        self.config = config["scraper"]

        if self.config["browser"] == Browser.CHROME.value:
            self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        else:
            raise NotImplementedError

        self.fixture_list: List[Fixture] = list()
        self.season_data: MatchData = dict()

    def read_season_data(self) -> MatchData:

        url = self.url.replace("TYPE", "Show")
        self.driver.get(url)

        print(f"==> Attempting to read season data from {url}")

        data_types = list(MatchData.__annotations__.keys())
        data_types.remove("match_id")

        for item in data_types:
            try:
                selector = self.driver.find_element(by=By.XPATH, value=f'//a[@href="#team-squad-stats-{item.lower()}"]')
            except TimeoutException as e:
                print(f"Timeout in parsing {url}", e)
                selector = None

            if selector is not None:

                self.driver.execute_script("arguments[0].click();", selector)

                table_id = f"statistics-table-{item.lower()}"
                _ = WebDriverWait(self.driver, self.config.get("timeout", 22)).until(
                    ec.visibility_of_all_elements_located((By.XPATH, f"//div[@id='{table_id}']"))
                )

                soup = BeautifulSoup(self.driver.page_source, features="html.parser")
                table_of_interest = soup.find("div", attrs={"id": table_id})

                table = table_of_interest.find("table")

                headers = table.select("thead th")
                headers = [h.text for h in headers[2:]]

                player_data = list()
                for row in table.select("tbody tr"):

                    row_data = row.select("td")

                    name = row_data[0].select_one("a.player-link span.iconize").text
                    raw_player_info = row_data[0].select("span.player-meta-data")

                    age = int(raw_player_info[0].text)

                    positions = raw_player_info[1].text.strip()
                    positions = [p.strip() for p in positions.split(",") if p.strip()]

                    data = list()
                    for header_id, data_item in enumerate(row_data[2:]):
                        data_item = data_item.text.strip()

                        if data_item == "-":
                            data_item = None

                        elif "(" in data_item and ")" in data_item:
                            data_item = data_item.split("(")
                            primary_data_item = data_item[0].strip()

                            data_item = data_item[1].split(")")
                            secondary_data_item = data_item[0].strip()

                            data_item = [float(primary_data_item), float(secondary_data_item)]

                        else:
                            data_item = float(data_item)

                        data.append(
                            DataItem(
                                name=headers[header_id],
                                value=data_item,
                            )
                        )

                    assert "Headers do not match data", len(data) == len(headers)

                    new_player_data = PlayerData(name=name, age=age, positions=positions, event=None, data=data)
                    player_data.append(new_player_data)

                keymap = table_of_interest.parent.find("div", attrs={"id": f"{table_id}-column-legend"})
                if keymap:
                    keymap = keymap.find("div", attrs={"class": "table-column-legend"})
                    keymap = keymap.find_all("div")
                    keymap = [k.text.split(":") for k in keymap]
                    keymap = {k[0].strip(): k[1].strip() for k in keymap if len(k) == 2}

                data_table = DataTable(
                    headers=headers,
                    player_data=player_data,
                    keymap=keymap,
                )

                self.season_data[item] = data_table  # type: ignore
                print(f"==> Read {item} data for the season...")

        return self.season_data

    def read_fixtures(self) -> List[Fixture]:

        url = self.url.replace("TYPE", "Fixtures")
        self.driver.get(url)

        print(f"==> Attempting to read fixture list from {url}")

        soup = BeautifulSoup(self.driver.page_source, features="html.parser")
        fixture_table = soup.find("div", attrs={"id": "team-fixtures"})

        raw_fixture_list = fixture_table.find_all("div", attrs={"class": "divtable-row"})
        parsed_fixture_list = list()

        for fixture in raw_fixture_list:
            match_id = int(fixture["data-id"])
            form_fixture = fixture.find("div", attrs={"class": "form-fixtures"})

            if form_fixture:
                result_link = form_fixture.find("a")

                url = result_link["href"].split("/")[-1]
                url = f"https://www.whoscored.com/Matches/{match_id}/LiveStatistics/{url}"

                new_date = fixture.find("div", attrs={"class": "date"}).text
                new_date = datetime.strptime(new_date, "%d-%m-%y").date()

                tournament = fixture.find("div", attrs={"class": "tournament"})
                tournament = tournament.find("a").text

                home_team = fixture.find("div", attrs={"class": "home"})
                home_team = home_team.find("a").text

                away_team = fixture.find("div", attrs={"class": "away"})
                away_team = away_team.find("a").text

                if home_team == self.team_name:
                    match_type = MatchType.HOME.value
                    opponent = away_team
                else:
                    match_type = MatchType.AWAY.value
                    opponent = home_team

                score = fixture.find("div", attrs={"class": "result"})
                score = score.find("a").text.split(":")
                score = [s.strip().replace("*", "") for s in score]
                score = [
                    ScoreItem(team_name=away_team if bool(i) else home_team, score=int(s)) for i, s in enumerate(score)
                ]

                parsed_fixture_list.append(
                    Fixture(
                        match_id=match_id,
                        url=url,
                        result=result_link.text.upper(),
                        date=new_date,
                        tournament=tournament,
                        match_type=match_type,
                        opponent=opponent,
                        score=score,
                    )
                )

        print(f"==> {len(parsed_fixture_list)} fixtures parsed")
        return parsed_fixture_list

    @property
    def fixtures(self) -> List[Fixture]:
        return self.fixture_list

    @property
    def player_data(self) -> MatchData:
        return self.season_data
