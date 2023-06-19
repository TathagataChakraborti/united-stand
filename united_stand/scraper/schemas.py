from pydantic import BaseModel
from typing import List

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
    votes: int


class Rating(BaseModel):
    name: str
    value: float


class ManagerRating(BaseModel):
    name: str
    rating: Rating


class MoM(BaseModel):
    name: str
    percentage: float


class Ratings(BaseModel):
    match_id: int
    meta_data: MetaData
    man_of_the_match: MoM
    manager_rating: ManagerRating
    ratings: List[Rating]
