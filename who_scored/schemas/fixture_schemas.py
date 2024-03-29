from datetime import date
from typing import List, Union, Optional
from pydantic import BaseModel
from enum import Enum

from who_scored.schemas.match_schemas import MatchData


class Result(Enum):
    WIN = "W"
    DRAW = "D"
    LOSS = "L"

    class Config:
        use_enum_values = True


class Tournament(str, Enum):
    EPL = "EPL"
    UCL = "UCL"
    UEL = "UEL"
    EFLC = "EFLC"
    FAC = "FAC"

    class Config:
        use_enum_values = True


class MatchType(str, Enum):
    HOME = "HOME"
    AWAY = "AWAY"

    class Config:
        use_enum_values = True


class ScoreItem(BaseModel):
    team_name: str
    score: int


class Fixture(BaseModel):
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
        matchday = fixture_object.date
        home = fixture_object.score[0]
        away = fixture_object.score[1]

        return f"{matchday} {home.team_name} {home.score} vs {away.score} {away.team_name}"


class FixtureData(BaseModel):
    fixture_list: List[Fixture]
    season_data: Optional[MatchData] = None
