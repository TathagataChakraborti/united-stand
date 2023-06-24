from typing import List, Dict, Optional, Union
from pydantic import BaseModel
from enum import Enum
import bs4.element


class IncidentType(str, Enum):
    SUBON = "subon"
    SUBOFF = "suboff"
    GOAL = "goalnormal"
    OWNGOAL = "goalown"
    ASSIST = "assist"
    RED = "redcard"
    YELLOW = "yellowcard"
    MOM = "mom"

    class Config:
        use_enum_values = True

    @classmethod
    def parse_incident_type(
        cls, html_object: bs4.element.ResultSet
    ) -> Optional[str]:
        object_attributes = list(html_object.attrs.keys())

        for item in cls:
            if any(
                [item.value in attr_name for attr_name in object_attributes]
            ):
                return item

        return None


class IncidentTime(BaseModel):
    minute: int
    second: int


class Incident(BaseModel):
    incident_type: Optional[IncidentType]
    incident_time: IncidentTime
    attributes: List[str]


class DataItem(BaseModel):
    name: str
    value: Optional[Union[str, float, List[Union[str, float, Incident]]]]


class PlayerData(BaseModel):
    name: str
    age: int
    positions: List[str]
    incident: Optional[List[Incident]]
    data: List[DataItem]


class DataTable(BaseModel):
    headers: List[str]
    player_data: List[PlayerData]
    keymap: Dict[str, str]


class MatchData(BaseModel):
    match_id: int
    Summary: DataTable
    Defensive: Optional[DataTable] = None
    Offensive: Optional[DataTable] = None
    Passing: Optional[DataTable] = None


class TableReadConfig(BaseModel):
    timeout: int
    selector_link: str
    table_link: str
    summary_only: bool = False
