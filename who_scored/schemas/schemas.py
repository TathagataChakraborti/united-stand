from typing import List, Union, TypedDict
import enum


class Season(TypedDict):
    start: int
    end: int


class Browser(enum.Enum):
    CHROME = "Chrome"
    FIREFOX = "Firefox"
    EDGE = "Edge"
    SAFARI = "Safari"


class ScraperConfig(TypedDict):
    browser: Browser
    timeout: int


class Config(TypedDict):
    team_id: int
    team_name: str
    country: str
    league: str
    season: Season
    scraper: ScraperConfig
