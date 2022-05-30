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


class FixtureData(TypedDict):
    fixture_list: List[Fixture]
    season_data: MatchData
