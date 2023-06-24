from pydantic import BaseModel
from enum import Enum


class Browser(Enum):
    CHROME = "Chrome"
    FIREFOX = "Firefox"
    EDGE = "Edge"
    SAFARI = "Safari"


class Season(BaseModel):
    start: int
    end: int


class ScraperConfig(BaseModel):
    ws_cache_url: str = ""
    fixtures_only: bool = False
    summary_only: bool = False
    browser: Browser
    timeout: int


class Config(BaseModel):
    team_id: int
    team_name: str
    country: str
    league: str
    season: Season
    scraper: ScraperConfig
