from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

from schemas import *


class FixtureManager(object):
    def __init__(self, config: Config):

        self.team_name = config["team_name"]

        team_id = config["team_id"]
        country = config["country"]
        team_name = self.team_name.replace(" ", "-")

        self.url = (
            f"https://www.whoscored.com/Teams/{team_id}/Fixtures/{country}-{team_name}"
        )
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

        self.fixture_list = self.read_fixtures()

    def read_fixtures(self):

        print(f"==> Attempting to read fixture list from {self.url}")

        self.driver.get(self.url)
        soup = BeautifulSoup(self.driver.page_source, features="html.parser")

        fixture_table = soup.find("div", attrs={"id": "team-fixtures"})
        raw_fixture_list = fixture_table.find_all(
            "div", attrs={"class": "divtable-row"}
        )
        parsed_fixture_list = list()

        for fixture in raw_fixture_list:
            match_id = int(fixture["data-id"])
            form_fixture = fixture.find("div", attrs={"class": "form-fixtures"})

            if form_fixture:
                result_link = form_fixture.find("a")

                url = result_link["href"].split("/")[-1]
                url = f"https://www.whoscored.com/Matches/{match_id}/PlayerStatistics/{url}"

                date = fixture.find("div", attrs={"class": "date"}).text
                date = datetime.strptime(date, "%d-%m-%y").date()

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
                    ScoreItem(
                        team_name=away_team if bool(i) else home_team, score=int(s)
                    )
                    for i, s in enumerate(score)
                ]

                parsed_fixture_list.append(
                    Fixture(
                        match_id=match_id,
                        url=url,
                        result=result_link.text.upper(),
                        date=date,
                        tournament=tournament,
                        match_type=match_type,
                        opponent=opponent,
                        score=score,
                    )
                )

        print(f"==> {len(parsed_fixture_list)} fixtures parsed")
        return parsed_fixture_list

    def get_fixtures(self) -> List[Fixture]:
        return self.fixture_list
