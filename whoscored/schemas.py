from datetime import datetime
from typing import List, Dict, TypedDict
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
    date: datetime
    result: Result
    tournament: Tournament
    match_type: MatchType
    opponent: str
    score: List[ScoreItem]


class Season(TypedDict):
    start: int
    end: int


class Config(TypedDict):
    team_id: int
    team_name: str
    country: str
    league: str
    season: Season
