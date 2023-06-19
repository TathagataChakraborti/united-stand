from selenium import webdriver
from selenium.webdriver.chrome.service import Service

from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from datetime import datetime

from schemas.fixture_schemas import *
from schemas.match_schemas import *
from schemas.schemas import *

from read_data_table import read_data_table


class FixtureManager(object):
    def __init__(self, config: Config):

        team_id = config.team_id
        country = config.country

        self.team_name = config.team_name
        self.url = f"https://www.whoscored.com/Teams/{team_id}/TYPE/{country}-{self.team_name.replace(' ', '-')}"

        self.config = config.scraper
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

        self.fixture_list: List[Fixture] = list()
        self.season_data: MatchData = dict()

    def read_season_data(self) -> MatchData:
        url = self.url.replace("TYPE", "Show")
        self.season_data = read_data_table(
            match_id=0,
            url=url,
            driver=self.driver,
            config=ReadConfig(
                timeout=self.config.timeout,
                selector_link='//a[@href="#team-squad-stats-{}"]',
                table_link="statistics-table-{}",
            ),
        )
        return self.season_data

    def read_fixtures(self) -> List[Fixture]:

        url = self.url.replace("TYPE", "Fixtures")

        print(f"==> Attempting to read fixture list from {url}")
        self.driver.get(url)

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
