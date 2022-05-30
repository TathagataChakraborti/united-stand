from typing import List, Dict, Optional, Union, TypedDict
import enum


class SubstituteType(enum.Enum):
    IN: "subbed in"
    OUT: "subbed out"


class SubstituteTime(TypedDict):
    minute: int
    second: int


class SubstituteEvent(TypedDict):
    substitue: SubstituteType
    time: SubstituteTime


class DataItem(TypedDict):
    name: str
    value: Union[str, float, List]


class PlayerData(TypedDict):
    name: str
    age: int
    positions: List[str]
    event: Optional[SubstituteEvent]
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
