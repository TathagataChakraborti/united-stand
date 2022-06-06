from datetime import date
from typing import List, Union, TypedDict
from schemas.match_schemas import MatchData
import enum


class Result(enum.Enum):
    WIN = "W"
    DRAW = "D"
    LOSS = "L"


class Tournament(enum.Enum):
    EPL = "EPL"
    UCL = "UCL"
    EFLC = "EFLC"
    FAC = "FAC"


class MatchType(enum.Enum):
    HOME = "HOME"
    AWAY = "AWAY"


class ScoreItem(TypedDict):
    team_name: str
    score: int


class Fixture(TypedDict):
    match_id: int
    url: str
    date: Union[date, str]
    result: Result
    tournament: Tournament
    match_type: MatchType
    opponent: str
    score: List[ScoreItem]

    @classmethod
    def print_score(cls, fixture_object) -> str:  # type: ignore

        matchday = fixture_object["date"]
        home = fixture_object["score"][0]
        away = fixture_object["score"][1]

        return f"{matchday} {home['team_name']} {home['score']} vs {away['score']} {away['team_name']}"


class FixtureData(TypedDict):
    fixture_list: List[Fixture]
    season_data: MatchData
