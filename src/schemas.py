from pydantic import BaseModel
from typing import List, Optional

from who_scored.schemas.schemas import Season
from who_scored.schemas.fixture_schemas import FixtureData
from who_scored.schemas.match_schemas import MatchData as WhoScoredMatchData
from united_stand.schemas.schemas import MatchRating, PlayerInfo


class MatchData(BaseModel):
    united_stand: Optional[MatchRating]
    who_scored: Optional[WhoScoredMatchData]


class SeasonData(BaseModel):
    season: Season
    fixture_data: FixtureData
    match_data: List[MatchData] = []


class Data(BaseModel):
    season_data: List[SeasonData] = []
    player_info: List[PlayerInfo] = []
