from typing import List, Dict, Optional, Union, TypedDict
import bs4.element
import enum


class IncidentType(enum.Enum):
    SUBON = "subon"
    SUBOFF = "suboff"
    GOAL = "goalnormal"
    OWNGOAL = "goalown"
    ASSIST = "assist"
    RED = "redcard"
    YELLOW = "yellowcard"
    MOM = "mom"

    @classmethod
    def parse_incident_type(cls, html_object: bs4.element.ResultSet):
        object_attributes = list(html_object.attrs.keys())

        for item in cls:
            if any([item.value in attr_name for attr_name in object_attributes]):
                return item

        return None


class IncidentTime(TypedDict):
    minute: int
    second: int


class Incident(TypedDict):
    incident_type: IncidentType
    incident_time: IncidentTime
    attributes: List[str]


class DataItem(TypedDict):
    name: str
    value: Union[str, float, List[Union[str, float, Incident]]]


class PlayerData(TypedDict):
    name: str
    age: int
    positions: List[str]
    incident: Optional[Incident]
    data: List[DataItem]


class DataTable(TypedDict):
    headers: List[str]
    player_data: List[PlayerData]
    keymap: Dict[str, str]


class MatchData(TypedDict):
    match_id: int
    Summary: DataTable
    Defensive: DataTable
    Offensive: DataTable
    Passing: DataTable


class ReadConfig(TypedDict):
    timeout: int
    selector_link: str
    table_link: str
