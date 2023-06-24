from pydantic import BaseModel
from typing import List, Optional

from who_scored.schemas.schemas import Season


class PlayerSeasonInfo(BaseModel):
    season: Season
    positions: List[str]
    age: int


class PlayerInfo(BaseModel):
    name: str
    seasons: List[PlayerSeasonInfo]


class MetaData(BaseModel):
    views: int
    likes: int
    shares: int


class Rating(BaseModel):
    name: str
    votes: int
    rating: float


class PlayerRating(BaseModel):
    substitute: Optional[bool]
    position: str
    rating: Rating


class ManagerRating(BaseModel):
    rating: Rating


class MoM(BaseModel):
    name: str
    percentage: float
    votes: int


class MatchRating(BaseModel):
    match_id: int
    meta_data: MetaData
    man_of_the_match: MoM
    manager_rating: ManagerRating
    ratings: List[PlayerRating]