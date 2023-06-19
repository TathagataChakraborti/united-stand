import bs4.element
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.common.exceptions import TimeoutException

from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

from typing import List, Optional
from who_scored.schemas.match_schemas import (
    Incident,
    IncidentTime,
    IncidentType,
    ReadConfig,
    MatchData,
    PlayerData,
    DataTable,
    DataItem,
)


def read_incident_data(html_objects: List[bs4.element.ResultSet]) -> List[Incident]:

    list_of_incidents = list()

    for html_object in html_objects:

        incident_type = IncidentType.parse_incident_type(html_object)
        incident_time = IncidentTime(
            minute=int(html_object.get("data-minute", 0)),
            second=int(html_object.get("data-second", 0)),
        )

        new_incident = Incident(
            incident_type=incident_type,
            incident_time=incident_time,
            attributes=[
                e.split("-")[-1]
                for e in html_object.attrs.keys()
                if "data-event-satisfier" in e
            ],
        )

        if new_incident.incident_type:
            setattr(new_incident, "incident_type", new_incident.incident_type.value)

        list_of_incidents.append(new_incident)

    return list_of_incidents


def read_data_table(
    match_id: int, url: str, driver: Optional[webdriver.Chrome], config: ReadConfig
) -> MatchData:
    if not driver:
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    print(f"==> Attempting to read data from {url}")
    driver.get(url)

    data_types = list(MatchData.__annotations__.keys())
    data_types.remove("match_id")

    match_data = dict()
    match_data["match_id"] = match_id

    for item in data_types:
        print(f"==> Reading {item} data...")

        try:
            selector = driver.find_element(
                by=By.XPATH, value=config.selector_link.format(item.lower())
            )
        except TimeoutException as e:
            print(f"Timeout in parsing {url}", e)
            selector = None

        if selector is not None:
            driver.execute_script("arguments[0].click();", selector)

            table_id = config.table_link.format(item.lower())
            _ = WebDriverWait(driver, config.timeout).until(
                ec.visibility_of_all_elements_located(
                    (By.XPATH, f"//div[@id='{table_id}']")
                )
            )

            soup = BeautifulSoup(driver.page_source, features="html.parser")
            table_of_interest = soup.find("div", attrs={"id": table_id})

            table = table_of_interest.find("table")

            headers = table.select("thead th")
            headers = [h.text for h in headers[2:]]

            player_data = list()
            for row in table.select("tbody tr"):
                row_data = row.select("td")

                name = row_data[0].select_one("a.player-link span.iconize").text
                raw_player_info = row_data[0].select("span.player-meta-data")
                age = int(raw_player_info[0].text)

                positions = raw_player_info[1].text.strip()
                positions = [p.strip() for p in positions.split(",") if p.strip()]

                raw_incident_info = row_data[0].select("span.incident-icon")
                incident_info = read_incident_data(raw_incident_info) or None

                data = list()
                for header_id, data_item in enumerate(row_data[2:]):

                    raw_incident_info = data_item.select("span.incident-icon")
                    if raw_incident_info:
                        data_item = read_incident_data(raw_incident_info) or None
                    else:

                        data_item = data_item.text.strip()

                        if data_item in ["-", ""]:
                            data_item = None

                        elif "(" in data_item and ")" in data_item:
                            data_item = data_item.split("(")
                            primary_data_item = data_item[0].strip()

                            data_item = data_item[1].split(")")
                            secondary_data_item = data_item[0].strip()

                            data_item = [
                                float(primary_data_item),
                                float(secondary_data_item),
                            ]

                        else:
                            data_item = float(data_item)

                    data.append(
                        DataItem(
                            name=headers[header_id],
                            value=data_item,
                        )
                    )

                assert "Headers do not match data", len(data) == len(headers)

                new_player_data = PlayerData(
                    name=name,
                    age=age,
                    positions=positions,
                    incident=incident_info,
                    data=data,
                )
                player_data.append(new_player_data)

            keymap = table_of_interest.parent.find(
                "div", attrs={"id": f"{table_id}-column-legend"}
            )
            if keymap:
                keymap = keymap.find("div", attrs={"class": "table-column-legend"})
                keymap = keymap.find_all("div")
                keymap = [k.text.split(":") for k in keymap]
                keymap = {k[0].strip(): k[1].strip() for k in keymap if len(k) == 2}

            data_table = DataTable(
                headers=headers,
                player_data=player_data,
                keymap=keymap,
            )

            match_data[item] = data_table

    match_data = MatchData.parse_obj(match_data)
    return match_data
