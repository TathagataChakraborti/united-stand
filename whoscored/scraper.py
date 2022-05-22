from get_fixtures import FixtureManager
from schemas import *

import os
import yaml
import argparse

if __name__ == "__main__":

    parser = argparse.ArgumentParser(description="Generate fixtures data.")
    parser.add_argument("--file", type=str, help="Relative path to config file.")
    parser.add_argument("--fixtures", type=str, help="Fixture data.")

    args = parser.parse_args()

    path_to_config_file = args.file or "config.yaml"

    with open(path_to_config_file, "r") as stream:
        try:
            config: Config = yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)

    if args.fixtures:
        pass

    else:

        fixture_object = FixtureManager(config)
        fixture_list = fixture_object.get_fixtures()

        season = config["season"]

        fixture_file = f'../data/whoscored/{season["start"]}-{season["start"]}.yaml'
        os.makedirs(os.path.dirname(fixture_file), exist_ok=True)

        with open(fixture_file, "w") as f:
            yaml.dump(fixture_list, f)
            print(f"Wrote fixtures to {fixture_file}")
